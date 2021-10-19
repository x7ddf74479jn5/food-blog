import renderer from "react-test-renderer";

import { ReadMoreButton } from ".";

describe("components/atoms/buttons/ReadMoreButton", () => {
  const mockHandleClick = jest.fn();
  it("snapshot", () => {
    const tree = renderer.create(<ReadMoreButton handleOnClick={mockHandleClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
