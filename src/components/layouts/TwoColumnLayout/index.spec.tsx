import { mockArticles, mockConfig, mockPickup } from "mocks/data";
import renderer from "react-test-renderer";

import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

import { TwoColumnLayout } from ".";

describe("components/layouts/TwoColumnLayout", () => {
  const articleStock = mockArticles.stock;
  const { title, id } = articleStock;
  const { siteTitle, host } = mockConfig;
  const pageTitle = formatPageTitle(title, siteTitle);
  const url = formatPageUrl(`${urlTable.articles}/${id}`, host);
  it("snapshot", () => {
    const tree = renderer
      .create(
        <TwoColumnLayout
          url={url}
          config={mockConfig}
          backLinks={[{ href: urlTable.home, label: "Home" }]}
          pickup={mockPickup}
          host={host}
          title={pageTitle}
          heading="title"
        >
          children
        </TwoColumnLayout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
