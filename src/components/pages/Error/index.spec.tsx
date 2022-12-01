import { render, screen } from "jest/test-utils";

import { Error as ErrorPage } from ".";

describe("pages/error", () => {
  it("404", async () => {
    const mockReset = jest.fn();
    render(<ErrorPage status={404} error={new Error("test")} onReset={mockReset} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("404 - Not Found");
    expect(screen.getByText("ページが見つかりませんでした")).toBeInTheDocument();
  });

  it("500", async () => {
    const mockReset = jest.fn();
    render(<ErrorPage status={500} error={new Error("test")} onReset={mockReset} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("500 - Server Error");
    expect(screen.getByText("サーバーで問題が発生しました")).toBeInTheDocument();
  });

  it("Unhandled", async () => {
    const mockReset = jest.fn();
    render(<ErrorPage error={new Error("test")} onReset={mockReset} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Unhandled Error");
    expect(screen.getByText("サイト上で問題が発生しました")).toBeInTheDocument();
  });
});
