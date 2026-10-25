export type PortableTextLinkMarkDefinition = {
  _key: string;
  _type: "link";
  href: string;
  blank: boolean;
  rel: "noopener noreferrer";
};

export type PortableTextSpan = {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
};

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  style: "normal";
  markDefs: PortableTextLinkMarkDefinition[];
  children: PortableTextSpan[];
};

export type PortableTextSpacer = {
  _key: string;
  _type: "spacer";
  size: "small";
};

export type PortableTextItem = PortableTextBlock | PortableTextSpacer;

export type FacebookSourcePost = {
  id: string;
  message?: string | null;
  createdTime: string;
};

export type FacebookDraftDocument = {
  _id: `drafts.facebook-${string}`;
  _type: "post";
  locale: "pl";
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  date: string;
  status: "draft";
  content: PortableTextItem[];
  excerpt: PortableTextItem[];
  categories: [];
  tags: [];
};
