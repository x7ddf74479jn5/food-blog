import type { TArticle } from "@/types/article";
import type { TDateCommon } from "@/types/utils";

export type TPickup = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  articles: TArticle[];
} & TDateCommon;
