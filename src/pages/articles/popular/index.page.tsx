import type { GetStaticProps, NextPage } from "next";

import { fetchCategories, fetchConfig } from "@/api";
import type { PopularProps } from "@/components/pages/articles/Popular";
import { Popular } from "@/components/pages/articles/Popular";
import { getPickupArticles, getPopularArticles } from "@/services/article";

const PopularPage: NextPage<PopularProps> = (props) => {
  return <Popular {...props} />;
};

type StaticProps = PopularProps;

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

export default PopularPage;
