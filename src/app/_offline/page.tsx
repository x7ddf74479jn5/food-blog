import type { GetStaticProps, NextPage } from "next";

import ErrorPage from "@/app/_error/page";
import type { OfflineProps } from "@/components/pages/Offline";
import { Offline } from "@/components/pages/Offline";
import { sentryLogServer } from "@/lib/sentry/logger";
import { fetchConfig, fetchTags } from "@/repositories";
import { getCategories } from "@/services/category";
import type { PagePropsOrError } from "@/types";

type OfflinePageProps = PagePropsOrError<OfflineProps>;

const OfflinePage: NextPage<OfflinePageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Offline {...props} />;
};

export const getStaticProps: GetStaticProps<OfflinePageProps> = async () => {
  try {
    const [config, categories, tags] = await Promise.all([fetchConfig(), getCategories(), fetchTags()]);

    return {
      props: {
        config,
        categories,
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
export default OfflinePage;
