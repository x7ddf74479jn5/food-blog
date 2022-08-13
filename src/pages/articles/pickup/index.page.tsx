import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { HtmlHeadBase } from "@/components/functions/meta";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleList from "@/components/molecules/ArticleList";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import type { TCategory, TConfig, TPickup, TRankedArticle } from "@/types";
import { fetchCategories, fetchConfig } from "@/api";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PickupPage: NextPage<Props> = ({ config, categories, pickup, popularArticles }) => {
  const { siteTitle, host } = config;
  const heading = `おすすめ記事`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.pickup}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

  return (
    <DefaultLayout
      config={config}
      pageTitle={pageTitle}
      url={url}
      backLinks={backLinks}
      categories={categories}
      pickup={pickup}
      popularArticles={popularArticles}
    >
      <HtmlHeadBase indexUrl={host} pageTitle={pageTitle} url={url} />
      <div className="mb-8">
        <h1>{heading}</h1>
      </div>
      <div className="min-h-screen w-full">
        <section>
          <ArticleList articles={pickup.articles} />
        </section>
      </div>
    </DefaultLayout>
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

export default PickupPage;
