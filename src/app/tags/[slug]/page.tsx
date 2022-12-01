import type { ParsedUrlQuery } from "node:querystring";

import { notFound } from "next/navigation";

import { Tag } from "@/components/pages/Tag";
import { fetchTags } from "@/repositories";

const TagsPage = ({ slug }: TagPageParams) => {
  if (slug) notFound();

  // @ts-expect-error server component
  return <Tag slug={slug} />;
};

export interface TagPageParams extends ParsedUrlQuery {
  slug?: string;
}

export const generateStaticParams = async () => {
  const data = await fetchTags();
  const paths = data.map((tag) => ({ slug: tag.slug }));

  return paths;
};

export default TagsPage;
