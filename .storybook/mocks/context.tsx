import { defaultMockRouter } from "mocks/next/router";
import { AppRouterContext } from "mocks/next/router";
import { SearchProvider } from "@/components/organisms/SearchArea/SearchContext";
import { createMockRouterHoc } from "mocks/next/router";
import React from "react";

export const withContext = (Story: React.ReactElement) => {
  return (
    <AppRouterContext.Provider value={defaultMockRouter}>
      <SearchProvider>{Story}</SearchProvider>
    </AppRouterContext.Provider>
  );
};

export const withRouterContext = createMockRouterHoc();
