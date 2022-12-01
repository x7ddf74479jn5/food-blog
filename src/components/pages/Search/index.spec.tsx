import { render, screen, withMockRouter } from "jest/test-utils";
import { mockConfig } from "mocks/data";

import { formatPageTitle } from "@/utils/formatter";

import { Search } from ".";

describe("pages/search", () => {
  const params = new URLSearchParams({ q: "keyword" });

  it("OK: 初期レンダリング", async () => {
    render(withMockRouter(await Search(), { context: { searchParams: params } }));

    const expectedHeading = `検索結果`;
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });
});
