import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";
import React from "react";
import renderer from "react-test-renderer";

import Pagination from ".";

describe("components/molecules/Pagination", () => {
  const mockHandleClick = jest.fn();
  it("snapshot", () => {
    const nothing = renderer
      .create(<Pagination hasNextPage={false} isValidating={false} onClick={mockHandleClick} />)
      .toJSON();
    expect(nothing).toMatchSnapshot();

    const showButton = renderer
      .create(<Pagination hasNextPage={true} isValidating={false} onClick={mockHandleClick} />)
      .toJSON();
    expect(showButton).toMatchSnapshot();

    const showSpinner = renderer
      .create(<Pagination hasNextPage={true} isValidating={true} onClick={mockHandleClick} />)
      .toJSON();
    expect(showSpinner).toMatchSnapshot();
  });

  it("OK: 初期レンダリングが正しい", () => {
    render(<Pagination hasNextPage={true} isValidating={false} onClick={mockHandleClick} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("もっと読み込む");
    expect(button).toBeEnabled();
  });

  it("OK: click eventが発火する", () => {
    render(<Pagination hasNextPage={true} isValidating={false} onClick={mockHandleClick} />);
    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
    userEvent.click(button);
    expect(mockHandleClick).toBeCalled();
  });
});
