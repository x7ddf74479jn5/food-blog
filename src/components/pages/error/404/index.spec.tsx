import { mockCategories, mockConfig } from "@mocks/data";
import { render, screen } from "jest/test-utils";

import { Error404 } from ".";

describe("pages/404", () => {
  const mockCategoryList = Object.values(mockCategories);

  it("OK: 初期レンダリング", async () => {
    render(<Error404 config={mockConfig} categories={mockCategoryList} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("404 - Not Found");
    expect(screen.getByText("ページが見つかりませんでした")).toBeInTheDocument();
  });
});
