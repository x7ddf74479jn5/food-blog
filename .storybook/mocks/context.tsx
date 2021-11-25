import React from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { StoryFnReactReturnType } from "@storybook/react/dist/ts3.9/client/preview/types";
import { NextRouter } from "next/router";
import { SearchHistoryProvider } from "@/context";

export const withContext = (storyFn: () => StoryFnReactReturnType) => {
  return <SearchHistoryProvider>{storyFn()}</SearchHistoryProvider>;
};

export const withRouterContext = (storyFn: () => StoryFnReactReturnType, options?: Partial<NextRouter>) => {
  const mockedRouter: NextRouter = {
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    basePath: "/",
    isLocaleDomain: true,
    isReady: true,
    push: () => {
      return Promise.resolve(true);
    },
    prefetch: () => {
      return Promise.resolve();
    },
    replace: () => {
      return Promise.resolve(true);
    },
    reload: () => {},
    back: () => {},
    beforePopState: () => {},
    events: {
      on: () => {},
      off: () => {},
      emit: () => {},
    },
    isFallback: false,
    isPreview: false,
    ...options,
  };
  return <RouterContext.Provider value={mockedRouter}>{storyFn()}</RouterContext.Provider>;
};
