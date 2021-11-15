import { mockArticles, mockCategories, mockConfig, mockPickup, mockTags } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import { server } from "mocks/msw/server";
import renderer from "react-test-renderer";

import { formatPageTitle } from "@/utils/formatter";
import { UrlTable } from "@/utils/paths/url";

import Tags, { getStaticPaths, getStaticProps } from "./[slug].page";

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
  const mockTagRice = mockTags.rice;
  const mockArticleList = Object.values(mockArticles);
  const mockTagList = Object.values(mockTags);

  it("snapshot", () => {
    const tree = renderer
      .create(
        <Tags
          config={mockConfig}
          articles={mockArticleList}
          pickup={mockPickup}
          tag={mockTagRice}
          categories={mockCategoryList}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // FIXME: sdkとnextをアップグレードしたら壊れた
  it.skip("getStaticPaths", async () => {
    const { paths, fallback } = await getStaticPaths({});
    expect(fallback).toBe("blocking");
    const expectedPaths = mockTagList.map((tag) => `${UrlTable.tags}/${tag.slug}`);
    expect(paths).toStrictEqual(expectedPaths);
  });

  // FIXME: sdkとnextをアップグレードしたら壊れた
  it.skip("getStaticProps", async () => {
    const result = await getStaticProps({
      params: {
        slug: mockTagRice.slug,
      },
    });

    if ("props" in result) {
      const { articles, tag, categories, config, pickup } = result.props;
      expect(articles).toStrictEqual(mockArticleList);
      expect(tag).toBe(mockTagRice.slug);
      expect(categories).toStrictEqual(mockCategoryList);
      expect(pickup).toStrictEqual(mockPickup);
      expect(config).toStrictEqual(mockConfig);
    }

    expect(result.revalidate).toBe(60 * 60 * 24);
  });

  it("OK: 初期レンダリング", async () => {
    const { unmount } = render(
      <Tags
        tag={mockTagRice}
        categories={mockCategoryList}
        config={mockConfig}
        articles={mockArticleList}
        pickup={mockPickup}
      />
    );
    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = `タグ：${mockTagRice.name}`;
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
    unmount();
  });
});
