import { mockCategories, mockConfig, mockPickup, mockPopularArticles } from "@mocks/data";
import type { NextRouter } from "jest/test-utils";
import { render, screen, withMockedRouter } from "jest/test-utils";
import { server } from "mocks/msw/server";

import { formatPageTitle } from "@/utils/formatter";

import Search from "./index.page";

beforeAll(() => server.listen());
afterAll(() => server.close());

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("pages/search", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockRouter: Partial<NextRouter> = {
    query: {
      q: "keyword",
    },
  };

  it("OK: 初期レンダリング", () => {
    const result = render(
      withMockedRouter(
        mockRouter,
        <Search
          categories={mockCategoryList}
          config={mockConfig}
          pickup={mockPickup}
          popularArticles={mockPopularArticles}
        />
      )
    );

    const expectedHeading = `検索結果：keyword`;
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
    result.unmount();
  });
});
