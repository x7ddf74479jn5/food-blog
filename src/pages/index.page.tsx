import type { GetStaticProps, NextPage } from "next";

import { fetchArticles, fetchCategories, fetchConfig } from "@/api";
import type { HomeProps } from "@/components/pages/Home";
import { Home } from "@/components/pages/Home";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import { generatedRssFeed } from "@/utils/rss/rss";

const HomePage: NextPage<HomeProps> = (props) => {
  return <Home {...props} />;
};

export default HomePage;

type StaticProps = HomeProps;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
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
};
