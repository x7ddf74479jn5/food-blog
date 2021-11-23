import type { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";

import { HeadingOne } from "@/components/atoms/texts/Heading";
import { HtmlHeadBase } from "@/components/functions/meta";
import HomeLayout from "@/components/layouts/HomeLayout";
import type { TArticleListResponse, TCategory, TConfig, TPickup } from "@/types";
import { getNewDate } from "@/utils/date";
import { fetchArticles, fetchCategories, fetchConfig, fetchPickupArticles } from "@/utils/fetcher";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ data, config, pickup, categories }: Props) => {
  const { siteTitle: title, host } = config;
  const ArticleSuspenseContainer = dynamic(() => import("@/components/organisms/ArticleSuspenseContainer"), {
    ssr: false,
  });

  return (
    <HomeLayout pickup={pickup} url={host} pageTitle={title} config={config} categories={categories}>
      <HtmlHeadBase indexUrl={host} siteTitle={title} />
      <div className="mb-8">
        <HeadingOne>レシピ一覧</HeadingOne>
      </div>
      <ArticleSuspenseContainer fallbackData={data} />
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
    fetchArticles({ limit: 5, offset: 0 }),
    fetchPickupArticles(getNewDate()),
  ]);

  return {
    props: {
      data,
      categories,
      config,
      pickup,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Home;
