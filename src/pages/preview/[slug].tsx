import ArticleDetail, { getStaticPathsFactory, getStaticProps as _getStaticProps } from "@pages/articles/[id]";
import type { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";

import type { TArticle, TCategory, TConfig, TTag } from "@/types";

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

export const getStaticPaths = getStaticPathsFactory(true);
export const getStaticProps = _getStaticProps;

export default ArticlePreview;
