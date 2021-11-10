import { mockArticles, mockConfig, mockPickup } from "mocks/data";
import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import { TwoColumnLayout } from ".";

describe("components/layouts/TwoColumnLayout", () => {
  const articleStock = mockArticles.stock;
  const { title, id } = articleStock;
  const host = mockConfig.host;
  const url = new URL(`${UrlTable.articles}/${id}`, host).toString();
  it("snapshot", () => {
    const tree = renderer
      .create(
        <TwoColumnLayout
          url={url}
          config={mockConfig}
          backLinks={[{ href: UrlTable.home, label: "Home" }]}
          pickup={mockPickup}
          host={host}
          title={title}
        >
          children
        </TwoColumnLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
