import { mockArticles, mockCategories, mockConfig, mockPickup } from "mocks/data";
import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import ArticleLayout from ".";

// for error avoiding
// matchMedia not present, legacy browsers require a polyfill
jest.mock("@/components/organisms/SlickArticles", () => {
  const SlickArticles = () => {
    return <div>SlickArticles</div>;
  };
  // eslint-disable-next-line @typescript-eslint/naming-convention
  return { SlickArticles };
});

describe("components/layouts/ArticleLayout", () => {
  const articleStock = mockArticles.stock;
  const { title, id } = articleStock;
  const url = new URL(`${UrlTable.articles}/${id}`, mockConfig.host).toString();
  const categories = Object.values(mockCategories);
  it("snapshot", () => {
    const tree = renderer
      .create(
        <ArticleLayout url={url} pageTitle={title} config={mockConfig} categories={categories} pickup={mockPickup}>
          children
        </ArticleLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
