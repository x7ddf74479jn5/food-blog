import type { GetStaticPaths, GetStaticProps } from "next";
import type { Params } from "next/dist/server/router";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import type { ArticleDetailProps, ArticlesStaticProps } from "@/pages/articles/[id].page";
import ArticleDetail, { getStaticProps as _getStaticProps } from "@/pages/articles/[id].page";
import { getNewDate } from "@/utils/date";
import { fetchArticle, fetchCategories, fetchConfig, fetchPickupArticles, getRelatedArticles } from "@/utils/fetcher";
import mdx2html from "@/utils/mdx/mdx2html";
import { isDraft } from "@/utils/validator";

const ArticlePreview = (props: ArticleDetailProps) => {
  return (
    <>
      <HtmlHeadNoIndex />
      <ArticleDetail {...props} isPreview />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<ArticlesStaticProps, Params> = async ({
  params,
  preview: isPreview,
  previewData,
}) => {
  const id = params?.id;
  if (!id) {
    throw new Error("Error: ID not found");
  }
  try {
    const queries = isPreview ? { draftKey: isDraft(previewData) ? previewData.draftKey : "" } : {};

    const [config, categories, article, pickup] = await Promise.all([
      fetchConfig(),
      fetchCategories(),
      fetchArticle(id, queries),
      fetchPickupArticles(getNewDate()),
    ]);

    const relatedArticles = await getRelatedArticles(article);
    const mdxSource = await mdx2html(article.body);

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
