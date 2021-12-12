import { render, screen } from "jest/test-utils";
import { mockCategories } from "mocks/data/categories";
import renderer from "react-test-renderer";

// import { urlTable } from "@/utils/paths/url";
import { CategoryMenuItem } from ".";

describe("components/atoms/CategoryMenuItem", () => {
  const categoryRice = mockCategories.rice;
  it("snapshot", () => {
    const tree = renderer.create(<CategoryMenuItem slug={categoryRice.slug} text={categoryRice.name} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 初期表示が正しい", () => {
    const { container } = render(<CategoryMenuItem slug={categoryRice.slug} text={categoryRice.name} />);
    expect(container).toHaveTextContent(categoryRice.name);
    screen.debug();
  });
});
