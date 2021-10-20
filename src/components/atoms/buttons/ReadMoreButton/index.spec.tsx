import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import { ReadMoreButton } from ".";

describe("components/atoms/buttons/ReadMoreButton", () => {
  const mockHandleClick = jest.fn();
  it("snapshot", () => {
    const tree = renderer.create(<ReadMoreButton handleOnClick={mockHandleClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<ReadMoreButton handleOnClick={mockHandleClick} />);
    expect(container).toHaveTextContent("もっと読み込む");
  });

  it("OK: クリックイベントが発火する", () => {
    render(<ReadMoreButton handleOnClick={mockHandleClick} />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(mockHandleClick).toBeCalled();
  });
});
