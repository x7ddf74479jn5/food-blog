import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { HtmlHeadBase } from "@/components/functions/meta";
import HomeLayout from "@/components/layouts/HomeLayout";
import { ArticleSWRContainer } from "@/components/organisms/ArticleSWRContainer";
import { getPickupArticles, getPopularArticles } from "@/services/article";
import type { TArticleListResponse, TCategory, TConfig, TPickup, TRankedArticle } from "@/types";
import { fetchArticles, fetchCategories, fetchConfig } from "@/utils/fetcher";
import { generatedRssFeed } from "@/utils/rss/rss";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ data, config, pickup, categories, popularArticles }: Props) => {
  const { siteTitle: title, host } = config;

  return (
    <HomeLayout
      pickup={pickup}
      url={host}
      pageTitle={title}
      config={config}
      categories={categories}
      popularArticles={popularArticles}
    >
      <HtmlHeadBase indexUrl={host} siteTitle={title} />
      <div className="mb-8">
        <h1>レシピ一覧</h1>
      </div>
      <ArticleSWRContainer fallbackData={data} />
    </HomeLayout>
  );
};

type StaticProps = {
  data: TArticleListResponse;
  categories: TCategory[];
  config: TConfig;
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

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

export default Home;
