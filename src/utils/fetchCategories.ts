import { client } from "src/lib/client";
import type { TCategoryListResponse } from "src/types";

type Args = {
  slug?: string;
};

export const fetchCategories = async (props?: Args) => {
  const { slug } = props || {};

  const data = await client.get<TCategoryListResponse>({ endpoint: "categories" });

  if (slug) {
    return data.contents.find((item) => item.slug === slug);
  }
  return data.contents;
};

export default fetchCategories;
