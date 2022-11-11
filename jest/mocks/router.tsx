import { RouterContext } from "next/dist/shared/lib/router-context";
import type { NextRouter } from "next/router";

export type { NextRouter };
export { RouterContext };

export const mockRouter: NextRouter = {
  asPath: "/",
  basePath: "/",
  isLocaleDomain: true,
  back: jest.fn(),
  isReady: true,
  beforePopState: jest.fn(),
  pathname: "/",
  events: {
    emit: jest.fn(),
    off: jest.fn(),
    on: jest.fn(),
  },
  prefetch: jest.fn(),
  isFallback: false,
  route: "/",
  isPreview: false,
  query: {},
  push: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
};

export const withMockedRouter = (
  router: Partial<NextRouter> = {},
  children: React.ReactElement
): React.ReactElement => {
  const mockedRouter: NextRouter = {
    ...mockRouter,
    ...router,
  };

  return <RouterContext.Provider value={mockedRouter}>{children}</RouterContext.Provider>;
};
