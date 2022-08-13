import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { fetchCategories, fetchConfig } from "@/api";
import { TwoColumnLayout } from "@/components/layouts/TwoColumnLayout";
import { CategoryList } from "@/components/molecules/CategoryList";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import type { TCategory, TConfig, TPickup, TRankedArticle } from "@/types";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Categories: NextPage<Props> = ({ config, categories, pickup, popularArticles }) => {
  const { siteTitle, host } = config;
  const heading = "カテゴリー一覧";
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(urlTable.categories, host);
  const backLinks = getBackLinks([urlTable.home]);
  return (
    <TwoColumnLayout
      config={config}
      pickup={pickup}
      host={host}
      url={url}
      title={pageTitle}
      backLinks={backLinks}
      heading={heading}
      categories={categories}
      popularArticles={popularArticles}
    >
      <CategoryList categories={categories} width={128} height={128} />
    </TwoColumnLayout>
  );
};

type StaticProps = {
  config: TConfig;
  categories: TCategory[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

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

export default Categories;
