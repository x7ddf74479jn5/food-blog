import { mockCategories, mockConfig, mockPickup, mockPopularArticles, mockTags } from "@mocks/data";
import { render, screen } from "jest/test-utils";

import { formatPageTitle } from "@/utils/formatter";

import { Popular } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("pages/articles/popular", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockTagList = Object.values(mockTags);

  it("OK: 初期レンダリング", async () => {
    render(
      <Popular
        config={mockConfig}
        pickup={mockPickup}
        categories={mockCategoryList}
        tags={mockTagList}
        popularArticles={mockPopularArticles}
      />
    );
    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = "人気記事";
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });
});
