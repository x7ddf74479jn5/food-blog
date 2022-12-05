import { withMockLegacyRouter as BaseWithMockLegacyRouter } from "mocks/next/legacy-router";
import type { AppRouterInstance, HooksClientContext } from "mocks/next/router";
import { AppRouterContext, createMockRouterHoc } from "mocks/next/router";
import type { NextRouter } from "next/router";

export const defaultMockRouter: AppRouterInstance = {
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
  push: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
};

export const withMockRouter = createMockRouterHoc({
  initialMockRouter: defaultMockRouter,
});

export { AppRouterContext };
export type { AppRouterInstance, HooksClientContext };

export const defaultMockLegacyRouter: NextRouter = {
  asPath: "/",
  back: jest.fn(),
  basePath: "/",
  beforePopState: jest.fn(),
  events: {
    emit: jest.fn(),
    off: jest.fn(),
    on: jest.fn(),
  },
  forward: jest.fn(),
  isFallback: false,
  isLocaleDomain: true,
  isPreview: false,
  isReady: true,
  pathname: "/",
  prefetch: jest.fn(),
  push: jest.fn(),
  query: {},
  reload: jest.fn(),
  replace: jest.fn(),
  route: "/",
};

const withMockLegacyRouter = (children: React.ReactElement, router?: Partial<NextRouter>) => {
  const mockRouter = {
    ...defaultMockLegacyRouter,
    ...router,
  };
  return BaseWithMockLegacyRouter(children, mockRouter);
};

export type { NextRouter };
export { withMockLegacyRouter };
