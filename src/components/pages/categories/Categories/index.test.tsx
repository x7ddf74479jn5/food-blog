import { render, screen } from "jest/test-utils";
import { mockConfig } from "mocks/data";

import { formatPageTitle } from "@/utils/formatter";

import { Categories } from ".";

describe("pages/categories", () => {
  it("OK: 初期レンダリング", async () => {
    render(await Categories());
    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = `カテゴリー一覧`;
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });
});
