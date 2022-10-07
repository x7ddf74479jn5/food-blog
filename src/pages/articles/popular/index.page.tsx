import type { GetStaticProps, NextPage } from "next";

import { fetchConfig, fetchTags } from "@/api";
import type { PopularProps } from "@/components/pages/articles/Popular";
import { Popular } from "@/components/pages/articles/Popular";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import { getCategories } from "@/services/category";
import type { PagePropsOrError } from "@/types";

type PopularPageProps = PagePropsOrError<PopularProps>;

const PopularPage: NextPage<PopularPageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Popular {...props} />;
};

export const getStaticProps: GetStaticProps<PopularPageProps> = async () => {
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

export default PopularPage;
