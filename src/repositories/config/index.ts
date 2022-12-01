import { cache } from "react";

import { client } from "@/lib/microcms";
import type { TConfig } from "@/types";

export const fetchConfig = cache(async () => {
  const data = await client.getObject<TConfig>({ endpoint: "configs" });
  return data;
});
