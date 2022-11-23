import type { ParsedUrlQuery } from "node:querystring";

import { notFound } from "next/navigation";

import { Category } from "@/components/pages/articles/categories/Category";
import { fetchCategories } from "@/repositories";

const CategoryPage = ({ slug }: Params) => {
  if (!slug) notFound();

  // @ts-expect-error server component
  return <Category slug={slug} />;
};

interface Params extends ParsedUrlQuery {
  slug?: string;
}

export const generateStaticParams = async () => {
  const data = await fetchCategories();
  const paths = data.map((category) => ({ slug: category.slug }));

  return paths;
};

export default CategoryPage;
