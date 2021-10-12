import type { TArticle } from "@/types/article";
import type { TDateCommon } from "@/types/utils";

import type { TListResponse } from "./utils";

export type TPickup = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  articles: TArticle[];
} & TDateCommon;

export type TPickupListResponse = TListResponse<TPickup>;
