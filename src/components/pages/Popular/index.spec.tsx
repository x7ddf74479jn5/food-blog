import { render, screen } from "jest/test-utils";
import { mockConfig } from "mocks/data";

import { formatPageTitle } from "@/utils/formatter";

import { Popular } from ".";

describe("pages/popular", () => {
  it("OK: 初期レンダリング", async () => {
    render(await Popular());
    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = "人気記事";
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });
});
