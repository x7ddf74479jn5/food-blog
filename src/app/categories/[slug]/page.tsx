import type { ParsedUrlQuery } from "node:querystring";

import { notFound } from "next/navigation";

import { Category } from "@/components/pages/categories/Category";
import { fetchCategories } from "@/repositories";

const CategoryPage = ({ params }: { params: CategoryPageParams }) => {
  const { slug } = params;

  if (!slug) notFound();

  // @ts-expect-error server component
  return <Category slug={slug} />;
};

export interface CategoryPageParams extends ParsedUrlQuery {
  slug?: string;
}

export const generateStaticParams = async () => {
  const data = await fetchCategories();
  const paths = data.map((category) => ({ slug: category.slug }));

  return paths;
};

export default CategoryPage;
