import type { GetStaticProps, NextPage } from "next";

import { fetchCategories, fetchConfig } from "@/api";
import type { OfflineProps } from "@/components/pages/Offline";
import { Offline } from "@/components/pages/Offline";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import type { PagePropsOrError } from "@/types";

type OfflinePageProps = PagePropsOrError<OfflineProps>;

const OfflinePage: NextPage<OfflinePageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Offline {...props} />;
};

export const getStaticProps: GetStaticProps<OfflinePageProps> = async () => {
  try {
    const config = await fetchConfig();
    const categories = await fetchCategories();

    return {
      props: {
        config,
        categories,
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
