import { client } from "src/lib/client";
import type { TTagListResponse } from "src/types";

import { HttpError } from "@/utils/error/Http";

type Args = {
  slug?: string;
};

export const fetchTags = async (props?: Args) => {
  const { slug } = props || {};
  try {
    const data = await client.get<TTagListResponse>({ endpoint: "tags" });
    if (slug) {
      return data.contents.find((item) => item.slug === slug);
    }
    return data.contents;
  } catch (error) {
    if (error instanceof HttpError) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};

export default fetchTags;
