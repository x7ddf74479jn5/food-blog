import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "node:querystring";

import { fetchArticles, fetchCategories, fetchCategory, fetchConfig } from "@/api";
import { Categories } from "@/components/pages/articles/categories/Categories";
import type { CategoryProps } from "@/components/pages/articles/categories/Category";
import { getPickupArticles, getPopularArticles } from "@/services/article";

const CategoryPage: NextPage<CategoryProps> = (props) => {
  return <Categories {...props} />;
};

interface Params extends ParsedUrlQuery {
  slug?: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await fetchCategories();
  const paths = data.map((category) => {
    return { params: { slug: category.slug } };
  });

  return { paths, fallback: "blocking" };
};

type StaticProps = CategoryProps;

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({ params }) => {
  const slug = params?.slug;
  if (!slug) {
    throw new Error("Error: ID not found");
  }

  const category = await fetchCategory(slug);

  const [data, config, categories, pickup, popularArticles] = await Promise.all([
    fetchArticles({ filters: `category[equals]${category.id}` }),
    fetchConfig(),
    fetchCategories(),
    getPickupArticles(new Date()),
    getPopularArticles(),
  ]);

  return {
    props: {
      data,
      category,
      config,
      categories,
      pickup,
      popularArticles,
    },
  };
};

export default CategoryPage;
