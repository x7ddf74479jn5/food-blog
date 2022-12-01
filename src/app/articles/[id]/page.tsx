import type { ParsedUrlQuery } from "node:querystring";

import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/pages/articles/ArticleDetail";
import { fetchArticles } from "@/repositories";

export type ArticleDetailProps = { params: ArticleDetailParams };

export const ArticleDetailPage = async ({ params }: ArticleDetailProps) => {
  const { id } = params;

  if (!id) notFound();
  // @ts-expect-error server component
  return <ArticleDetail articleId={id} />;
};

export interface ArticleDetailParams extends ParsedUrlQuery {
  id?: string;
}

export const generateStaticParams = async () => {
  const data = await fetchArticles();
  const paths = data.contents.map((article) => ({ id: article.id }));

  return paths;
};

export default ArticleDetailPage;
