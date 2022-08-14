import { render, screen } from "jest/test-utils";

import ErrorPage from "./index.page";

describe("pages/_error", () => {
  it("OK: 初期レンダリング", async () => {
    render(<ErrorPage pageTitle="Unhandled Error" message="Error Message" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Unhandled Error");
    expect(screen.getByText("Error Message")).toBeInTheDocument();
  });
});
