import { render, screen } from "jest/test-utils";
import { mockCategories } from "mocks/data/categories";
import renderer from "react-test-renderer";

import { UrlTable } from "@/utils/paths/url";

import ButtonCategory from ".";

describe("components/atoms/buttons/ButtonCategory", () => {
  const categoryRice = mockCategories.rice;
  it("snapshot", () => {
    const tree = renderer.create(<ButtonCategory category={categoryRice} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<ButtonCategory category={categoryRice} />);
    expect(container).toHaveTextContent(categoryRice.name);
  });

  it("OK: aタグのhrefが正しい", () => {
    render(<ButtonCategory category={categoryRice} />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", `${UrlTable.categories}/${categoryRice.slug}`);
  });
});
