import { mockArticles, mockCategories, mockConfig, mockPickup, mockPopularArticles } from "mocks/data";
import renderer from "react-test-renderer";

import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

import ArticleLayout from ".";

describe("components/layouts/ArticleLayout", () => {
  const articleStock = mockArticles.stock;
  const { title, id } = articleStock;
  const { siteTitle, host } = mockConfig;
  const pageTitle = formatPageTitle(title, siteTitle);
  const url = formatPageUrl(`${urlTable.articles}/${id}`, host);
  const categories = Object.values(mockCategories);
  const relatedArticles = Object.values(mockArticles);
  it("snapshot", () => {
    const tree = renderer
      .create(
        <ArticleLayout
          url={url}
          pageTitle={pageTitle}
          config={mockConfig}
          backLinks={[{ href: urlTable.home, label: "Home" }]}
          relatedArticles={relatedArticles}
          categories={categories}
          pickup={mockPickup}
          popularArticles={mockPopularArticles}
        >
          children
        </ArticleLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
