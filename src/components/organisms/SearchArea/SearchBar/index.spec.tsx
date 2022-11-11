import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";

import SearchBar from ".";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

const push = jest.fn();
useRouter.mockImplementation(() => {
  return { push };
});

describe("components/organisms/SearchArea/SearchBar", () => {
  it("OK: 初期レンダリング", () => {
    render(<SearchBar />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("");
    const placeholder = screen.getByPlaceholderText("Search...");
    expect(placeholder).toBeTruthy();
    expect(input).toHaveAttribute("type", "search");
  });

  describe("interaction", () => {
    let user: ReturnType<typeof userEvent["setup"]>;

    beforeEach(() => {
      user = userEvent.setup();
    });

    it("OK: 入力イベント", async () => {
      render(<SearchBar />);
      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("");

      const testText = "test";
      await user.type(input, testText);
      expect(input).toHaveValue(testText);
    });

    it("OK: 検索イベント", async () => {
      render(<SearchBar />);
      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("");

      const testText = "test";
      await user.type(input, testText);
      expect(input).toHaveValue(testText);

      await user.type(input, "{enter}");
      expect(push).toBeCalledWith({ pathname: "/search", query: { q: testText } }, undefined, { shallow: true });
    });

    it("OK: フォーカスイベント", async () => {
      const { container } = render(<SearchBar />);
      const input = screen.getByRole("combobox");

      expect(input).not.toHaveFocus();
      await user.click(input);
      expect(input).toHaveFocus();

      await user.click(container);
      expect(input).not.toHaveFocus();
    });

    it("OK: 検索履歴から補完できる", async () => {
      render(<SearchBar />);
      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("");

      const testText = "test";
      await user.type(input, testText);
      expect(input).toHaveValue(testText);

      await user.type(input, "{enter}");
      const option = screen.getByRole("option");
      expect(option).toHaveTextContent("test");

      await user.clear(input);
      expect(input).toHaveValue("");

      await user.click(option);
      expect(option).not.toBeInTheDocument();
    });
  });
});
