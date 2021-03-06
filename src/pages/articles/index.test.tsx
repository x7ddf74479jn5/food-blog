import { mockArticles, mockCategories, mockConfig, mockPickup, mockPopularArticles } from "@mocks/data";
import { render, screen, withMockedRouter } from "jest/test-utils";
import { server } from "mocks/msw/server";
import renderer from "react-test-renderer";

import { formatPageTitle } from "@/utils/formatter";
import { mdx2html } from "@/utils/mdx/mdx2html";
import { urlTable } from "@/utils/paths/url";

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

describe("pages/articles", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockArticleList = Object.values(mockArticles);
  const mockArticleStock = mockArticles.stock;
  console.warn = jest.fn();

  it("snapshot", async () => {
    const mdxSource = await mdx2html(mockArticleStock.body);

    const tree = renderer
      .create(
        withMockedRouter(
          { asPath: "/" },
          <ArticleDetail
            categories={mockCategoryList}
            config={mockConfig}
            pickup={mockPickup}
            article={mockArticleStock}
            mdxSource={mdxSource}
            relatedArticles={mockArticleList}
            popularArticles={mockPopularArticles}
          />
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // FIXME: sdk???next??????????????????????????????????????????
  it.skip("getStaticPaths", async () => {
    const { paths, fallback } = await getStaticPaths({});
    expect(fallback).toBe("blocking");
    const expectedPaths = mockArticleList.map((article) => `${urlTable.articles}/${article.id}`);
    expect(paths).toStrictEqual(expectedPaths);
  });

  // FIXME: sdk???next??????????????????????????????????????????
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
  });

  it("OK: ????????????????????????", async () => {
    const mdxSource = await mdx2html(mockArticleStock.body);
    const { unmount } = render(
      <ArticleDetail
        categories={mockCategoryList}
        config={mockConfig}
        pickup={mockPickup}
        article={mockArticleStock}
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
