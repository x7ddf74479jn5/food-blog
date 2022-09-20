import type { GetStaticProps, NextPage } from "next";

import { fetchConfig } from "@/api";
import type { CategoriesProps } from "@/components/pages/articles/categories/Categories";
import { Categories } from "@/components/pages/articles/categories/Categories";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import { getCategories } from "@/services/category";
import type { PagePropsOrError } from "@/types";

type CategoriesPageProps = PagePropsOrError<CategoriesProps>;

const CategoriesPage: NextPage<CategoriesPageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Categories {...props} />;
};

export const getStaticProps: GetStaticProps<CategoriesPageProps> = async () => {
  try {
    const [config, categories, pickup, popularArticles] = await Promise.all([
      fetchConfig(),
      getCategories(),
      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    return {
      props: {
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

export default CategoriesPage;
