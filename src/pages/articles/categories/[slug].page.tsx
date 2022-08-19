import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "node:querystring";

import { fetchArticles, fetchCategories, fetchCategory, fetchConfig } from "@/api";
import type { CategoryProps } from "@/components/pages/articles/categories/Category";
import { Category } from "@/components/pages/articles/categories/Category";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import type { PagePropsOrError } from "@/types";

type CategoryPageProps = PagePropsOrError<CategoryProps>;

const CategoryPage: NextPage<CategoryPageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Category {...props} />;
};

interface Params extends ParsedUrlQuery {
  slug?: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await fetchCategories();
  const paths = data.map((category) => {
    return { params: { slug: category.slug } };
  });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<CategoryPageProps, Params> = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    const category = await fetchCategory(slug);

    if (!category) {
      return { notFound: true };
    }

    const [data, config, categories, pickup, popularArticles] = await Promise.all([
      fetchArticles({ filters: `category[equals]${category.id}` }),
      fetchConfig(),
      fetchCategories(),
      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    return {
      props: {
        data,
        category,
        config,
        categories,
        pickup,
        popularArticles,
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

export default CategoryPage;
