import { client } from "src/lib/client";
import type { TTag, TTagListResponse } from "src/types";

import { HttpError } from "@/utils/error/Http";

type Args = {
  slug?: string;
};

export const fetchTags = async (props?: Args) => {
  const { slug } = props || {};
  try {
    const data = await client.get<TTagListResponse>({ endpoint: "tags", queries: { limit: 100 } });
    if (slug) {
      return data.contents.find((item) => item.slug === slug) as TTag;
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

export default fetchTags;
