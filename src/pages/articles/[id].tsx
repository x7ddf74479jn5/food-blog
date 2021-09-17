import ArticleLayout from "@components/layouts/ArticleLayout";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";
import type { ParsedUrlQuery } from "node:querystring";
import { memo } from "react";
import { client } from "src/lib/client";
import type { TArticle, TArticleListResponse, TCategory, TConfig, TTag } from "src/types";

import Thumbnail from "@/components/atoms/Thumbnail";
import { fetchCategories, fetchConfig, fetchTags } from "@/utils/fetcher";
import mdx2html from "@/utils/mdx/mdx2html";
import { isDraft } from "@/utils/validator/isDraft";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const ArticleDetail = ({
  article,
  mdxSource,
  // categories: categoriesAtMenu,
  // tags: tagsAtMenu,
  config,
  isPreview,
}: Props) => {
  const {
    id,
    image,
    title,
    // category, tags, publishedAt
  } = article;

  return (
    <ArticleLayout config={config}>
      {isPreview ? (
        <div>preview</div>
      ) : id ? (
        <article className="prose prose-green dark:prose-dark">
          <div className="mb-4">
            <Thumbnail src={image.url} title={title} />

            <h1>{title}</h1>
          </div>
          <MDXRemote {...mdxSource} />
        </article>
      ) : null}
    </ArticleLayout>
  );
};

export const getStaticPathsFactory = (isPreview?: boolean) => {
  return async () => {
    const data = await client.get<TArticleListResponse>({ endpoint: "articles" });
    const pageName = isPreview ? "preview" : "articles";
    const paths = data.contents.map((article) => `/${pageName}/${article.id}`);

    return { paths, fallback: false };
  };
};

export const getStaticPaths: GetStaticPaths = getStaticPathsFactory();

type StaticProps = {
  article: TArticle;
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
  isPreview?: boolean;
};

interface Params extends ParsedUrlQuery {
  id?: string;
  slug?: string;
}

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({ params, preview, previewData }) => {
  const id = params?.id || params?.slug;

  const config = (await fetchConfig()) as TConfig;
  const tags = (await fetchTags()) as TTag[];
  const categories = (await fetchCategories()) as TCategory[];

  const article = await client.get<TArticle>({
    endpoint: "articles",
    contentId: id,
    queries: preview ? { draftKey: isDraft(previewData) ? previewData.draftKey : "" } : {},
  });

  const mdxSource = await mdx2html(article.body);
  const isPreview = preview === undefined ? false : preview;

  return {
    props: {
      article,
      mdxSource,
      tags,
      categories,
      config,
      isPreview,
    },
  };
};

export default memo(ArticleDetail);
