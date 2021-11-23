import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import dynamic from "next/dynamic";
import type { ParsedUrlQuery } from "node:querystring";

import { HeadingOne } from "@/components/atoms/texts/Heading";
import { HtmlHeadBase } from "@/components/functions/meta";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import type { TArticleListResponse, TCategory, TConfig, TPickup, TTag } from "@/types";
import { getNewDate } from "@/utils/date";
import { fetchArticles, fetchCategories, fetchConfig, fetchPickupArticles, fetchTag, fetchTags } from "@/utils/fetcher";
import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Tags: NextPage<Props> = ({ data, tag, config, categories, pickup }) => {
  const { siteTitle, host } = config;
  const heading = `タグ：${tag.name}`;
  const pageTitle = formatPageTitle(heading, siteTitle);
  const url = formatPageUrl(`${urlTable.tags}/${tag.slug}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const ArticleSuspenseContainer = dynamic(() => import("@/components/organisms/ArticleSuspenseContainer"), {
    ssr: false,
  });

  return (
    <DefaultLayout
      config={config}
      pageTitle={pageTitle}
      url={url}
      backLinks={backLinks}
      categories={categories}
      pickup={pickup}
    >
      <HtmlHeadBase indexUrl={host} pageTitle={pageTitle} url={url} />
      <div className="mb-8">
        <HeadingOne>{heading}</HeadingOne>
      </div>
      <div className="w-full min-h-screen">
        <ArticleSuspenseContainer fallbackData={data} />
      </div>
    </DefaultLayout>
  );
};

interface Params extends ParsedUrlQuery {
  slug?: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await fetchTags();
  const paths = data.map((tag) => {
    return { params: { slug: tag.slug } };
  });

  return { paths, fallback: "blocking" };
};

type StaticProps = {
  tag: TTag;
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
  const tag = await fetchTag(slug);

  const [data, config, categories, pickup] = await Promise.all([
    fetchArticles({ filters: `tags[contains]${tag.id}` }),
    fetchConfig(),
    fetchCategories(),
    fetchPickupArticles(getNewDate()),
  ]);

  return {
    props: {
      data,
      tag,
      config,
      categories,
      pickup,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Tags;
