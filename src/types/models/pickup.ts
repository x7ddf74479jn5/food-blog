import type { MicroCMSListContent, MicroCMSListResponse } from "microcms-js-sdk";

import type { TArticle } from "@/types/models/article";

export type TPickup = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  articles: TArticle[];
} & MicroCMSListContent;

export type TPickupListResponse = MicroCMSListResponse<TPickup>;
