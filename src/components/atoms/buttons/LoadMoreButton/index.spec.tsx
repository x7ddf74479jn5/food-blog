import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import { LoadMoreButton } from ".";

describe("components/atoms/buttons/LoadMoreButton", () => {
  const mockHandleClick = jest.fn();
  it("snapshot", () => {
    const tree = renderer.create(<LoadMoreButton handleOnClick={mockHandleClick} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<LoadMoreButton handleOnClick={mockHandleClick} />);
    expect(container).toHaveTextContent("もっと読み込む");
  });

  it("OK: クリックイベントが発火する", () => {
    render(<LoadMoreButton handleOnClick={mockHandleClick} />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(mockHandleClick).toBeCalled();
  });
});
