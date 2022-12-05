import React from "react";

import { createMockRouterHoc, defaultMockRouter } from "mocks/next/router";
import { defaultMockLegacyRouter, withMockLegacyRouter } from "mocks/next/legacy-router";

import { SearchProvider } from "@/components/organisms/SearchArea/SearchContext";

export const withContext = (Story: React.ReactElement) => {
  return withMockLegacyRouter(withRouterContext(<SearchProvider>{Story}</SearchProvider>));
};

export const withRouterContext = createMockRouterHoc();

export { defaultMockLegacyRouter, defaultMockRouter, withMockLegacyRouter };
