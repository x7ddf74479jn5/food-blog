import type { TImage } from "@/types/utils";

export type TProfile = {
  name: string;
  fullName: string;
  description: string;
  githubAccountName: string;
  twitterAccountName: string;
  image: TImage;
};
