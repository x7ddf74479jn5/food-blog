import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { ParsedUrlQuery } from "node:querystring";

import { getNewDate } from "@//utils/date/getNewDate";
import { HtmlHeadBase } from "@/components/atoms/meta";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleList from "@/components/molecules/ArticleList";
import type { TArticle, TCategory, TConfig, TPickup } from "@/types/index";
import { fetchArticles, fetchCategories, fetchCategory, fetchConfig, fetchPickupArticles } from "@/utils/fetcher";
import { UrlTable } from "@/utils/paths/url";
import { getBackLinks } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Categories: NextPage<Props> = ({ articles, category, config, categories, pickup }) => {
  const { host } = config;
  const title = category.name;
  const url = new URL(`${UrlTable.categories}/${category.slug}`, host).toString();
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
      <HtmlHeadBase indexUrl={host} title={title} url={url} image={category.image.url} />

      <h1 className="mb-4 text-4xl font-bold">カテゴリー：{category.name}</h1>
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
  const data = await fetchCategories();
  const paths = data.map((category) => `${UrlTable.categories}/${category.slug}`);

  return { paths, fallback: "blocking" };
};

type StaticProps = {
  category: TCategory;
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

  const category = await fetchCategory(slug);

  const [_articles, config, _categories, pickup] = await Promise.all([
    fetchArticles({ filters: `category[equals]${category.id}` }),
    fetchConfig(),
    fetchCategories(),
    fetchPickupArticles(getNewDate()),
  ]);

  return {
    props: {
      articles: _articles.contents,
      category,
      config,
      categories: _categories,
      pickup,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Categories;
