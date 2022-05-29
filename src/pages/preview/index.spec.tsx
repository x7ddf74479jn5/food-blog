import { mockArticles, mockCategories, mockConfig, mockPickup } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import { server } from "mocks/msw/server";
import renderer from "react-test-renderer";

import { mdx2html } from "@/utils/mdx/mdx2html";

import ArticlePreview from "./[id].page";

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

jest.mock("@/utils/mdx/mdx2html", () => {
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
  const mockArticleStock = mockArticles.stock;
  console.warn = jest.fn();

  it("snapshot", async () => {
    const mdxSource = await mdx2html(mockArticleStock.body);

    const tree = renderer
      .create(
        <ArticlePreview
          categories={mockCategoryList}
          config={mockConfig}
          pickup={mockPickup}
          article={mockArticleStock}
          mdxSource={mdxSource}
          relatedArticles={mockArticleList}
          isPreview
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 初期レンダリング", async () => {
    const mdxSource = await mdx2html(mockArticleStock.body);
    const { unmount } = render(
      <ArticlePreview
        categories={mockCategoryList}
        config={mockConfig}
        pickup={mockPickup}
        article={mockArticleStock}
        mdxSource={mdxSource}
        relatedArticles={mockArticleList}
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
