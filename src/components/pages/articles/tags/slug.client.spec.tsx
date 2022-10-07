import {
  dateCommon,
  mockArticles,
  mockCategories,
  mockConfig,
  mockPickup,
  mockPopularArticles,
  mockTags,
} from "@mocks/data";
import { render, screen } from "jest/test-utils";

import { formatPageTitle } from "@/utils/formatter";

import { Tags } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("pages/articles/tags/[slug]/client", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockTagRice = mockTags.rice;
  const mockArticleList = Object.values(mockArticles);
  const mockTagList = Object.values(mockTags);

  const mockData = {
    contents: mockArticleList,
    totalCount: mockArticleList.length,
    dateCommon,
    limit: 10,
    offset: 0,
  };

  it("OK: 初期レンダリング", async () => {
    render(
      <Tags
        tag={mockTagRice}
        categories={mockCategoryList}
        tags={mockTagList}
        config={mockConfig}
        data={mockData}
        pickup={mockPickup}
        popularArticles={mockPopularArticles}
      />
    );
    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = `タグ：${mockTagRice.name}`;
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });
});
