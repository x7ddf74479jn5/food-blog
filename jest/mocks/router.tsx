import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context";
import {
  LayoutSegmentsContext,
  ParamsContext,
  PathnameContext,
  SearchParamsContext,
} from "next/dist/shared/lib/hooks-client-context";

type HooksClientOption = {
  params: any;
  searchParams: URLSearchParams | null;
  pathname: string | null;
  layoutSegments: any;
};

export const defaultMockRouter: AppRouterInstance = {
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
  push: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
};

const defaultMockHooksClient: HooksClientOption = {
  layoutSegments: {},
  params: {},
  pathname: null,
  searchParams: null,
};

export const withMockRouter = (
  {
    options,
    router,
  }: {
    options?: Partial<HooksClientOption>;
    router?: Partial<AppRouterInstance>;
  },
  children: React.ReactElement
): React.ReactElement => {
  const mockRouter: AppRouterInstance = {
    ...defaultMockRouter,
    ...router,
  };
  const mockHooksClient = {
    ...defaultMockHooksClient,
    ...options,
  };

  return (
    <AppRouterContext.Provider value={mockRouter}>
      <PathnameContext.Provider value={mockHooksClient.pathname}>
        <ParamsContext.Provider value={mockHooksClient.params}>
          <SearchParamsContext.Provider value={mockHooksClient.searchParams}>
            <LayoutSegmentsContext.Provider value={mockHooksClient.layoutSegments}>
              {children}
            </LayoutSegmentsContext.Provider>
          </SearchParamsContext.Provider>
        </ParamsContext.Provider>
      </PathnameContext.Provider>
    </AppRouterContext.Provider>
  );
};

export { AppRouterContext };
export type { AppRouterInstance, HooksClientOption };
