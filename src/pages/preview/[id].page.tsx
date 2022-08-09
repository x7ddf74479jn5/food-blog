import type { GetServerSideProps } from "next";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import type { ArticleDetailProps, ArticlesStaticProps } from "@/pages/articles/[id].page";
import ArticleDetail from "@/pages/articles/[id].page";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import type { TArticle } from "@/types";
import { fetchArticle, fetchCategories, fetchConfig } from "@/utils/fetcher";
import { mdx2html } from "@/utils/mdx/mdx2html";
import { isDraft } from "@/utils/validator";

const ArticlePreview = (props: ArticleDetailProps) => {
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
  if (!isPreview || !isDraft(previewData)) throw new Error("Error: previewData not found");

  const { id, draftKey } = previewData;

  try {
    const queries = { draftKey };
    const [config, categories, article, pickup, popularArticles] = await Promise.all([
      fetchConfig(),
      fetchCategories(),
      fetchArticle(id, queries),
      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    const relatedArticles: TArticle[] = [];
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
        popularArticles,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default ArticlePreview;
