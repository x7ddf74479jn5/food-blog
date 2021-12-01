import type { GetServerSideProps } from "next";
import type { Params } from "next/dist/server/router";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import type { ArticleDetailProps, ArticlesStaticProps } from "@/pages/articles/[id].page";
import ArticleDetail from "@/pages/articles/[id].page";
import { getNewDate } from "@/utils/date";
import {
  fetchArticle,
  fetchCategories,
  fetchConfig,
  fetchPickupArticles,
  // getRelatedArticles
} from "@/utils/fetcher";
import mdx2html from "@/utils/mdx/mdx2html";
import { isDraft } from "@/utils/validator";

const ArticlePreview = (props: ArticleDetailProps) => {
  console.info(props);
  return (
    <>
      <HtmlHeadNoIndex />
      <ArticleDetail {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ArticlesStaticProps, Params> = async ({
  preview: isPreview,
  previewData,
}) => {
  console.info(isPreview, previewData);
  if (!isPreview || !isDraft(previewData)) throw new Error("Error: previewData not found");

  const { id, draftKey } = previewData;

  try {
    const queries = { draftKey };
    const [config, categories, article, pickup] = await Promise.all([
      fetchConfig(),
      fetchCategories(),
      fetchArticle(id, queries),
      fetchPickupArticles(getNewDate()),
    ]);
    console.info(config, categories, article, pickup);
    const relatedArticles = [] as any[];
    // const relatedArticles = await getRelatedArticles(article);
    const mdxSource = await mdx2html(article.body);
    console.info(mdxSource);
    return {
      props: {
        article,
        mdxSource,
        categories,
        config,
        isPreview,
        relatedArticles,
        pickup,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default ArticlePreview;
