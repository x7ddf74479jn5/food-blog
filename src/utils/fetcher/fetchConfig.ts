import { client } from "src/lib/client";
import type { TConfig } from "src/types";

import { HttpError } from "@/utils/error/Http";

export const fetchConfig = async () => {
  try {
    const data = await client.get<TConfig>({ endpoint: "configs" }).then((res) => res);

    return data;
  } catch (error) {
    if (error instanceof HttpError) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};

export default fetchConfig;
