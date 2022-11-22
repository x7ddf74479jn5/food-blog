import { fetchConfig } from "@/repositories";

import { SiteTitleView } from "./SiteTitleView";

export const SiteTitle = async ({ size = "lg" }: { size: "lg" | "sm" }) => {
  const { siteTitle } = await fetchConfig();

  return <SiteTitleView siteTitle={siteTitle} size={size} />;
};
