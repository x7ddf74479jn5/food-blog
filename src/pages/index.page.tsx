import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { TArticle, TCategory, TConfig, TPickup } from "src/types";

import { LoadMoreButton } from "@/components/atoms/buttons/LoadMoreButton";
import { HtmlHeadBase } from "@/components/atoms/meta";
import { HeadingOne } from "@/components/atoms/texts/Heading";
import HomeLayout from "@/components/layouts/HomeLayout";
import ArticleList from "@/components/molecules/ArticleList";
// import { ArticleSuspenseContainer } from "@/components/organisms/ArticleSuspenseContainer";
import { getNewDate } from "@/utils/date";
import { fetchArticles, fetchCategories, fetchConfig, fetchPickupArticles, fetchTags } from "@/utils/fetcher";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ articles, config, pickup, categories }: Props) => {
  const { siteTitle: title, host } = config;
  return (
    <HomeLayout pickup={pickup} url={host} pageTitle={title} config={config} categories={categories}>
      <HtmlHeadBase indexUrl={host} siteTitle={title} />
      <div className="mb-8">
        <HeadingOne>レシピ一覧</HeadingOne>
      </div>
      {/* <ArticleSuspenseContainer /> */}
      <ArticleList articles={articles} />
      <LoadMoreButton
        handleOnClick={() => {
          return;
        }}
      />
    </HomeLayout>
  );
};

type StaticProps = {
  articles: TArticle[];
  totalCount: number;
  categories: TCategory[];
  config: TConfig;
  pickup: TPickup;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [_config, _categories, _tags, data, pickup] = await Promise.all([
    fetchConfig(),
    fetchCategories(),
    fetchTags(),
    fetchArticles({ limit: 5, offset: 0 }),
    fetchPickupArticles(getNewDate()),
  ]);

  const { contents: articles, totalCount } = data;
  return {
    props: {
      articles,
      totalCount,
      categories: _categories,
      config: _config,
      pickup,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Home;
