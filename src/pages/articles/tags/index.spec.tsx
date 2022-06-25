import {
  dateCommon,
  mockArticles,
  mockCategories,
  mockConfig,
  mockPickup,
  mockPopularArticles,
  mockTags,
} from "@mocks/data";
import { render, screen, withMockedRouter } from "jest/test-utils";
import { server } from "mocks/msw/server";
import renderer from "react-test-renderer";

import { formatPageTitle } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

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

describe("pages/articles/tags", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockTagRice = mockTags.rice;
  const mockArticleList = Object.values(mockArticles);
  const mockTagList = Object.values(mockTags);
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
        withMockedRouter(
          { asPath: "/" },
          <Tags
            config={mockConfig}
            data={mockData}
            pickup={mockPickup}
            tag={mockTagRice}
            categories={mockCategoryList}
            popularArticles={mockPopularArticles}
          />
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // FIXME: sdkとnextをアップグレードしたら壊れた
  it.skip("getStaticPaths", async () => {
    const { paths, fallback } = await getStaticPaths({});
    expect(fallback).toBe("blocking");
    const expectedPaths = mockTagList.map((tag) => `${urlTable.tags}/${tag.slug}`);
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
      const { data, tag, categories, config, pickup } = result.props;
      expect(data.contents).toStrictEqual(mockArticleList);
      expect(tag).toBe(mockTagRice.slug);
      expect(categories).toStrictEqual(mockCategoryList);
      expect(pickup).toStrictEqual(mockPickup);
      expect(config).toStrictEqual(mockConfig);
    }
  });

  it("OK: 初期レンダリング", async () => {
    const { unmount } = render(
      <Tags
        tag={mockTagRice}
        categories={mockCategoryList}
        config={mockConfig}
        data={mockData}
        pickup={mockPickup}
        popularArticles={mockPopularArticles}
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
