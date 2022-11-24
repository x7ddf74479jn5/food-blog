import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { getArticleDetailPageMeta } from "@/components/pages/articles/ArticleDetail/meta";

import type { ArticleDetailParams } from "./page";

const Head = async ({ id }: ArticleDetailParams) => {
  if (!id) throw Error("ID not provided");

  const meta = await getArticleDetailPageMeta(id);

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
    </head>
  );
};

export default Head;
