import { client } from "src/lib/client";
import type { TCategory, TCategoryListResponse } from "src/types";

import { HttpError } from "@/utils/error/Http";

type Args = {
  slug?: string;
};

export const fetchCategories = async (props?: Args) => {
  const { slug } = props || {};
  try {
    const data = await client.get<TCategoryListResponse>({ endpoint: "categories" });

    if (slug) {
      return data.contents.find((item) => item.slug === slug) as TCategory;
    }
    return data.contents;
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(error);
      throw error;
    }
    throw error;
  }
};

export default fetchCategories;
