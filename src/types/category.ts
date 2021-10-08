import type { TCategoryOrTagColor, TDateCommon, TImage, TListResponse } from "@/types/utils";

export type TCategory = {
  id: string;
  slug: string;
  name: string;
  color: TCategoryOrTagColor;
  image: TImage;
} & TDateCommon;

export type TCategoryListResponse = TListResponse<TCategory>;
