import { mockArticles, mockCategories, mockConfig, mockPickup } from "mocks/data";
import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import DefaultLayout from ".";

describe("components/layouts/DefaultLayout", () => {
  const articleStock = mockArticles.stock;
  const { title, id } = articleStock;
  const url = new URL(`${UrlTable.articles}/${id}`, mockConfig.host).toString();
  const categories = Object.values(mockCategories);
  it("snapshot", () => {
    const tree = renderer
      .create(
        <DefaultLayout
          url={url}
          pageTitle={title}
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
