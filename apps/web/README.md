This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Android news push preview

`POST /api/news-push` receives signed Sanity publication events and sends a push to one
Android installation. Set these server-side variables on the Vercel preview branch.

| Variable | Value |
| --- | --- |
| `SANITY_NEWS_PUSH_SECRET` | A random signing secret shared with this Sanity webhook |
| `FCM_NEWS_PUSH_TEST_TOKEN` | The registration token of the test phone |
| `FCM_SERVICE_ACCOUNT_JSON` | The JSON key for an Akwedukt service account with the Firebase Cloud Messaging API Admin role |

In the Sanity project, configure a dedicated POST webhook targeting the preview URL at
`/api/news-push`. Select the dataset being tested, enable **Create** and **Update**, keep
draft and version events disabled, and enter the matching signing secret. If Vercel protects
the preview, set the automation bypass value in the webhook's `x-vercel-protection-bypass`
header.

Use this GROQ filter.

```groq
_type == "post" && after().status == "publish" && coalesce(before().status, "") != "publish"
```

Use this projection.

```groq
{
  _id,
  _type,
  title,
  status,
  "previousStatus": coalesce(before().status, "")
}
```

The Android app reads articles from the production dataset. To verify the article opens on
tap, use a publication event for a post available there.
