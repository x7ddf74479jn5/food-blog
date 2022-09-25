import type { GetServerSideProps, NextPage } from "next";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { fetchConfig, fetchTags } from "@/api";
import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { mdx2html } from "@/lib/mdx";
import { sentryLogServer } from "@/lib/sentry/logger";
import ErrorPage from "@/pages/_error/index.page";
import type { ArticleDetailPageProps } from "@/pages/articles/[id].page";
import { ArticleDetailPage } from "@/pages/articles/[id].page";
import { getArticle, getPickupArticles, getPopularArticles } from "@/services/article";
import { getCategories } from "@/services/category";
import type { TArticle } from "@/types";
import { isDraft } from "@/utils/article";

const ArticlePreviewPage: NextPage<ArticleDetailPageProps> = (props) => {
  return props.error ? (
    <ErrorPage statusCode={props.error.statusCode} />
  ) : (
    <>
      <HtmlHeadNoIndex />
      <ArticleDetailPage {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ArticleDetailPageProps, Params> = async (context) => {
  const { preview: isPreview, previewData } = context;

  if (!isPreview || !isDraft(previewData)) {
    await sentryLogServer(new Error("PreviewData not found"), {
      contexts: {
        get_server_side_props_context: {
          context,
        },
      },
    });

    return {
      props: {
        error: {
          statusCode: 500,
        },
      },
    };
  }

  try {
    const { id, draftKey } = previewData;
    const queries = { draftKey };
    const [config, categories, tags, article, pickup, popularArticles] = await Promise.all([
      fetchConfig(),
      getCategories(),
      fetchTags(),
      getArticle(id, queries),
      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    const relatedArticles: TArticle[] = [];
    const mdxSource = await mdx2html(article.body);

    return {
      props: {
        article,
        mdxSource,
        categories,
        tags,
        config,
        isPreview,
        relatedArticles,
        pickup,
        popularArticles,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      await sentryLogServer(error, {
        contexts: {
          get_server_side_props_context: {
            context,
          },
        },
      });
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

export default ArticlePreviewPage;
