import { mockArticles, mockConfig } from "@mocks/data";
import { render } from "jest/test-utils";
import renderer from "react-test-renderer";

import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
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
  const { host: indexUrl, siteTitle } = mockConfig;
  const pageTitle = formatPageTitle(title, siteTitle);
  const url = formatPageUrl(`${UrlTable.articles}/${id}`, indexUrl);
  it("snapshot", () => {
    const tree = renderer
      .create(
        <HtmlHeadBase indexUrl={indexUrl} pageTitle={pageTitle} url={url} description={description} image={imageUrl} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 出力結果が正しい", () => {
    const { container } = render(
      <HtmlHeadBase indexUrl={indexUrl} pageTitle={pageTitle} url={url} description={description} image={imageUrl} />
    );
    expect(container.querySelector("title")).toHaveTextContent(pageTitle);
    expect(container.querySelector('meta[name="robots"]')?.attributes.getNamedItem("content")?.value).toBe(
      "index,follow"
    );
    expect(container.querySelector('meta[name="googlebot"]')?.attributes.getNamedItem("content")?.value).toBe(
      "index,follow"
    );
    expect(container.querySelector('meta[name="description"]')?.attributes.getNamedItem("content")?.value).toBe(
      description
    );
    expect(container.querySelector('meta[property="og:url"]')?.attributes.getNamedItem("content")?.value).toBe(url);
    expect(container.querySelector('meta[property="og:title"]')?.attributes.getNamedItem("content")?.value).toBe(
      pageTitle
    );
    expect(container.querySelector('meta[property="og:image"]')?.attributes.getNamedItem("content")?.value).toBe(
      imageUrl
    );
    expect(container.querySelector('meta[property="og:description"]')?.attributes.getNamedItem("content")?.value).toBe(
      description
    );
    expect(container.querySelector('link[rel="canonical"]')?.attributes.getNamedItem("href")?.value).toBe(url);
    expect(container.querySelector('link[rel="alternate"]')?.attributes.getNamedItem("href")?.value).toBe("/feed.xml");
    expect(container.querySelector('link[rel="manifest"]')?.attributes.getNamedItem("href")?.value).toBe(
      "/favicon/site_webmanifest.json"
    );
  });
});
