import { client } from "src/lib/client";
import type { TTagListResponse } from "src/types";

type Args = {
  slug?: string;
};

export const fetchTags = async (props?: Args) => {
  const { slug } = props || {};

  const data = await client.get<TTagListResponse>({ endpoint: "tags" });

  if (slug) {
    return data.contents.find((item) => item.slug === slug);
  }
  return data.contents;
};

export default fetchTags;
