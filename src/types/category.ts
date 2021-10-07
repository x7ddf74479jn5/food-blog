import type { TCategoryOrTagColor, TDateCommon, TListResponse } from "@/types/utils";

export type TCategory = {
  id: string;
  slug: string;
  name: string;
  color: TCategoryOrTagColor;
} & TDateCommon;

export type TCategoryListResponse = TListResponse<TCategory>;
