import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { generateWebpageJsonLd, JsonLdScript } from "@/components/meta/JsonLd";
import { getTagPageMeta } from "@/components/pages/Tag/meta";
import { fetchConfig } from "@/repositories";

import type { TagPageParams } from "./page";

const Head = async ({ params }: { params: TagPageParams }) => {
  if (!params.slug) throw Error("Slug not provided");


  const [config,meta]=await Promise.all([fetchConfig(),getTagPageMeta(params.slug)])

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
      <JsonLdScript contents={[generateWebpageJsonLd({ config })]} />
    </head>
  );
};

export default Head;
