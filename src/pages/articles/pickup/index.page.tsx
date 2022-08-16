import type { GetStaticProps, NextPage } from "next";

import { fetchCategories, fetchConfig } from "@/api";
import type { PickupProps } from "@/components/pages/articles/Pickup";
import { Pickup } from "@/components/pages/articles/Pickup";
import { getPickupArticles, getPopularArticles } from "@/services/article";

const PickupPage: NextPage<PickupProps> = (props) => {
  return <Pickup {...props} />;
};

type StaticProps = PickupProps;

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

export default PickupPage;
