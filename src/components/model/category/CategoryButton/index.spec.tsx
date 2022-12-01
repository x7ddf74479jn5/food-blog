import { render, screen } from "jest/test-utils";
import { mockCategories } from "mocks/data/categories";

import { urlTable } from "@/utils/paths/url";

import { CategoryButton } from ".";

describe("components/model/category/CategoryButton", () => {
  const categoryRice = mockCategories.rice;

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<CategoryButton category={categoryRice} />);
    expect(container).toHaveTextContent(categoryRice.name);
  });

  it("OK: aタグのhrefが正しい", () => {
    render(<CategoryButton category={categoryRice} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", `${urlTable.categories}/${categoryRice.slug}`);
  });
});
