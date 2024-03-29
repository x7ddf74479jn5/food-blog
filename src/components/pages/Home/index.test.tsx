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

import { Home } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("pages/index", () => {
  const mockCategoryList = Object.values(mockCategories);
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
      <Home
        tags={mockTagList}
        categories={mockCategoryList}
        config={mockConfig}
        data={mockData}
        pickup={mockPickup}
        popularArticles={mockPopularArticles}
      />
    );
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("レシピ一覧");
  });
});
