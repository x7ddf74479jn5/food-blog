import { withMockedRouter } from "jest/test-utils";
import { mockArticles, mockCategories, mockConfig, mockPickup, mockPopularArticles } from "mocks/data";
import renderer from "react-test-renderer";

import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

import DefaultLayout from ".";

describe("components/layouts/DefaultLayout", () => {
  const articleStock = mockArticles.stock;
  const { title, id } = articleStock;
  const { siteTitle, host } = mockConfig;
  const pageTitle = formatPageTitle(title, siteTitle);
  const url = formatPageUrl(`${urlTable.articles}/${id}`, host);

  const categories = Object.values(mockCategories);
  it("snapshot", () => {
    const tree = renderer
      .create(
        withMockedRouter(
          { asPath: "/" },
          <DefaultLayout
            url={url}
            pageTitle={pageTitle}
            config={mockConfig}
            backLinks={[{ href: urlTable.home, label: "Home" }]}
            categories={categories}
            pickup={mockPickup}
            popularArticles={mockPopularArticles}
          >
            children
          </DefaultLayout>
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
