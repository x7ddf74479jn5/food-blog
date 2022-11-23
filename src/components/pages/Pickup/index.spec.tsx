import { render, screen } from "jest/test-utils";
import { mockConfig } from "mocks/data";

import { formatPageTitle } from "@/utils/formatter";

import { Pickup } from ".";

describe("pages/pickup", () => {
  it("OK: 初期レンダリング", async () => {
    render(await Pickup());
    const h1 = screen.getByRole("heading", { level: 1 });
    const expectedHeading = "おすすめ記事";
    expect(h1).toHaveTextContent(expectedHeading);
    const expectedTitle = formatPageTitle(expectedHeading, mockConfig.siteTitle);
    expect(document.title).toBe(expectedTitle);
  });
});
