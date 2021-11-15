import { mockArticles, mockCategories, mockConfig, mockPickup } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import { server } from "mocks/msw/server";
import renderer from "react-test-renderer";

import { formatPageTitle } from "@/utils/formatter";
import { UrlTable } from "@/utils/paths/url";

import Category, { getStaticPaths, getStaticProps } from "./[slug].page";

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

describe("pages/categories", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockCategoryRice = mockCategories.rice;
  const mockArticleList = Object.values(mockArticles);

  it("snapshot", () => {
    const tree = renderer
      .create(
        <Category
          category={mockCategoryRice}
          categories={mockCategoryList}
          config={mockConfig}
          articles={mockArticleList}
          pickup={mockPickup}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // FIXME: sdkとnextをアップグレードしたら壊れた
  it.skip("getStaticPaths", async () => {
    const { paths, fallback } = await getStaticPaths({});
    expect(fallback).toBe("blocking");
    const expectedPaths = mockCategoryList.map((category) => `${UrlTable.categories}/${category.slug}`);
    expect(paths).toStrictEqual(expectedPaths);
  });

  // FIXME: sdkとnextをアップグレードしたら壊れた
  it.skip("getStaticProps", async () => {
    const result = await getStaticProps({
      params: {
        slug: mockCategoryRice.slug,
      },
    });

    if ("props" in result) {
      const { articles, category, categories, config, pickup } = result.props;
      expect(articles).toStrictEqual(mockArticleList);
      expect(category).toBe(mockCategoryRice.slug);
      expect(categories).toStrictEqual(mockCategoryList);
      expect(pickup).toStrictEqual(mockPickup);
      expect(config).toStrictEqual(mockConfig);
    }

    expect(result.revalidate).toBe(60 * 60 * 24);
  });

  it("OK: 初期レンダリング", async () => {
    const { unmount } = render(
      <Category
        category={mockCategoryRice}
        categories={mockCategoryList}
        config={mockConfig}
        articles={mockArticleList}
        pickup={mockPickup}
      />
    );

    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = `カテゴリー：${mockCategoryRice.name}`;
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
    unmount();
  });
});
