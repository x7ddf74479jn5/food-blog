import type { GetStaticPaths } from "next";
import type { Params } from "next/dist/server/router";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import type { ArticleDetailProps } from "@/pages/articles/[id].page";
import ArticleDetail, { getStaticProps as _getStaticProps } from "@/pages/articles/[id].page";
import { fetchArticles } from "@/utils/fetcher";

const ArticlePreview = (props: ArticleDetailProps) => {
  return (
    <>
      <HtmlHeadNoIndex />
      <ArticleDetail {...props} isPreview />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await fetchArticles();
  const paths = data.contents.map((article) => {
    return { params: { id: article.id } };
  });

  return { paths, fallback: "blocking" };
};

export const getStaticProps = _getStaticProps;

export default ArticlePreview;
