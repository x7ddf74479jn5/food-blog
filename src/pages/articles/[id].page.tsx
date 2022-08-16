import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "node:querystring";

import { fetchArticle, fetchArticles, fetchCategories, fetchConfig } from "@/api";
import type { ArticleDetailProps } from "@/components/pages/articles/ArticleDetail";
import { ArticleDetail } from "@/components/pages/articles/ArticleDetail";
import { mdx2html } from "@/lib/mdx";
import { getPickupArticles, getPopularArticles, getRelatedArticles } from "@/services/article";

export const ArticleDetailPage: NextPage<ArticleDetailProps> = (props) => {
  return <ArticleDetail {...props} />;
};

interface Params extends ParsedUrlQuery {
  id?: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await fetchArticles();
  const paths = data.contents.map((article) => {
    return { params: { id: article.id } };
  });

  return { paths, fallback: "blocking" };
};

export type ArticlesStaticProps = ArticleDetailProps;

export const getStaticProps: GetStaticProps<ArticlesStaticProps, Params> = async ({ params }) => {
  const id = params?.id;

  if (!id) {
    throw new Error("Error: ID not found");
  }

  try {
    const [config, categories, article, pickup, popularArticles] = await Promise.all([
      fetchConfig(),
      fetchCategories(),
      fetchArticle(id),
      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    const relatedArticles = await getRelatedArticles(article);

    const mdxSource = await mdx2html(article.body);

    return {
      props: {
        article,
        mdxSource,
        categories,
        config,
        isPreview: false,
        relatedArticles,
        pickup,
        popularArticles,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default ArticleDetailPage;
