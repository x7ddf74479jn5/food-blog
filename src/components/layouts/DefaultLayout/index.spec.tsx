import { mockArticles, mockCategories, mockConfig, mockPickup } from "mocks/data";
import renderer from "react-test-renderer";

import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { UrlTable } from "@/utils/paths/url";

import DefaultLayout from ".";

describe("components/layouts/DefaultLayout", () => {
  const articleStock = mockArticles.stock;
  const { title, id } = articleStock;
  const { siteTitle, host } = mockConfig;
  const pageTitle = formatPageTitle(title, siteTitle);
  const url = formatPageUrl(`${UrlTable.articles}/${id}`, host);

  const categories = Object.values(mockCategories);
  it("snapshot", () => {
    const tree = renderer
      .create(
        <DefaultLayout
          url={url}
          pageTitle={pageTitle}
          config={mockConfig}
          backLinks={[{ href: UrlTable.home, label: "Home" }]}
          categories={categories}
          pickup={mockPickup}
        >
          children
        </DefaultLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
