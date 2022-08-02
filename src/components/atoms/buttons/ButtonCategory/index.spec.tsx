import { render, screen } from "jest/test-utils";
import { mockCategories } from "mocks/data/categories";

import { urlTable } from "@/utils/paths/url";

import ButtonCategory from ".";

describe("components/atoms/buttons/ButtonCategory", () => {
  const categoryRice = mockCategories.rice;

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<ButtonCategory category={categoryRice} />);
    expect(container).toHaveTextContent(categoryRice.name);
  });

  it("OK: aタグのhrefが正しい", () => {
    render(<ButtonCategory category={categoryRice} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", `${urlTable.categories}/${categoryRice.slug}`);
  });
});
