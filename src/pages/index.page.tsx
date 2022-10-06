import type { GetStaticProps, NextPage } from "next";

import { fetchConfig, fetchTags } from "@/api";
import type { HomeProps } from "@/components/pages/Home";
import { Home } from "@/components/pages/Home";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import { getArticles, getPickupArticles, getPopularArticles } from "@/services/article";
import { getCategories } from "@/services/category";
import type { PagePropsOrError } from "@/types";
import { generatedRssFeed } from "@/utils/rss/rss";

type HomePageProps = PagePropsOrError<HomeProps>;

const HomePage: NextPage<HomePageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Home {...props} />;
};

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const [config, categories, tags, data, pickup, popularArticles] = await Promise.all([
      fetchConfig(),
      getCategories(),
      fetchTags(),
      getArticles({ limit: 10, offset: 0 }),
      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    if (process.env.NODE_ENV === "production") {
      generatedRssFeed(config, data.contents);
    }

    return {
      props: {
        data,
        categories,
        tags,
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
