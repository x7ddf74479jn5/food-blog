import React from "react";

import { createMockRouterHoc, defaultMockRouter } from "mocks/next/router";
import { defaultMockLegacyRouter, withMockLegacyRouter } from "mocks/next/legacy-router";

import { SearchProvider } from "@/contexts/search/SearchContext";
import { ViewportProvider } from "@/contexts/viewport/ViewportContext";

export const withContext = (Story: React.ReactElement) => {
  return withMockLegacyRouter(
    withRouterContext(
      <SearchProvider>
        <ViewportProvider>{Story}</ViewportProvider>
      </SearchProvider>
    )
  );
};

export const withRouterContext = createMockRouterHoc();

export { defaultMockLegacyRouter, defaultMockRouter, withMockLegacyRouter };
