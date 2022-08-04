import { mockArticles, mockConfig } from "@mocks/data";
import renderer from "react-test-renderer";

import { urlTable } from "@/utils/paths/url";

import { HtmlHeadJsonLd } from ".";

jest.mock("next/head", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("components/atoms/meta/HtmlHeadJsonLd", () => {
  const { title, description, image, id, publishedAt, updatedAt, writer } = mockArticles.stock;
  const imageUrl = image.url;
  const indexUrl = mockConfig.host;
  const url = new URL(`${urlTable.articles}/${id}`, indexUrl).toString();

  it("snapshot", () => {
    const tree = renderer
      .create(
        <HtmlHeadJsonLd
          title={title}
          url={url}
          description={description}
          image={imageUrl}
          datePublished={publishedAt}
          dateModified={updatedAt}
          authorName={writer.name}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
