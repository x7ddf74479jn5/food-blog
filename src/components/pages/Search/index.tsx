import { fetchConfig } from "@/repositories";

import { SearchClient } from "./Search.client";

export const Search = async () => {
  const config = await fetchConfig();

  return <SearchClient config={config} />;
};
