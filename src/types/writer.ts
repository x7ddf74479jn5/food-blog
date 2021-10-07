import type { TDateCommon, TImage, TListResponse } from "@/types/utils";

export type TWriter = {
  id: string;
  name: string;
  description: string;
  fullName: string;
  twitterAccountName: string;
  avatar: TImage;
} & TDateCommon;

export type TWriterListResponse = TListResponse<TWriter>;
