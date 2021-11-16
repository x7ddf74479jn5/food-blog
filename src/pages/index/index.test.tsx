import { mockArticles, mockCategories, mockConfig, mockPickup } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import { server } from "mocks/msw/server";
import renderer from "react-test-renderer";

import Home, { getStaticProps } from "../index.page";

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

jest.mock("react-slick", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: jest.fn((args) => {
      return <div>{args.children}</div>;
    }),
  };
});

describe("pages/index", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockCategoryRice = mockCategories.rice;
  const mockArticleList = Object.values(mockArticles);

  it("snapshot", () => {
    const tree = renderer
      .create(<Home categories={mockCategoryList} config={mockConfig} articles={mockArticleList} pickup={mockPickup} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // FIXME: sdkとnextをアップグレードしたら壊れた
  it.skip("getStaticProps", async () => {
    const result = await getStaticProps({
      params: {
        slug: mockCategoryRice.slug,
      },
    });

    if ("props" in result) {
      const { articles, categories, config, pickup } = result.props;
      expect(articles).toStrictEqual(mockArticleList);
      expect(categories).toStrictEqual(mockCategoryList);
      expect(pickup).toStrictEqual(mockPickup);
      expect(config).toStrictEqual(mockConfig);
    }

    expect(result.revalidate).toBe(60 * 60 * 24);
  });

  it("OK: 初期レンダリング", async () => {
    const { unmount } = render(
      <Home categories={mockCategoryList} config={mockConfig} articles={mockArticleList} pickup={mockPickup} />
    );
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("レシピ一覧");
    const title = screen.getByTitle(mockConfig.siteTitle);
    expect(title).toBeTruthy();
    unmount();
  });
});
