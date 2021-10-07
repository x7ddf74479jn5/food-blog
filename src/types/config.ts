import type { TProfile } from "@/types/profile";
import type { TDateCommon, TImage } from "@/types/utils";

export type TConfig = {
  perPage: number;
  host: string;
  apiHost: string;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string[];
  siteImage: TImage;
  profile: TProfile;
  twitterId: string;
} & TDateCommon;
