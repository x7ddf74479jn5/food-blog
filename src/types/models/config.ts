import type { MicroCMSObjectContent } from "microcms-js-sdk";

import type { TImage } from "@/types/utils";

export type TConfig = {
  host: string;
  apiHost: string;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string[];
  siteImage: TImage;
  twitterId: string;
  organization: string;
  officialSite: string;
  email: string;
} & MicroCMSObjectContent;
