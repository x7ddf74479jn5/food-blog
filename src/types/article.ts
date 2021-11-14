import type { TCategory } from "@/types/category";
import type { TTag } from "@/types/tag";
import type { TDateCommon, TImage, TImageOption, TListResponse } from "@/types/utils";
import type { TWriter } from "@/types/writer";

export type TArticle = {
  id: string;
  image: TImage;
  title: string;
  writer: TWriter;
  description: string;
  excerpt: string;
  body: string;
  category: TCategory;
  tags: TTag[];
  linkCardArticles: TArticle[];
  imageOption: TImageOption | null;
} & TDateCommon;

export type TArticleListResponse = TListResponse<TArticle>;

export type TArticleSWRResponse = TArticleListResponse | null;

export type TComparatorArticle = (a: TArticle, b: TArticle) => number;
