import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { TwoColumnLayout } from "@/components/layouts/TwoColumnLayout";
import { CategoryList } from "@/components/molecules/CategoryList";
import type { TCategory, TConfig, TPickup } from "@/types";
import { getNewDate } from "@/utils/date";
import { fetchCategories, fetchConfig, fetchPickupArticles } from "@/utils/fetcher";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Categories: NextPage<Props> = ({ config, categories, pickup }) => {
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
    >
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
  const [config, categories, pickup] = await Promise.all([
    fetchConfig(),
    fetchCategories(),
    fetchPickupArticles(getNewDate()),
  ]);

  return {
    props: {
      config,
      categories,
      pickup,
    },
  };
};

export default Categories;
