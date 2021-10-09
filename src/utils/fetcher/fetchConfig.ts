import { client } from "src/lib/client";
import type { TConfig } from "src/types";

import { HttpError } from "@/utils/error/Http";

export const fetchConfig = async () => {
  try {
    const data = await client.get<TConfig>({ endpoint: "configs" });
    return data;
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(error);
      throw error;
    }
    throw error;
  }
};

export default fetchConfig;
