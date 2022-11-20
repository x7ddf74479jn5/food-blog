import type { AppRouterInstance, HooksClientContext } from "mocks/next/router";
import { AppRouterContext, createMockRouterHoc } from "mocks/next/router";

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
