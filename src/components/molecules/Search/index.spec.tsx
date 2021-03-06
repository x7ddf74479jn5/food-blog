import userEvent from "@testing-library/user-event";
import type { UserEvent } from "@testing-library/user-event/dist/types/setup";
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

  describe("interaction", () => {
    let user: UserEvent;

    beforeEach(() => {
      user = userEvent.setup();
    });

    it("OK: 入力イベント", async () => {
      render(<Search />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveValue("");

      const testText = "test";
      await user.type(input, testText);
      expect(input).toHaveValue(testText);
    });

    it("OK: 検索イベント", async () => {
      render(<Search />);
      const input = screen.getByRole("searchbox");
      expect(input).toHaveValue("");

      const testText = "test";
      await user.type(input, testText);
      expect(input).toHaveValue(testText);

      await user.type(input, "{enter}");
      expect(push).toBeCalledWith({ pathname: "/search", query: { q: testText } }, undefined, { shallow: true });
    });

    it("OK: フォーカスイベント", async () => {
      const { container } = render(<Search />);
      const input = screen.getByRole("searchbox");

      expect(input).not.toHaveFocus();
      await user.click(input);
      expect(input).toHaveFocus();

      await user.click(container);
      expect(input).not.toHaveFocus();
    });
  });
});
