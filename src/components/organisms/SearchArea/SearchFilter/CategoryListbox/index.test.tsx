import { mockCategories } from "@mocks/data";
import userEvent from "@testing-library/user-event";
import { render, screen } from "jest/test-utils";
import React from "react";

import { CategoryListbox } from ".";

describe("components/organisms/SearchArea/SearchFilter/CategoryListbox", () => {
  const mockCategoryList = Object.values(mockCategories);
  it("OK: 初期レンダリング", () => {
    const { container } = render(<CategoryListbox categories={mockCategoryList} />);

    const label = screen.getByText("カテゴリー");
    expect(label).toBeInTheDocument();

    const value = container.querySelector(".dropdown-textfield");
    expect(value).toHaveTextContent("すべて");

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  describe("ユーザーイベント", () => {
    let user: ReturnType<typeof userEvent["setup"]>;

    beforeEach(() => {
      user = userEvent.setup();
    });

    it("OK: リストボックス展開後の表示が正しい", async () => {
      render(<CategoryListbox categories={mockCategoryList} />);

      const button = screen.getByRole("button");
      await user.click(button);
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(4);
      const gohanmono = options[1];
      expect(gohanmono).toHaveClass("dropdown-inactive");

      await user.hover(gohanmono);
      expect(gohanmono).toHaveClass("dropdown-active");
    });

    it("OK: ポインタ操作で値を設定できる", async () => {
      const { container } = render(<CategoryListbox categories={mockCategoryList} />);

      const button = screen.getByRole("button");
      await user.click(button);
      const options = screen.getAllByRole("option");
      const gohanmono = options[1];
      await user.click(gohanmono);
      expect(gohanmono).toHaveAttribute("aria-selected", "true");
      const value = container.querySelector(".dropdown-textfield");
      expect(value).toHaveTextContent("ご飯物");
    });
  });
});
