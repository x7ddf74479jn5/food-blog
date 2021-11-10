import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { TwoColumnLayout } from "@/components/layouts/TwoColumnLayout";
import { CategoryList } from "@/components/molecules/CategoryList";
import type { TCategory, TConfig, TPickup } from "@/types";
import { getNewDate } from "@/utils/date/getNewDate";
import { fetchCategories, fetchConfig, fetchPickupArticles } from "@/utils/fetcher";
import { UrlTable } from "@/utils/paths/url";
import { getBackLinks } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Categories: NextPage<Props> = ({ config, categories, pickup }) => {
  const { host } = config;
  const title = "カテゴリー一覧";
  const url = new URL(UrlTable.categories, host).toString();
  const backLinks = getBackLinks([UrlTable.home]);
  return (
    <TwoColumnLayout config={config} pickup={pickup} host={host} url={url} title={title} backLinks={backLinks}>
      <CategoryList categories={categories} width={128} height={128} />
    </TwoColumnLayout>
  );
};

type StaticProps = {
  config: TConfig;
  categories: TCategory[];
  pickup: TPickup;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [config, _categories, pickup] = await Promise.all([
    fetchConfig(),
    fetchCategories(),
    fetchPickupArticles(getNewDate()),
  ]);

  return {
    props: {
      config,
      categories: _categories,
      pickup,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Categories;
