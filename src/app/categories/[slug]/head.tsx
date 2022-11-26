import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { generateWebpageJsonLd, JsonLdScript } from "@/components/meta/JsonLd";
import { getCategoryPageMeta } from "@/components/pages/categories/Category/meta";
import { fetchConfig } from "@/repositories";

import type { CategoryPageParams } from "./page";

const Head = async ({ params }: { params: CategoryPageParams }) => {
  if (!slug) throw Error("Slug not provided");

  const [config, meta] = await Promise.all([fetchConfig(), getCategoryPageMeta(params.slug)]);

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
      <JsonLdScript contents={[generateWebpageJsonLd({ config })]} />
    </head>
  );
};

export default Head;
