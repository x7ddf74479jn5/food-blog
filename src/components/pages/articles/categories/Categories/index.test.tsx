import { mockCategories, mockConfig, mockPickup, mockPopularArticles, mockTags } from "@mocks/data";
import { render, screen } from "jest/test-utils";

import { formatPageTitle } from "@/utils/formatter";

import { Categories } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("pages/articles/categories", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockTagList = Object.values(mockTags);

  it("OK: 初期レンダリング", async () => {
    render(
      <Categories
        categories={mockCategoryList}
        tags={mockTagList}
        config={mockConfig}
        pickup={mockPickup}
        popularArticles={mockPopularArticles}
      />
    );
    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = `カテゴリー一覧`;
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });
});
