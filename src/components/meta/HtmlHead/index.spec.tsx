import { render } from "jest/test-utils";
import { mockArticles, mockConfig } from "mocks/data";

import { formatPageTitle, formatPageUrl } from "@/utils/formatter";
import { urlTable } from "@/utils/paths/url";

import { HtmlHeadBase, HtmlHeadNoIndex, HtmlHeadSeo } from ".";

describe("components/meta", () => {
  const { description, id, image, title } = mockArticles.stock;
  const imageUrl = image.url;
  const { host: indexUrl, siteTitle } = mockConfig;
  const pageTitle = formatPageTitle(title, siteTitle);
  const url = formatPageUrl(`${urlTable.articles}/${id}`, indexUrl);

  it("HtmlHeadBase: 出力結果が正しい", () => {
    const { container } = render(<HtmlHeadBase />);

    expect(container.querySelector('meta[name="robots"]')?.attributes.getNamedItem("content")?.value).toBe(
      "index,follow"
    );
    expect(container.querySelector('link[rel="alternate"]')?.attributes.getNamedItem("href")?.value).toBe("/feed.xml");
    expect(container.querySelector('link[rel="manifest"]')?.attributes.getNamedItem("href")?.value).toBe(
      "/favicon/site.webmanifest"
    );
  });

  it("HtmlHeadSeo: 出力結果が正しい", () => {
    const { container } = render(
      <HtmlHeadSeo title={pageTitle} url={url} description={description} image={imageUrl} />
    );

    expect(container.querySelector("title")).toHaveTextContent(title);
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
  });

  it("HtmlHeadNoIndex: 出力結果が正しい", () => {
    const { container } = render(<HtmlHeadNoIndex />);
    expect(container.querySelector('meta[name="robots"]')?.attributes.getNamedItem("content")?.value).toBe("noindex");
  });
});
