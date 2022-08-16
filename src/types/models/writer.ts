import type { MicroCMSListContent, MicroCMSListResponse } from "microcms-js-sdk";

import type { TImage } from "@/types/models/utils";

export type TWriter = {
  name: string;
  description: string;
  fullName: string;
  twitterAccountName: string;
  avatar: TImage;
} & MicroCMSListContent;

export type TWriterListResponse = MicroCMSListResponse<TWriter>;
