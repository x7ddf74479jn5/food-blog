import type { GetStaticProps, NextPage } from "next";

import type { SearchProps } from "@/components/pages/Search";
import { Search } from "@/components/pages/Search";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import { fetchConfig, fetchTags } from "@/repositories";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import { getCategories } from "@/services/category";
import type { PagePropsOrError } from "@/types";

type SearchPageProps = PagePropsOrError<SearchProps>;

const SearchPage: NextPage<SearchPageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Search {...props} />;
};

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
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

export default SearchPage;
