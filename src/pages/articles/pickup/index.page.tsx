import type { GetStaticProps, NextPage } from "next";

import { fetchCategories, fetchConfig } from "@/api";
import type { PickupProps } from "@/components/pages/articles/Pickup";
import { Pickup } from "@/components/pages/articles/Pickup";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import type { PagePropsOrError } from "@/types";

type PickupPageProps = PagePropsOrError<PickupProps>;

const PickupPage: NextPage<PickupPageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Pickup {...props} />;
};

export const getStaticProps: GetStaticProps<PickupPageProps> = async () => {
  try {
    const [config, categories, pickup, popularArticles] = await Promise.all([
      fetchConfig(),
      fetchCategories(),
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

export default PickupPage;
