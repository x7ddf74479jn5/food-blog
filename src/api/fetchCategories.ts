import { client } from "@/lib/microcms";
import type { TCategory, TCategoryListResponse } from "@/types";

export const fetchCategory = async (slug: string): Promise<TCategory> => {
  const data = await client.get<TCategoryListResponse>({
    endpoint: "categories",
    queries: { filters: `slug[equals]${slug}` },
  });
  return data.contents[0] ?? [];
};

export const fetchCategories = async (): Promise<TCategory[]> => {
  const data = await client.get<TCategoryListResponse>({ endpoint: "categories", queries: { limit: 100 } });
  return data.contents;
};

export default fetchCategories;
