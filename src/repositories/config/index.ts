import { client } from "@/lib/microcms";
import type { TConfig } from "@/types";

export const fetchConfig = async () => {
  const data = await client.get<TConfig>({ endpoint: "configs" });
  return data;
};

export default fetchConfig;
