import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";
import type { ParsedUrlQuery } from "node:querystring";
import { memo } from "react";
import { client } from "src/lib/client";
import type { TArticle, TArticleListResponse, TCategory, TConfig, TTag } from "src/types";
import fetchCategories from "src/utils/fetchCategories";
import fetchConfig from "src/utils/fetchConfig";
import fetchTags from "src/utils/fetchTags";
import mdx2html from "src/utils/mdx2html";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const ArticleDetail = ({
  article,
  // mdxSource,
  // categories: categoriesAtMenu,
  // tags: tagsAtMenu,
  // config,
  isPreview,
}: Props) => {
  const {
    id,
    // image, imageOption, title, category, tags, publishedAt
  } = article;

  return <>{isPreview ? <div>preview</div> : id ? <div>{id}</div> : null}</>;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get<TArticleListResponse>({ endpoint: "articles" });

  const paths = data.contents.map((article) => `/articles/${article.id}`);

  return { paths, fallback: false };
};

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

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({ params, preview }) => {
  const id = params?.id || params?.slug;

  const config = await fetchConfig();
  const tags = (await fetchTags()) as TTag[];
  const categories = (await fetchCategories()) as TCategory[];

  const article = await client.get<TArticle>({
    endpoint: "articles",
    contentId: id,
    // queries: { draftKey: previewData.draftKey || "" },
  });

  const mdxSource = await mdx2html(article.body);

  return {
    props: {
      article,
      mdxSource,
      tags,
      categories,
      config,
      isPreview: preview,
    },
  };
};

export default memo(ArticleDetail);
