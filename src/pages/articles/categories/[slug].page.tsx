import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { ParsedUrlQuery } from "node:querystring";

import { getNewDate } from "@//utils/date/getNewDate";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleList from "@/components/molecules/ArticleList";
import type { TArticle, TCategory, TConfig, TPickup } from "@/types/index";
import { fetchArticles, fetchCategories, fetchConfig, fetchPickupArticles } from "@/utils/fetcher";
import { UrlTable } from "@/utils/paths/url";
import { getBackLinks } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Categories: NextPage<Props> = ({ articles, config, categories, pickup }) => {
  const url = UrlTable.home;
  const title = config.siteTitle;
  const backLinks = getBackLinks([UrlTable.home]);

  return (
    <DefaultLayout
      config={config}
      pageTitle={title}
      url={url}
      backLinks={backLinks}
      categories={categories}
      pickup={pickup}
    >
      <h1 className="mb-4 text-4xl font-bold">カテゴリー一覧</h1>
      <div className="w-full min-h-screen">
        <ArticleList articles={articles} />
      </div>
    </DefaultLayout>
  );
};

interface Params extends ParsedUrlQuery {
  slug?: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = (await fetchCategories()) as TCategory[];
  const paths = data.map((category) => `${UrlTable.categories}/${category.slug}`);

  return { paths, fallback: "blocking" };
};

type StaticProps = {
  categories: TCategory[];
  config: TConfig;
  articles: TArticle[];
  pickup: TPickup;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({ params }) => {
  const slug = params?.slug;
  if (!slug) {
    throw new Error("Error: ID not found");
  }

  const category = (await fetchCategories({ slug })) as TCategory;

  const [_articles, config, _categories, pickup] = await Promise.all([
    fetchArticles({ filters: `category[equals]${category.id}` }),
    fetchConfig(),
    fetchCategories(),
    fetchPickupArticles(getNewDate()),
  ]);

  return {
    props: {
      articles: _articles.contents,
      config,
      categories: _categories as TCategory[],
      pickup,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Categories;
