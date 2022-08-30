import { fireEvent, render, screen } from "jest/test-utils";

import { LoadMoreButton } from ".";

describe("components/molecules/Pagination/LoadMoreButton", () => {
  const mockHandleClick = jest.fn();

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<LoadMoreButton onClick={mockHandleClick} />);
    expect(container).toHaveTextContent("もっと読み込む");
  });

  it("OK: クリックイベントが発火する", () => {
    render(<LoadMoreButton onClick={mockHandleClick} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockHandleClick).toBeCalled();
  });
});
