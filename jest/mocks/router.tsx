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

export const withMockRouter = (
  router: Partial<AppRouterInstance> = {},
  children: React.ReactElement
): React.ReactElement => {
  const mockedRouter: AppRouterInstance = {
    ...defaultMockRouter,
    ...router,
  };

  return <AppRouterContext.Provider value={mockedRouter}>{children}</AppRouterContext.Provider>;
};

export { AppRouterContext };
