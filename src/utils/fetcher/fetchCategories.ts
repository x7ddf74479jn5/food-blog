import { client } from "src/lib/client";
import type { TCategory, TCategoryListResponse } from "src/types";

import { HttpError } from "@/utils/error/Http";

export const fetchCategory = async (slug: string): Promise<TCategory> => {
  try {
    const data = await client.get<TCategoryListResponse>({
      endpoint: "categories",
      queries: { filters: `slug[equals]${slug}` },
    });
    return data.contents[0];
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(error);
      throw error;
    }
    throw error;
  }
};

export const fetchCategories = async (): Promise<TCategory[]> => {
  try {
    const data = await client.get<TCategoryListResponse>({ endpoint: "categories", queries: { limit: 100 } });
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
