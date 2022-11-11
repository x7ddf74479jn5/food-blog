import { render, screen } from "jest/test-utils";
import {
  dateCommon,
  mockArticles,
  mockCategories,
  mockConfig,
  mockPickup,
  mockPopularArticles,
  mockTags,
} from "mocks/data";

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
  const mockTagList = Object.values(mockTags);
  const mockData = {
    contents: mockArticleList,
    dateCommon,
    limit: 10,
    offset: 0,
    totalCount: mockArticleList.length,
  };

  it("OK: 初期レンダリング", async () => {
    render(
      <Category
        category={mockCategoryRice}
        categories={mockCategoryList}
        config={mockConfig}
        tags={mockTagList}
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
