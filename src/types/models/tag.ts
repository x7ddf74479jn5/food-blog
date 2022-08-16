import type { MicroCMSListContent, MicroCMSListResponse } from "microcms-js-sdk";

import type { TCategoryOrTagColor } from "@/types/models/utils";

export type TTag = {
  slug: string;
  name: string;
  color: TCategoryOrTagColor;
} & MicroCMSListContent;

export type TTagListResponse = MicroCMSListResponse<TTag>;
