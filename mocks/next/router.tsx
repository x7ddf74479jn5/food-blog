/* eslint-disable @typescript-eslint/no-empty-function */
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context";
import { PathnameContext, SearchParamsContext } from "next/dist/shared/lib/hooks-client-context";

type HooksClientContext = {
  params: any;
  searchParams: URLSearchParams | null;
  pathname: string | null;
  layoutSegments: any;
};

const defaultMockHooksClientContext: HooksClientContext = {
  layoutSegments: {},
  params: {},
  pathname: "/",
  searchParams: null,
};

export const defaultMockRouter: AppRouterInstance = {
  back: () => {},
  forward: () => {},
  prefetch: () => {},
  push: () => {},
  refresh: () => {},
  replace: () => {},
};

export type CreateMockRouterHocParams = {
  initialMockRouter?: AppRouterInstance;
  initialMockHooksClientContext?: HooksClientContext;
};

const defaultInitialParams = {
  initialMockHooksClientContext: defaultMockHooksClientContext,
  initialMockRouter: defaultMockRouter,
};

export type MockRouterHocOptions = {
  context?: Partial<HooksClientContext>;
  router?: Partial<AppRouterInstance>;
};

type MockRouterHoc = (
  children: React.ReactElement | React.ReactNode,
  options?: MockRouterHocOptions,
) => React.ReactElement;

type CreateMockRouterHoc = (init?: CreateMockRouterHocParams) => MockRouterHoc;

export const createMockRouterHoc: CreateMockRouterHoc =
  (init) =>
  // eslint-disable-next-line react/display-name
  (children, options) => {
    const mockRouter: AppRouterInstance = {
      ...(init?.initialMockRouter ?? defaultInitialParams.initialMockRouter),
      ...options?.router,
    };
    const mockHooksClientContext: HooksClientContext = {
      ...(init?.initialMockHooksClientContext ?? defaultInitialParams.initialMockHooksClientContext),
      ...options?.context,
    };

    return (
      <AppRouterContext.Provider value={mockRouter}>
        <PathnameContext.Provider value={mockHooksClientContext.pathname}>
          <SearchParamsContext.Provider value={mockHooksClientContext.searchParams}>
            {children}
          </SearchParamsContext.Provider>
        </PathnameContext.Provider>
      </AppRouterContext.Provider>
    );
  };

export { AppRouterContext };
export type { AppRouterInstance, HooksClientContext };
