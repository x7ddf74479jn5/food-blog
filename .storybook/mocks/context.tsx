import type { StoryFnReactReturnType } from "@storybook/react/dist/ts3.9/client/preview/types";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context";

export const defaultMockRouter: AppRouterInstance = {
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
  push: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
};

import { SearchProvider } from "@/components/organisms/SearchArea/SearchContext";

export const withContext = (storyFn: () => StoryFnReactReturnType) => {
  return (
    <AppRouterContext.Provider value={defaultMockRouter}>
      <SearchProvider>{storyFn()}</SearchProvider>
    </AppRouterContext.Provider>
  );
};

export const withRouterContext = (storyFn: () => StoryFnReactReturnType, options?: Partial<AppRouterInstance>) => {
  const mockedRouter: AppRouterInstance = {
    ...defaultMockRouter,
    ...options,
  };
  return <AppRouterContext.Provider value={mockedRouter}>{storyFn()}</AppRouterContext.Provider>;
};
