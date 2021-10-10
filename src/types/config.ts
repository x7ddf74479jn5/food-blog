import type { TDateCommon, TImage } from "@/types/utils";

export type TConfig = {
  host: string;
  apiHost: string;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string[];
  siteImage: TImage;
  twitterId: string;
  organization: string;
} & TDateCommon;
