import { mockArticles, mockCategories, mockConfig, mockPickup } from "mocks/data";
import renderer from "react-test-renderer";

import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { UrlTable } from "@/utils/paths/url";

import HomeLayout from ".";

// for preventing errors
// matchMedia not present, legacy browsers require a polyfill
jest.mock("@/components/organisms/SlickArticles", () => {
  const SlickArticles = () => {
    return <div>SlickArticles</div>;
  };
  // eslint-disable-next-line @typescript-eslint/naming-convention
  return { SlickArticles };
});

describe("components/layouts/HomeLayout", () => {
  const articleStock = mockArticles.stock;
  const { title, id } = articleStock;
  const { siteTitle, host } = mockConfig;
  const pageTitle = formatPageTitle(title, siteTitle);
  const url = formatPageUrl(`${UrlTable.articles}/${id}`, host);
  const categories = Object.values(mockCategories);
  it("snapshot", () => {
    const tree = renderer
      .create(
        <HomeLayout url={url} pageTitle={pageTitle} config={mockConfig} categories={categories} pickup={mockPickup}>
          children
        </HomeLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
