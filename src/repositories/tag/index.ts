import { client } from "@/lib/microcms";
import type { TTag, TTagListResponse } from "@/types";

export const fetchTag = async (slug: string): Promise<TTag> => {
  const data = await client.get<TTagListResponse>({ endpoint: "tags", queries: { filters: `slug[equals]${slug}` } });
  return data.contents[0] ?? [];
};

export const fetchTags = async (): Promise<TTag[]> => {
  const data = await client.get<TTagListResponse>({ endpoint: "tags", queries: { limit: 100 } });
  return data.contents;
};

export default fetchTags;
