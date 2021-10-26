import { renderHook } from "@testing-library/react-hooks";
import { withMockedRouter } from "jest/mocks/router";
import { server } from "mocks/msw/server";
import type { NextRouter } from "next/router";
import { SWRConfig } from "swr";

import useGetArticleListQuery from ".";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("hooks/useGetArticleListQuery", () => {
  it("should ", () => {
    const router: Partial<NextRouter> = {
      query: { q: "" },
    };

    const Wrapper: React.ComponentType<{ children: React.ReactNode; router: Partial<NextRouter> }> = ({ children }) => {
      return withMockedRouter(
        router,
        <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>{children}</SWRConfig>
      );
    };

    // const make = (router: Partial<NextRouter>) => wrapper({ router });

    const result = renderHook(() => useGetArticleListQuery({}), { wrapper: Wrapper }).result;
    expect(result);
  });
});
