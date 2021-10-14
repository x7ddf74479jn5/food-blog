import type { GetStaticPaths } from "next";
import type { Params } from "next/dist/server/router";

import type { ArticleDetailProps } from "@/pages/articles/[id].page";
import ArticleDetail, { getStaticProps as _getStaticProps } from "@/pages/articles/[id].page";
import { fetchArticles } from "@/utils/fetcher";
import { UrlTable } from "@/utils/paths/url";

const ArticlePreview = (props: ArticleDetailProps) => {
  return (
    <>
      <ArticleDetail {...props} isPreview />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await fetchArticles();
  const paths = data.contents.map((article) => `${UrlTable.preview}/${article.id}`);

  return { paths, fallback: "blocking" };
};

export const getStaticProps = _getStaticProps;

export default ArticlePreview;
