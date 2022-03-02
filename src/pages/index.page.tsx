import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { HeadingOne } from "@/components/atoms/texts/Heading";
import { HtmlHeadBase } from "@/components/functions/meta";
import HomeLayout from "@/components/layouts/HomeLayout";
import { ArticleSWRContainer } from "@/components/organisms/ArticleSWRContainer";
import type { TArticleListResponse, TCategory, TConfig, TPickup } from "@/types";
import { fetchArticles, fetchCategories, fetchConfig, fetchPickupArticles } from "@/utils/fetcher";
import { generatedRssFeed } from "@/utils/rss/rss";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ data, config, pickup, categories }: Props) => {
  const { siteTitle: title, host } = config;

  return (
    <HomeLayout pickup={pickup} url={host} pageTitle={title} config={config} categories={categories}>
      <HtmlHeadBase indexUrl={host} siteTitle={title} />
      <div className="mb-8">
        <HeadingOne>レシピ一覧</HeadingOne>
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
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [config, categories, data, pickup] = await Promise.all([
    fetchConfig(),
    fetchCategories(),
    fetchArticles({ limit: 10, offset: 0 }),
    fetchPickupArticles(new Date()),
  ]);

  generatedRssFeed(config, data.contents);

  return {
    props: {
      data,
      categories,
      config,
      pickup,
    },
  };
};

export default Home;
