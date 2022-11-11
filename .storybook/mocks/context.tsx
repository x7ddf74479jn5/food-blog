import type { StoryFnReactReturnType } from "@storybook/react/dist/ts3.9/client/preview/types";
import { RouterContext } from "next/dist/shared/lib/router-context";
import type { NextRouter } from "next/router";
import React from "react";

import { SearchProvider } from "@/components/organisms/SearchArea/SearchContext";

export const withContext = (storyFn: () => StoryFnReactReturnType) => {
  return <SearchProvider>{storyFn()}</SearchProvider>;
};

export const withRouterContext = (storyFn: () => StoryFnReactReturnType, options?: Partial<NextRouter>) => {
  const mockedRouter: NextRouter = {
    asPath: "/",
    back: () => {},
    basePath: "/",
    beforePopState: () => {},
    events: {
      emit: () => {},
      off: () => {},
      on: () => {},
    },
    isFallback: false,
    isLocaleDomain: true,
    isPreview: false,
    isReady: true,
    pathname: "/",
    prefetch: () => {
      return Promise.resolve();
    },
    push: () => {
      return Promise.resolve(true);
    },
    query: {},
    reload: () => {},
    replace: () => {
      return Promise.resolve(true);
    },
    route: "/",
    ...options,
  };
  return <RouterContext.Provider value={mockedRouter}>{storyFn()}</RouterContext.Provider>;
};
