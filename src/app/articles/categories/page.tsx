import type { GetStaticProps, NextPage } from "next";

import ErrorPage from "@/app/_error/page";
import type { CategoriesProps } from "@/components/pages/articles/categories/Categories";
import { Categories } from "@/components/pages/articles/categories/Categories";
import { sentryLogServer } from "@/lib/sentry/logger";
import { fetchConfig, fetchTags } from "@/repositories";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import { getCategories } from "@/services/category";
import type { PagePropsOrError } from "@/types";

type CategoriesPageProps = PagePropsOrError<CategoriesProps>;

const CategoriesPage: NextPage<CategoriesPageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Categories {...props} />;
};

export const getStaticProps: GetStaticProps<CategoriesPageProps> = async () => {
  try {
    const [config, categories, tags, pickup, popularArticles] = await Promise.all([
      fetchConfig(),
      getCategories(),
      fetchTags(),
      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    return {
      props: {
        categories,
        config,
        pickup,
        popularArticles,
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

export default CategoriesPage;
