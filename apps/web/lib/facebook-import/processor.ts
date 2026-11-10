import type { FacebookImportConfig } from "./config";
import { fetchFacebookPost, type FacebookGraphPost } from "./graph";
import {
  createFacebookDraftInSanity,
  createSanityFacebookImportClient,
  type CreateDraftOptions,
  type SanityWriteClient,
} from "./sanity";
import { buildFacebookDraft } from "./transform";
import { extractNewFacebookPostIds } from "./webhook";

type EnabledFacebookImportConfig = Extract<FacebookImportConfig, { enabled: true }>;

export type FacebookImportSummary = {
  matchedEvents: number;
  createdDrafts: number;
  existingDrafts: number;
  skippedBeforeStart: number;
  skippedWrongPage: number;
  importedImages: number;
};

type ProcessorDependencies = {
  fetchPost?: (options: {
    postId: string;
    pageAccessToken: string;
    appSecret: string;
  }) => Promise<FacebookGraphPost>;
  createClient?: (options: {
    dataset: "development" | "production";
    token: string;
  }) => SanityWriteClient;
  createDraft?: (options: CreateDraftOptions) => Promise<{
    created: boolean;
    documentId: string;
    imageCount: number;
  }>;
};

function belongsToConfiguredPage(post: FacebookGraphPost, pageId: string): boolean {
  if (post.authorPageId && post.authorPageId !== pageId) return false;

  const separatorIndex = post.id.indexOf("_");
  if (separatorIndex > 0 && post.id.slice(0, separatorIndex) !== pageId) return false;

  return true;
}

export async function processFacebookWebhook(
  payload: unknown,
  config: EnabledFacebookImportConfig,
  dependencies: ProcessorDependencies = {}
): Promise<FacebookImportSummary> {
  const postIds = extractNewFacebookPostIds(payload, config.pageId);
  const summary: FacebookImportSummary = {
    matchedEvents: postIds.length,
    createdDrafts: 0,
    existingDrafts: 0,
    skippedBeforeStart: 0,
    skippedWrongPage: 0,
    importedImages: 0,
  };

  if (postIds.length === 0) return summary;

  const getPost = dependencies.fetchPost ?? fetchFacebookPost;
  const writeDraft = dependencies.createDraft ?? createFacebookDraftInSanity;
  const makeClient = dependencies.createClient ?? createSanityFacebookImportClient;
  let client: SanityWriteClient | undefined;
  const startAt = new Date(config.startAt).getTime();

  for (const postId of postIds) {
    const post = await getPost({
      postId,
      pageAccessToken: config.pageAccessToken,
      appSecret: config.appSecret,
    });

    if (post.id !== postId) {
      throw new Error("Facebook Graph API returned a different post than requested");
    }

    if (!belongsToConfiguredPage(post, config.pageId)) {
      summary.skippedWrongPage += 1;
      continue;
    }

    if (new Date(post.createdTime).getTime() < startAt) {
      summary.skippedBeforeStart += 1;
      continue;
    }

    client ??= makeClient({
      dataset: config.sanityDataset,
      token: config.sanityWriteToken,
    });

    const result = await writeDraft({
      client,
      draft: buildFacebookDraft({
        id: post.id,
        message: post.message,
        createdTime: post.createdTime,
      }),
      imageUrls: post.imageUrls,
    });

    if (result.created) {
      summary.createdDrafts += 1;
      summary.importedImages += result.imageCount;
    } else {
      summary.existingDrafts += 1;
    }
  }

  return summary;
}
