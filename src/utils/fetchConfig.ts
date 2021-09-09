import { client } from "src/lib/client";
import type { TConfig } from "src/types";

export const fetchConfig = async () => {
  const data = await client.get<TConfig>({ endpoint: "configs" }).then((res) => res);

  return data;
};

export default fetchConfig;
