export type TDateCommon = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type TCategoryOrTagColor = "green" | "blue" | "indigo" | "purple" | "red" | "yellow" | "pink" | "gray";

export type TCategory = {
  id: string;
  slug: string;
  name: string;
  color: TCategoryOrTagColor;
} & TDateCommon;

export type TTag = {
  id: string;
  slug: string;
  name: string;
  color: TCategoryOrTagColor;
} & TDateCommon;

export type TImage = {
  url: string;
  width: number;
  height: number;
};

export type TImageOption = {
  fontColor: string;
};

export type TArticle = {
  id: string;
  image: TImage;
  title: string;
  description: string;
  excerpt: string;
  body: string;
  category: TCategory;
  tags: TTag[];
  imageOption: TImageOption | null;
} & TDateCommon;

export type TProfile = {
  name: string;
  fullName: string;
  description: string;
  githubAccountName: string;
  twitterAccountName: string;
  image: TImage;
};

export type TConfig = {
  perPage: number;
  host: string;
  apiHost: string;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string[];
  siteImage: TImage;
  profile: TProfile;
  twitterId: string;
} & TDateCommon;

export type TResources = "article" | "note";

export type TListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset?: number;
  limit?: number;
};

export type TArticleListResponse = TListResponse<TArticle>;

export type TCategoryListResponse = TListResponse<TCategory>;

export type TTagListResponse = TListResponse<TTag>;

export type TArticleSWRResponse = TArticleListResponse | null;

export type TComparatorArticle = (a: TArticle, b: TArticle) => number;
