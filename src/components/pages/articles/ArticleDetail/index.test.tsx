import { render, screen } from "jest/test-utils";
import { mockArticles, mockConfig } from "mocks/data";

import { formatPageTitle } from "@/utils/formatter";

import { ArticleDetail } from ".";

jest.mock("next-mdx-remote", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MDXRemote:
      // eslint-disable-next-line react/display-name
      ({ body }: { body: string }) => <div>{body}</div>,
  };
});

describe("pages/articles", () => {
  const mockArticleStock = mockArticles.stock;

  it("OK: 初期レンダリング", async () => {
    const { unmount } = render(await ArticleDetail({ articleId: mockArticleStock.id }));

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(mockArticleStock.title);
    const expectedTitle = formatPageTitle(mockArticleStock.title, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
    unmount();
  });
});
