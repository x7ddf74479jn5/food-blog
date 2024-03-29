import type { TConfig } from "@/types/models/config";

import { dateCommon } from "./utils";

export const mockConfig: TConfig = {
  ...dateCommon,
  apiHost: "https://food-blog.microcms.io/api/v1/",
  email: "x7ddf74479jn5@gmail.com",
  host: "https://food-blog-chi.vercel.app/",
  officialSite: "https://next-portfolio-livid.vercel.app/",
  organization: "Pandashark",
  siteDescription: "料理レシピを紹介するブログ",
  siteImage: { height: 100, url: "https://food-blog-chi.vercel.app/site_image.jpg", width: 100 },
  siteKeywords: ["料理"],
  siteTitle: "Food Blog",
  twitterId: "@pandashark6",
};
