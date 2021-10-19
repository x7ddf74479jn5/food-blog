import { mockCategories } from "mocks/data/categories";
import renderer from "react-test-renderer";

import ButtonCategory from ".";

describe("components/atoms/buttons/ButtonCategory", () => {
  it("snapshot", () => {
    const tree = renderer.create(<ButtonCategory category={mockCategories.rice} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
