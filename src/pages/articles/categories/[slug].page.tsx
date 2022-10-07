import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { fetchCategories, fetchConfig, fetchTags } from "@/api";
import type { CategoryProps } from "@/components/pages/articles/categories/Category";
import { Category } from "@/components/pages/articles/categories/Category";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import { getArticles, getPickupArticles, getPopularArticles } from "@/services/article";
import { getCategories, getCategory } from "@/services/category";
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
    const category = await getCategory(slug);

    if (!category) {
      return { notFound: true };
    }

    const [data, config, categories, tags, pickup, popularArticles] = await Promise.all([
      getArticles({ filters: `category[equals]${category.id}` }),
      fetchConfig(),
      getCategories(),
      fetchTags(),

      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    return {
      props: {
        data,
        category,
        config,
        categories,
        tags,
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
