import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { getTagPageMeta } from "@/components/pages/Tag/meta";

import type { TagPageParams } from "./page";

const Head = async ({ slug }: TagPageParams) => {
  if (!slug) throw Error("Slug not provided");

  const meta = await getTagPageMeta(slug);

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
    </head>
  );
};

export default Head;
