import type { GetServerSideProps, NextPage } from "next";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { HtmlHeadNoIndex } from "@/components/meta/HtmlHead";
import { Error as ErrorPage } from "@/components/pages/Errorw";
import type { ArticleDetailPreviewProps } from "@/components/pages/Preview";
import { ArticleDetailPreview } from "@/components/pages/Preview";
import { mdx2html } from "@/lib/mdx";
import { sentryLogServer } from "@/lib/sentry/logger";
import { fetchConfig, fetchTags } from "@/repositories";
import { getArticle, getPickupArticles, getPopularArticles } from "@/services/article";
import { isDraft } from "@/services/article/isDraft";
import { getCategories } from "@/services/category";
import type { TArticle } from "@/types";

type PagePropsOrError<T extends object> = (T & { error?: undefined }) | { error: { statusCode: number } };
type Props = PagePropsOrError<ArticleDetailPreviewProps>;

const ArticlePreviewPage: NextPage<Props> = (props) => {
  return props?.error ? (
    <ErrorPage />
  ) : (
    <>
      <HtmlHeadNoIndex />
      <ArticleDetailPreview {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
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
    const { draftKey, id } = previewData;
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
        categories,
        config,
        isPreview,
        mdxSource,
        pickup,
        popularArticles,
        relatedArticles,
        tags,
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
