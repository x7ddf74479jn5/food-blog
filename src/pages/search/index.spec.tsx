import { mockCategories, mockConfig, mockPickup } from "@mocks/data";
import type { NextRouter } from "jest/test-utils";
import { render, screen, withMockedRouter } from "jest/test-utils";
import { server } from "mocks/msw/server";
import renderer from "react-test-renderer";

import { formatPageTitle } from "@/utils/formatter";

import Search, { getStaticProps } from "./index.page";

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

describe("pages/search", () => {
  const mockCategoryList = Object.values(mockCategories);
  const mockCategoryRice = mockCategories.rice;
  const mockRouter: Partial<NextRouter> = {
    query: {
      q: "keyword",
    },
  };
  it("snapshot", () => {
    const tree = renderer
      .create(
        withMockedRouter(mockRouter, <Search categories={mockCategoryList} config={mockConfig} pickup={mockPickup} />)
      )
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
      const { categories, config, pickup } = result.props;
      expect(categories).toStrictEqual(mockCategoryList);
      expect(pickup).toStrictEqual(mockPickup);
      expect(config).toStrictEqual(mockConfig);
    }
  });

  it("OK: 初期レンダリング", async () => {
    const { unmount } = render(
      withMockedRouter(mockRouter, <Search categories={mockCategoryList} config={mockConfig} pickup={mockPickup} />)
    );
    const expectedHeading = `検索結果：keyword`;
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
    unmount();
  });
});
