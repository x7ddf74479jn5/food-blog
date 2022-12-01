import { render, screen } from "jest/test-utils";

import { Home } from ".";

describe("pages/index", () => {
  it("OK: 初期レンダリング", async () => {
    render(await Home());
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("レシピ一覧");
  });
});
