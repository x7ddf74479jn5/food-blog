import { mockArticles, mockCategories, mockConfig, mockPickup } from "mocks/data";
import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import ArticleLayout from ".";

describe("components/layouts/ArticleLayout", () => {
  const articleStock = mockArticles.stock;
  const { title, id } = articleStock;
  const url = new URL(`${UrlTable.articles}/${id}`, mockConfig.host).toString();
  const categories = Object.values(mockCategories);
  const relatedArticles = Object.values(mockArticles);
  it("snapshot", () => {
    const tree = renderer
      .create(
        <ArticleLayout
          url={url}
          pageTitle={title}
          config={mockConfig}
          backLinks={[{ href: UrlTable.home, label: "Home" }]}
          relatedArticles={relatedArticles}
          categories={categories}
          pickup={mockPickup}
        >
          children
        </ArticleLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
