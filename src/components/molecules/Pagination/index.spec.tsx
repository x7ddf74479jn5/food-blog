import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";
import React from "react";

import Pagination from ".";

describe("components/molecules/Pagination", () => {
  const mockHandleClick = jest.fn();

  it("OK: 初期レンダリングが正しい", () => {
    render(<Pagination hasNextPage={true} isValidating={false} onClick={mockHandleClick} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("もっと読み込む");
    expect(button).toBeEnabled();
  });

  it("OK: click eventが発火する", async () => {
    const user = userEvent.setup();
    render(<Pagination hasNextPage={true} isValidating={false} onClick={mockHandleClick} />);
    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
    await user.click(button);
    expect(mockHandleClick).toBeCalled();
  });
});
