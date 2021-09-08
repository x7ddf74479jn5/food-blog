import { client } from "lib/client";
import type { TConfig } from "src/types";

export const fetchConfig = async () => {
  const data = await client
    .get<TConfig>({ endpoint: "configs" })
    .then((res) => res)
    .catch(() => null);

  return data;
};

export default fetchConfig;
