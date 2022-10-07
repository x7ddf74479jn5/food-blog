import type { GetStaticProps, NextPage } from "next";

import type { PickupProps } from "@/components/pages/articles/Pickup";
import { Pickup } from "@/components/pages/articles/Pickup";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import { fetchConfig, fetchTags } from "@/repositories";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import { getCategories } from "@/services/category";
import type { PagePropsOrError } from "@/types";

type PickupPageProps = PagePropsOrError<PickupProps>;

const PickupPage: NextPage<PickupPageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Pickup {...props} />;
};

export const getStaticProps: GetStaticProps<PickupPageProps> = async () => {
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

export default PickupPage;
