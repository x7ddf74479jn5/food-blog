import type { MicroCMSListContent, MicroCMSListResponse } from "microcms-js-sdk";

import type { TCategoryOrTagColor, TImage } from "@/types/utils";

export type TCategory = {
  slug: string;
  name: string;
  color: TCategoryOrTagColor;
  image: TImage;
} & MicroCMSListContent;

export type TCategoryListResponse = MicroCMSListResponse<TCategory>;

export type AllOrCategory =
  | {
      id: "all";
      name: "すべて";
    }
  | TCategory;
