import { mockArticles, mockCategories, mockConfig, mockPickup, mockPopularArticles } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import { server } from "mocks/msw/server";

import { formatPageTitle } from "@/utils/formatter";

import PickupPage, { getStaticProps } from "./index.page";

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

describe("pages/articles/", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockArticleList = Object.values(mockArticles);

  // FIXME: microcms-sdkをアップグレードしたら壊れた
  it.skip("getStaticProps", async () => {
    const result = await getStaticProps({});

    if ("props" in result) {
      const { categories, config, pickup, popularArticles } = result.props;
      expect(pickup.articles).toStrictEqual(mockArticleList);
      expect(categories).toStrictEqual(mockCategoryList);
      expect(pickup).toStrictEqual(mockPickup);
      expect(config).toStrictEqual(mockConfig);
      expect(popularArticles).toStrictEqual(mockPopularArticles);
    }
  });

  it("OK: 初期レンダリング", async () => {
    const { unmount } = render(
      <PickupPage
        config={mockConfig}
        pickup={mockPickup}
        categories={mockCategoryList}
        popularArticles={mockPopularArticles}
      />
    );
    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = "おすすめ記事";
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
    unmount();
  });
});
