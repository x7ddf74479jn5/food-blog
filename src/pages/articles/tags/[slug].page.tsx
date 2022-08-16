import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { ParsedUrlQuery } from "node:querystring";

import { fetchArticles, fetchCategories, fetchConfig, fetchTag, fetchTags } from "@/api";
import type { TagsProps } from "@/components/pages/articles/tags";
import { Tags } from "@/components/pages/articles/tags";
import { getPickupArticles, getPopularArticles } from "@/services/article";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const TagsPage: NextPage<Props> = (props) => {
  return <Tags {...props} />;
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

type StaticProps = TagsProps;

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({ params }) => {
  const slug = params?.slug;
  if (!slug) {
    throw new Error("Error: ID not found");
  }
  const tag = await fetchTag(slug);

  const [data, config, categories, pickup, popularArticles] = await Promise.all([
    fetchArticles({ filters: `tags[contains]${tag.id}` }),
    fetchConfig(),
    fetchCategories(),
    getPickupArticles(new Date()),
    getPopularArticles(),
  ]);

  return {
    props: {
      data,
      tag,
      config,
      categories,
      pickup,
      popularArticles,
    },
  };
};

export default TagsPage;
