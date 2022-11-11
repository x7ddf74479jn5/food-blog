import { render, screen } from "jest/test-utils";
import { mockArticles, mockCategories, mockConfig, mockPickup, mockPopularArticles, mockTags } from "mocks/data";
import { server } from "mocks/msw/server";

import { mdx2html } from "@/lib/mdx";

import ArticlePreviewPage from "./page";

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

jest.mock("@/lib/mdx", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    mdx2html: jest.fn(),
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

describe("pages/preview", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockArticleList = Object.values(mockArticles);
  const mockTagList = Object.values(mockTags);
  const mockArticleStock = mockArticles.stock;
  console.warn = jest.fn();

  it("OK: 初期レンダリング", async () => {
    const mdxSource = await mdx2html(mockArticleStock.body);
    const { unmount } = render(
      <ArticlePreviewPage
        categories={mockCategoryList}
        tags={mockTagList}
        config={mockConfig}
        pickup={mockPickup}
        article={mockArticleStock}
        mdxSource={mdxSource}
        relatedArticles={mockArticleList}
        popularArticles={mockPopularArticles}
        isPreview
      />
    );

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(mockArticleStock.title);
    const previewNotification = screen.getByText("Preview mode enabled");
    expect(previewNotification).toBeTruthy();
    unmount();
  });
});
