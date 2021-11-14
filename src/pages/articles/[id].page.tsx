import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";
import type { ParsedUrlQuery } from "node:querystring";
import { memo } from "react";
import { FaPen, FaRegCalendar } from "react-icons/fa";
import type { TArticle, TCategory, TConfig, TPickup } from "src/types";

import ButtonCategory from "@/components/atoms/buttons/ButtonCategory";
import { HtmlHeadBase, HtmlHeadJsonLd } from "@/components/atoms/meta";
import TextDate from "@/components/atoms/texts/TextDate/index";
import Thumbnail from "@/components/atoms/Thumbnail";
import ArticleLayout from "@/components/layouts/ArticleLayout";
import { TagListColored } from "@/components/molecules/TagList";
import { getNewDate } from "@/utils/date/getNewDate";
import getSafeDate from "@/utils/date/getSafeDate";
import { fetchCategories, fetchConfig } from "@/utils/fetcher";
import { fetchArticle, fetchArticles, fetchPickupArticles, getRelatedArticles } from "@/utils/fetcher/fetchArticles";
import getExcerpt from "@/utils/formatter/getExcerpt";
import mdx2html from "@/utils/mdx/mdx2html";
import { UrlTable } from "@/utils/paths/url";
import { getBackLinks } from "@/utils/paths/url";
import { isDraft } from "@/utils/validator";

export type ArticleDetailProps = InferGetStaticPropsType<typeof getStaticProps>;

export const ArticleDetail = ({
  article,
  mdxSource,
  categories: categoriesAtMenu,
  config,
  isPreview,
  relatedArticles,
  pickup,
}: ArticleDetailProps) => {
  const { id, image, title, description, category, tags, writer, linkCardArticles, publishedAt, updatedAt } = article;
  const { host } = config;
  const url = new URL(id ?? "", host).toString();
  const backLinks = getBackLinks([UrlTable.home, UrlTable.categories]);
  const safePublishedAt = getSafeDate(publishedAt);
  const safeModifiedAt = getSafeDate(updatedAt);
  const { name: writerName, avatar } = writer;

  return (
    <ArticleLayout
      url={url}
      config={config}
      pageTitle={title}
      backLinks={backLinks}
      relatedArticles={relatedArticles}
      categories={categoriesAtMenu}
      pickup={pickup}
    >
      <HtmlHeadBase indexUrl={host} title={title} url={url} image={image.url} />
      <HtmlHeadJsonLd
        url={url}
        title={title}
        image={image.url}
        datePublished={safePublishedAt.toISOString()}
        dateModified={safeModifiedAt.toISOString()}
        authorName={writerName}
        description={getExcerpt(description)}
      />
      {id ? (
        <>
          {isPreview && <div className="mb-4 text-center text-white bg-red-500">Preview mode enabled</div>}
          <article className="prose md:prose prose-sm dark:prose-dark">
            <div className="mb-4">
              <Thumbnail src={image.url} title={title} />
            </div>
            <h1>{title}</h1>
            <div className="flex flex-row justify-around mb-4">
              <div className="flex flex-row gap-2 items-center">
                <FaRegCalendar />
                <TextDate date={safePublishedAt} />
              </div>
              <div className="flex flex-row gap-2 items-center">
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
            <div className="flex flex-col gap-4 p-2 sm:p-4 bg-gray-50 dark:bg-gray-700">
              <div className="flex flex-row gap-2 items-center">
                <span className="text-black dark:text-white">カテゴリー：</span>
                <ButtonCategory category={category} />
              </div>
              <TagListColored tags={tags} />
            </div>
            <div id="js-toc-content">
              <MDXRemote {...mdxSource} scope={{ articles: linkCardArticles }} />
            </div>
          </article>
        </>
      ) : null}
    </ArticleLayout>
  );
};

interface Params extends ParsedUrlQuery {
  id?: string;
  slug?: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await fetchArticles();
  const paths = data.contents.map((article) => `${UrlTable.articles}/${article.id}`);

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
};

export const getStaticProps: GetStaticProps<ArticlesStaticProps, Params> = async ({ params, preview, previewData }) => {
  const id = params?.id || params?.slug;
  if (!id) {
    throw new Error("Error: ID not found");
  }
  try {
    const queries = preview ? { draftKey: isDraft(previewData) ? previewData.draftKey : "" } : {};

    const [_config, _categories, article, pickup] = await Promise.all([
      fetchConfig(),
      fetchCategories(),
      fetchArticle(id, queries),
      fetchPickupArticles(getNewDate()),
    ]);

    const relatedArticles = await getRelatedArticles(article);

    const mdxSource = await mdx2html(article.body);
    const isPreview = preview === undefined ? false : preview;

    return {
      props: {
        article,
        mdxSource,
        categories: _categories,
        config: _config,
        isPreview,
        relatedArticles,
        pickup,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default memo(ArticleDetail);
