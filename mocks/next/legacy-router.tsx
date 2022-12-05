/* eslint-disable @typescript-eslint/no-empty-function */
import { RouterContext } from "next/dist/shared/lib/router-context";
import type { NextRouter } from "next/router";

export type { NextRouter };
export { RouterContext };

export const defaultMockLegacyRouter: NextRouter = {
  asPath: "/",
  back: () => {},
  basePath: "/",
  beforePopState: () => {},
  events: {
    emit: () => {},
    off: () => {},
    on: () => {},
  },
  forward: () => {},
  isFallback: false,
  isLocaleDomain: true,
  isPreview: false,
  isReady: true,
  pathname: "/",
  prefetch: async (_url) => {},
  push: async (_url) => true,
  query: {},
  reload: () => {},
  replace: async (_url) => true,
  route: "/",
};

export const withMockLegacyRouter = (
  children: React.ReactElement,
  router: Partial<NextRouter> = {}
): React.ReactElement => {
  const mockRouter: NextRouter = {
    ...defaultMockLegacyRouter,
    ...router,
  };

  return <RouterContext.Provider value={mockRouter}>{children}</RouterContext.Provider>;
};
