import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";
import type { ParsedUrlQuery } from "node:querystring";
import { FaPen, FaRegCalendar } from "react-icons/fa";

import ButtonCategory from "@/components/atoms/buttons/ButtonCategory";
import MDXCustomComponents from "@/components/atoms/mdx";
import TextDate from "@/components/atoms/texts/TextDate";
import Thumbnail from "@/components/atoms/Thumbnail";
import { HtmlHeadBase, HtmlHeadJsonLd } from "@/components/functions/meta";
import ArticleLayout from "@/components/layouts/ArticleLayout";
import { TagListColored } from "@/components/molecules/TagList";
import { getSafeDate } from "@/lib/date";
import { mdx2html } from "@/lib/mdx";
import { getPickupArticles, getPopularArticles, getRelatedArticles } from "@/services/article";
import type { TArticle, TCategory, TConfig, TPickup, TRankedArticle } from "@/types";
import { fetchArticle, fetchArticles, fetchCategories, fetchConfig } from "@/api";
import { formatPageTitle, formatPageUrl, getExcerpt } from "@/utils/formatter";
import { getBackLinks, urlTable } from "@/utils/paths/url";

export type ArticleDetailProps = InferGetStaticPropsType<typeof getStaticProps>;

export const ArticleDetail = ({
  article,
  mdxSource,
  categories: categoriesAtMenu,
  config,
  isPreview,
  relatedArticles,
  pickup,
  popularArticles,
}: ArticleDetailProps) => {
  const { id, image, title, description, category, tags, writer, linkCardArticles, publishedAt, updatedAt } = article;
  const { siteTitle, host } = config;
  const url = formatPageUrl(`${urlTable.articles}/${id}`, host);
  const backLinks = getBackLinks([urlTable.home, urlTable.categories]);
  const safePublishedAt = getSafeDate(publishedAt);
  const safeModifiedAt = getSafeDate(updatedAt);
  const { name: writerName, avatar } = writer;
  const data = { articles: linkCardArticles };
  const pageTitle = formatPageTitle(title, siteTitle);

  return (
    <ArticleLayout
      url={url}
      config={config}
      pageTitle={pageTitle}
      backLinks={backLinks}
      relatedArticles={relatedArticles}
      categories={categoriesAtMenu}
      pickup={pickup}
      popularArticles={popularArticles}
    >
      <HtmlHeadBase indexUrl={host} pageTitle={pageTitle} url={url} image={image.url} />
      <HtmlHeadJsonLd
        url={url}
        title={title}
        image={image.url}
        datePublished={safePublishedAt.toISOString()}
        dateModified={safeModifiedAt.toISOString()}
        authorName={writerName}
        description={getExcerpt(description)}
      />
      {isPreview && <div className="mb-4 bg-red-500 text-center text-white">Preview mode enabled</div>}
      <article className="prose dark:prose-dark">
        <div className="mb-4">
          <Thumbnail src={image.url} title={title} />
        </div>
        <h1>{title}</h1>
        <div className="mb-4 flex flex-row justify-around">
          <div className="flex flex-row items-center gap-2">
            <FaRegCalendar />
            <TextDate date={safePublishedAt} />
          </div>
          <div className="flex flex-row items-center gap-2">
            <FaPen />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar.url}
              alt={writerName}
              width={32}
              height={32}
              className="rounded-full"
              style={{ margin: 0 }}
            />
            <span>{writerName}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-gray-50 p-2 dark:bg-gray-700 sm:p-4">
          <div className="flex flex-row items-center gap-2">
            <span className="text-black dark:text-white">カテゴリー：</span>
            <ButtonCategory category={category} />
          </div>
          <TagListColored tags={tags} />
        </div>
        <div id="js-toc-content">
          {/* FIXME: reason is upgrade to React 18 */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <MDXRemote {...mdxSource} components={MDXCustomComponents} scope={data} />
        </div>
      </article>
    </ArticleLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id?: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await fetchArticles();
  const paths = data.contents.map((article) => {
    return { params: { id: article.id } };
  });

  return { paths, fallback: "blocking" };
};

export type ArticlesStaticProps = {
  article: TArticle;
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
  categories: TCategory[];
  config: TConfig;
  isPreview?: boolean;
  relatedArticles: TArticle[];
  pickup: TPickup;
  popularArticles: TRankedArticle[];
};

export const getStaticProps: GetStaticProps<ArticlesStaticProps, Params> = async ({ params }) => {
  const id = params?.id;

  if (!id) {
    throw new Error("Error: ID not found");
  }

  try {
    const [config, categories, article, pickup, popularArticles] = await Promise.all([
      fetchConfig(),
      fetchCategories(),
      fetchArticle(id),
      getPickupArticles(new Date()),
      getPopularArticles(),
    ]);

    const relatedArticles = await getRelatedArticles(article);

    const mdxSource = await mdx2html(article.body);

    return {
      props: {
        article,
        mdxSource,
        categories,
        config,
        isPreview: false,
        relatedArticles,
        pickup,
        popularArticles,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default ArticleDetail;
