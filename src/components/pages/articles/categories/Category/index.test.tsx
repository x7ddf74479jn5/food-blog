import { dateCommon, mockArticles, mockCategories, mockConfig, mockPickup, mockPopularArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";

import { formatPageTitle } from "@/utils/formatter";

import { Category } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("pages/articles/categories/[slug]/client", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockCategoryRice = mockCategories.rice;
  const mockArticleList = Object.values(mockArticles);
  const mockData = {
    contents: mockArticleList,
    totalCount: mockArticleList.length,
    dateCommon,
    limit: 10,
    offset: 0,
  };

  it("OK: 初期レンダリング", async () => {
    render(
      <Category
        category={mockCategoryRice}
        categories={mockCategoryList}
        config={mockConfig}
        data={mockData}
        pickup={mockPickup}
        popularArticles={mockPopularArticles}
      />
    );

    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = `カテゴリー：${mockCategoryRice.name}`;
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });
});
