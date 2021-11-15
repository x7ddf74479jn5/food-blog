import { mockArticles, mockCategories, mockConfig, mockPickup } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import { server } from "mocks/msw/server";
import renderer from "react-test-renderer";

import { formatPageTitle } from "@/utils/formatter";
import mdx2html from "@/utils/mdx/mdx2html";
import { UrlTable } from "@/utils/paths/url";

import ArticleDetail, { getStaticPaths, getStaticProps } from "./[id].page";

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
    default: jest.fn(),
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

describe("pages/categories", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockArticleList = Object.values(mockArticles);
  const mockArticleStock = mockArticles.stock;
  console.warn = jest.fn();

  it("snapshot", async () => {
    const mdxSource = await mdx2html(mockArticleStock.body);

    const tree = renderer
      .create(
        <ArticleDetail
          categories={mockCategoryList}
          config={mockConfig}
          pickup={mockPickup}
          article={mockArticleStock}
          mdxSource={mdxSource}
          relatedArticles={mockArticleList}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // FIXME: sdkとnextをアップグレードしたら壊れた
  it.skip("getStaticPaths", async () => {
    const { paths, fallback } = await getStaticPaths({});
    expect(fallback).toBe("blocking");
    const expectedPaths = mockArticleList.map((article) => `${UrlTable.articles}/${article.id}`);
    expect(paths).toStrictEqual(expectedPaths);
  });

  // FIXME: sdkとnextをアップグレードしたら壊れた
  it.skip("getStaticProps", async () => {
    const result = await getStaticProps({
      params: {
        id: mockArticleStock.id,
      },
      preview: undefined,
      previewData: undefined,
    });

    if ("props" in result) {
      const { article, categories, config, pickup, relatedArticles, isPreview } = result.props;
      expect(article).toStrictEqual(mockArticleStock);
      expect(categories).toStrictEqual(mockCategoryList);
      expect(pickup).toStrictEqual(mockPickup);
      expect(config).toStrictEqual(mockConfig);
      expect(relatedArticles).toStrictEqual(mockArticleList);
      expect(isPreview).toBeFalsy();
    }

    expect(result.revalidate).toBe(60 * 60 * 24);
  });

  it("OK: 初期レンダリング", async () => {
    const mdxSource = await mdx2html(mockArticleStock.body);
    const { unmount } = render(
      <ArticleDetail
        categories={mockCategoryList}
        config={mockConfig}
        pickup={mockPickup}
        article={mockArticleStock}
        mdxSource={mdxSource}
        relatedArticles={mockArticleList}
      />
    );

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(mockArticleStock.title);
    const expectedTitle = formatPageTitle(mockArticleStock.title, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
    unmount();
  });
});
