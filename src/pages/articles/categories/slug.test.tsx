import { dateCommon, mockArticles, mockCategories, mockConfig, mockPickup } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import { server } from "mocks/msw/server";
import renderer from "react-test-renderer";

import { formatPageTitle } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

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

describe("pages/articles/categories/[slug]", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockCategoryRice = mockCategories.rice;
  const mockArticleList = Object.values(mockArticles);
  const mockData = {
    contents: mockArticleList,
    totalCount: mockArticleList.length,
    dateCommon,
    limit: 10,
    offset: 0,
  };

  it("snapshot", () => {
    const tree = renderer
      .create(
        <Category
          category={mockCategoryRice}
          categories={mockCategoryList}
          config={mockConfig}
          data={mockData}
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
    const expectedPaths = mockCategoryList.map((category) => `${urlTable.categories}/${category.slug}`);
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
      const { data, category, categories, config, pickup } = result.props;
      expect(data.contents).toStrictEqual(mockArticleList);
      expect(category).toBe(mockCategoryRice.slug);
      expect(categories).toStrictEqual(mockCategoryList);
      expect(pickup).toStrictEqual(mockPickup);
      expect(config).toStrictEqual(mockConfig);
    }
  });

  it("OK: 初期レンダリング", async () => {
    const { unmount } = render(
      <Category
        category={mockCategoryRice}
        categories={mockCategoryList}
        config={mockConfig}
        data={mockData}
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
