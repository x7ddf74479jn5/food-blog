import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { getArticleDetailPageMeta } from "@/components/pages/articles/ArticleDetail/meta";

import type { CategoryPageParams } from "./page";

const Head = async ({ slug }: CategoryPageParams) => {
  if (!slug) throw Error("Slug not provided");

  const meta = await getArticleDetailPageMeta(slug);

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
    </head>
  );
};

export default Head;
