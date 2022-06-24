import { mockArticles, mockCategories, mockConfig, mockPickup, mockPopularArticles } from "mocks/data";
import renderer from "react-test-renderer";

import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

import HomeLayout from ".";

describe("components/layouts/HomeLayout", () => {
  const articleStock = mockArticles.stock;
  const { title, id } = articleStock;
  const { siteTitle, host } = mockConfig;
  const pageTitle = formatPageTitle(title, siteTitle);
  const url = formatPageUrl(`${urlTable.articles}/${id}`, host);
  const categories = Object.values(mockCategories);
  it("snapshot", () => {
    const tree = renderer
      .create(
        <HomeLayout
          url={url}
          pageTitle={pageTitle}
          config={mockConfig}
          categories={categories}
          pickup={mockPickup}
          popularArticles={mockPopularArticles}
        >
          children
        </HomeLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
