import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { generateRecipeJsonLd, generateWebpageJsonLd, JsonLdScript } from "@/components/meta/JsonLd";
import { getArticleDetailPageMeta } from "@/components/pages/articles/ArticleDetail/meta";
import { fetchArticle, fetchConfig } from "@/repositories";

import type { ArticleDetailProps } from "./page";

const Head = async ({ params }: ArticleDetailProps) => {
  const { id } = params;

  if (!id) throw Error("ID not provided");

  const [meta, article, config] = await Promise.all([getArticleDetailPageMeta(id), fetchArticle(id), fetchConfig()]);

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
      <JsonLdScript contents={[generateWebpageJsonLd({ config }), await generateRecipeJsonLd({ article, config })]} />
    </head>
  );
};

export default Head;
