import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";
import React from "react";
import renderer from "react-test-renderer";

import Search from ".";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

const push = jest.fn();
useRouter.mockImplementation(() => {
  return { push };
});

describe("components/molecules/Search", () => {
  it("snapshot", () => {
    const tree = renderer.create(<Search />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 初期レンダリング", () => {
    render(<Search />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("");
    const placeholder = screen.getByPlaceholderText("Search...");
    expect(placeholder).toBeTruthy();
    expect(input).toHaveAttribute("type", "search");
  });

  it("OK: 入力イベント", () => {
    render(<Search />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("");

    const testText = "test";
    userEvent.type(input, testText);
    expect(input).toHaveValue(testText);
  });

  it("OK: 検索イベント", () => {
    render(<Search />);
    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("");

    const testText = "test";
    userEvent.type(input, testText);
    expect(input).toHaveValue(testText);

    userEvent.type(input, "{enter}");
    expect(push).toBeCalledWith({ pathname: "/search", query: { q: testText } });
  });

  it("OK: フォーカスイベント", () => {
    const { container } = render(<Search />);
    const input = screen.getByRole("searchbox");

    expect(input).not.toHaveFocus();
    userEvent.click(input);
    expect(input).toHaveFocus();

    userEvent.click(container);
    expect(input).not.toHaveFocus();
  });
});
