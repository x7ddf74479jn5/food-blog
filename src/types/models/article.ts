import type { MicroCMSListContent, MicroCMSListResponse } from "microcms-js-sdk";

import type { TCategory } from "@/types/models/category";
import type { TTag } from "@/types/models/tag";
import type { TImage, TImageOption } from "@/types/models/utils";
import type { TWriter } from "@/types/models/writer";

export type TArticle = {
  image: TImage;
  title: string;
  writer: TWriter;
  description: string;
  excerpt: string;
  body: string;
  category: TCategory;
  tags: TTag[];
  linkCardArticles?: TArticle[];
  imageOption?: TImageOption | null;
} & MicroCMSListContent;

export type TArticleListResponse = MicroCMSListResponse<TArticle>;

export type TArticleSWRResponse = TArticleListResponse | null;

export type TComparatorArticle = (a: TArticle, b: TArticle) => number;

export type TRankedArticle = TArticle & { order: number };
