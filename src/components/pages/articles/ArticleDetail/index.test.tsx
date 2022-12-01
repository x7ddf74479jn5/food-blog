import { render, screen } from "jest/test-utils";
import { mockArticles, mockCategories, mockConfig, mockPickup, mockPopularArticles, mockTags } from "mocks/data";

import { formatPageTitle } from "@/utils/formatter";

import { ArticleDetail } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

jest.mock("next-mdx-remote", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MDXRemote:
      // eslint-disable-next-line react/display-name
      ({ body }: { body: string }) => <div>{body}</div>,
  };
});

describe("pages/articles", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockArticleList = Object.values(mockArticles);
  const mockArticleStock = mockArticles.stock;
  const mockTagList = Object.values(mockTags);

  it("OK: 初期レンダリング", () => {
    const mdxSource = { compiledSource: "source" };

    const { unmount } = render(
      <ArticleDetail
        categories={mockCategoryList}
        config={mockConfig}
        pickup={mockPickup}
        article={mockArticleStock}
        tags={mockTagList}
        mdxSource={mdxSource}
        relatedArticles={mockArticleList}
        popularArticles={mockPopularArticles}
      />
    );

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(mockArticleStock.title);
    const expectedTitle = formatPageTitle(mockArticleStock.title, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
    unmount();
  });
});
