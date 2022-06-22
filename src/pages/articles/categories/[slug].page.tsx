import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { ParsedUrlQuery } from "node:querystring";

import { HtmlHeadBase } from "@/components/functions/meta";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { ArticleSWRContainer } from "@/components/organisms/ArticleSWRContainer";
import { getPickupArticles } from "@/services/article";
import type { TArticleListResponse, TCategory, TConfig, TPickup } from "@/types";
import { fetchArticles, fetchCategories, fetchCategory, fetchConfig } from "@/utils/fetcher";
import { formatPageTitle } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Category: NextPage<Props> = ({ data, category, config, categories, pickup }) => {
  const { siteTitle, host } = config;
  const heading = `カテゴリー：${category.name}`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = new URL(`${urlTable.categories}/${category.slug}`, host).toString();
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const queryOptions = { filters: `category[equals]${category.id}` };

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
        <h1>{heading}</h1>
      </div>
      <div className="w-full min-h-screen">
        <ArticleSWRContainer fallbackData={data} queryOptions={queryOptions} />
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
  data: TArticleListResponse;
  pickup: TPickup;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({ params }) => {
  const slug = params?.slug;
  if (!slug) {
    throw new Error("Error: ID not found");
  }

  const category = await fetchCategory(slug);

  const [data, config, categories, pickup] = await Promise.all([
    fetchArticles({ filters: `category[equals]${category.id}` }),
    fetchConfig(),
    fetchCategories(),
    getPickupArticles(new Date()),
  ]);

  return {
    props: {
      data,
      category,
      config,
      categories,
      pickup,
    },
  };
};

export default Category;
