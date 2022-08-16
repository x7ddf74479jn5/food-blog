import type { GetStaticProps, NextPage } from "next";

import { fetchCategories, fetchConfig } from "@/api";
import type { CategoriesProps } from "@/components/pages/articles/categories/Categories";
import { Categories } from "@/components/pages/articles/categories/Categories";
import { getPickupArticles, getPopularArticles } from "@/services/article";

const CategoriesPage: NextPage<CategoriesProps> = (props) => {
  return <Categories {...props} />;
};

type StaticProps = CategoriesProps;

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

export default CategoriesPage;
