import { fireEvent, render, screen } from "jest/test-utils";

import { PrimaryButton } from ".";

describe("components/atoms/buttons/PrimaryButton", () => {
  const mockHandleClick = jest.fn();

  it("OK: ラベルが表示されている", () => {
    const { container } = render(<PrimaryButton label="label" onClick={mockHandleClick} />);
    expect(container).toHaveTextContent("label");
  });

  it("OK: クリックイベントが発火する", () => {
    render(<PrimaryButton label="label" onClick={mockHandleClick} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockHandleClick).toBeCalled();
  });
});
