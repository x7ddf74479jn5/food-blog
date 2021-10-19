import { mockArticles, mockConfig } from "@mocks/data";
import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import { HtmlHeadBase } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("components/atoms/meta/HtmlHeadBase", () => {
  const { title, description, image, id } = mockArticles.stock;
  const imageUrl = image.url;
  const indexUrl = mockConfig.host;
  const url = new URL(`${UrlTable.articles}/${id}`, indexUrl).toString();
  it("snapshot", () => {
    const tree = renderer
      .create(<HtmlHeadBase indexUrl={indexUrl} title={title} url={url} description={description} image={imageUrl} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
