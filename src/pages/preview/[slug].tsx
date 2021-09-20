import ArticleDetail, { getStaticProps as _getStaticProps } from "@pages/articles/[id]";
import type { GetStaticPaths } from "next";
import type { Params } from "next/dist/server/router";
import type { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";

import { client } from "@/lib/client";
import type { TArticle, TArticleListResponse, TCategory, TConfig, TTag } from "@/types";

export type Props = {
  article: TArticle;
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
  tags: TTag[];
  categories: TCategory[];
  config: TConfig;
  isPreview: boolean;
};

const ArticlePreview = (props: Props) => {
  return (
    <>
      <ArticleDetail {...props} isPreview />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get<TArticleListResponse>({ endpoint: "articles" });

  const paths = data.contents.map((article) => `/articles/${article.id}`);

  return { paths, fallback: false };
};

export const getStaticProps = _getStaticProps;

export default ArticlePreview;
