import type { GetStaticProps, NextPage } from "next";

import { fetchCategories, fetchConfig } from "@/api";
import type { SearchProps } from "@/components/pages/Search";
import { Search } from "@/components/pages/Search";
import { getPickupArticles, getPopularArticles } from "@/services/article";

const SearchPage: NextPage<SearchProps> = (props) => {
  return <Search {...props} />;
};

type StaticProps = SearchProps;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
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
};

export default SearchPage;
