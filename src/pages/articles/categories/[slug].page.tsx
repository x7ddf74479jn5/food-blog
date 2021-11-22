import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { ParsedUrlQuery } from "node:querystring";

import { HtmlHeadBase } from "@/components/atoms/meta";
import { HeadingOne } from "@/components/atoms/texts/Heading";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleList from "@/components/molecules/ArticleList";
import type { TArticle, TCategory, TConfig, TPickup } from "@/types";
import { getNewDate } from "@/utils/date";
import { fetchArticles, fetchCategories, fetchCategory, fetchConfig, fetchPickupArticles } from "@/utils/fetcher";
import { formatPageTitle } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Category: NextPage<Props> = ({ articles, category, config, categories, pickup }) => {
  const { siteTitle, host } = config;
  const heading = `カテゴリー：${category.name}`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = new URL(`${urlTable.categories}/${category.slug}`, host).toString();
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);

  return (
    <DefaultLayout
      config={config}
      pageTitle={pageTitle}
      url={url}
      backLinks={backLinks}
      categories={categories}
      pickup={pickup}
    >
      <HtmlHeadBase indexUrl={host} pageTitle={pageTitle} url={url} image={category.image.url} />
      <div className="mb-8">
        <HeadingOne>{heading}</HeadingOne>
      </div>
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
  const paths = data.map((category) => {
    return { params: { slug: category.slug } };
  });

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

export default Category;
