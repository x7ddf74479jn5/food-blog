import type { GetStaticProps, NextPage } from "next";

import { fetchArticles, fetchCategories, fetchConfig } from "@/api";
import type { HomeProps } from "@/components/pages/Home";
import { Home } from "@/components/pages/Home";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import type { PagePropsOrError } from "@/types";
import { generatedRssFeed } from "@/utils/rss/rss";

type HomePageProps = PagePropsOrError<HomeProps>;

const HomePage: NextPage<HomePageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Home {...props} />;
};

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const [config, categories, data, pickup, popularArticles] = await Promise.all([
      fetchConfig(),
      fetchCategories(),
      fetchArticles({ limit: 10, offset: 0 }),
      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    generatedRssFeed(config, data.contents);

    return {
      props: {
        data,
        categories,
        config,
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
