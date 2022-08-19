import type { TConfig } from "@/types/models/config";

import { dateCommon } from "./utils";

export const mockConfig: TConfig = {
  ...dateCommon,
  apiHost: "https://food-blog.microcms.io/api/v1/",
  host: "https://food-blog-chi.vercel.app/",
  siteTitle: "Food Blog",
  siteDescription: "料理レシピを紹介するブログ",
  siteKeywords: ["料理"],
  siteImage: { url: "https://food-blog-chi.vercel.app/site_image.jpg", width: 100, height: 100 },
  organization: "Pandashark",
  officialSite: "https://next-portfolio-livid.vercel.app/",
  twitterId: "@pandashark6",
  email: "x7ddf74479jn5@gmail.com",
};
