import type { ParsedUrlQuery } from "node:querystring";

import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/pages/articles/ArticleDetail";
import { fetchArticles } from "@/repositories";

export const ArticleDetailPage = async ({ id }: Params) => {
  if (!id) notFound();
  // @ts-expect-error server component
  return <ArticleDetail articleId={id} />;
};

interface Params extends ParsedUrlQuery {
  id?: string;
}

export const generateStaticParams = async () => {
  const data = await fetchArticles();
  const paths = data.contents.map((article) => ({ id: article.id }));

  return paths;
};

export default ArticleDetailPage;
