import type { TCategoryOrTagColor, TDateCommon, TListResponse } from "@/types/utils";

export type TTag = {
  id: string;
  slug: string;
  name: string;
  color: TCategoryOrTagColor;
} & TDateCommon;

export type TTagListResponse = TListResponse<TTag>;
