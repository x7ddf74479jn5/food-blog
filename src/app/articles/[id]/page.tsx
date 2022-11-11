import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import ErrorPage from "@/app/_error/page";
import type { ArticleDetailProps } from "@/components/pages/articles/ArticleDetail";
import { ArticleDetail } from "@/components/pages/articles/ArticleDetail";
import { mdx2html } from "@/lib/mdx";
import { sentryLogServer } from "@/lib/sentry/logger";
import { fetchArticles, fetchConfig, fetchTags } from "@/repositories";
import { getArticle, getPickupArticles, getPopularArticles, getRelatedArticles } from "@/services/article";
import { getCategories } from "@/services/category";
import type { PagePropsOrError } from "@/types";

export type ArticleDetailPageProps = PagePropsOrError<ArticleDetailProps>;

export const ArticleDetailPage: NextPage<ArticleDetailPageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <ArticleDetail {...props} />;
};

interface Params extends ParsedUrlQuery {
  id?: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await fetchArticles();
  const paths = data.contents.map((article) => {
    return { params: { id: article.id } };
  });

  return { fallback: "blocking", paths };
};

export const getStaticProps: GetStaticProps<ArticleDetailPageProps, Params> = async ({ params }) => {
  const id = params?.id;

  if (!id) {
    return { notFound: true };
  }

  try {
    const article = await getArticle(id);

    if (!article) {
      return { notFound: true };
    }

    const [config, categories, tags, pickup, popularArticles, relatedArticles] = await Promise.all([
      fetchConfig(),
      getCategories(),
      fetchTags(),
      getPickupArticles(new Date()),
      getPopularArticles(),
      getRelatedArticles(article),
    ]);
    const mdxSource = await mdx2html(article.body);

    return {
      props: {
        article,
        categories,
        config,
        isPreview: false,
        mdxSource,
        pickup,
        popularArticles,
        relatedArticles,
        tags,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      await sentryLogServer(error);
    }

    return {
      props: {
        error: {
          statusCode: 500,
        },
      },
    };
  }
};

export default ArticleDetailPage;
