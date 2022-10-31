import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import type { TagsProps } from "@/components/pages/articles/tags";
import { Tags } from "@/components/pages/articles/tags";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/page";
import { fetchConfig, fetchTag, fetchTags } from "@/repositories";
import { getArticles, getPickupArticles, getPopularArticles } from "@/services/article";
import { getCategories } from "@/services/category";
import type { PagePropsOrError } from "@/types";

type TagsPageProps = PagePropsOrError<TagsProps>;

const TagsPage: NextPage<TagsPageProps> = (props) => {
  return props.error ? <ErrorPage statusCode={props.error.statusCode} /> : <Tags {...props} />;
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

export const getStaticProps: GetStaticProps<TagsPageProps, Params> = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    return { notFound: true };
  }

  try {
    const tag = await fetchTag(slug);

    if (!tag) {
      return { notFound: true };
    }

    const [data, config, categories, tags, pickup, popularArticles] = await Promise.all([
      getArticles({ filters: `tags[contains]${tag.id}` }),
      fetchConfig(),
      getCategories(),
      fetchTags(),

      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    return {
      props: {
        data,
        tag,
        config,
        categories,
        tags,
        pickup,
        popularArticles,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      await sentryLogServer(error);
    }

    return {
      props: {
        error: {
          statusCode: 500,
        },
      },
    };
  }
};

export default TagsPage;
