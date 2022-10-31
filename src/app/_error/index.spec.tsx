import { render, screen } from "jest/test-utils";

import ErrorPage from "./page";

describe("pages/_error", () => {
  it("OK: 初期レンダリング", async () => {
    render(<ErrorPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Unhandled Error");
    expect(screen.getByText("サイト上で問題が発生しました")).toBeInTheDocument();
  });
});
