import { mockConfig } from "@mocks/data";
import { render, screen } from "jest/test-utils";
import renderer from "react-test-renderer";

import ErrorPage from "./index.page";

describe("pages/404", () => {
  it("snapshot", () => {
    const tree = renderer.create(<ErrorPage config={mockConfig} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("OK: 初期レンダリング", async () => {
    const { unmount } = render(<ErrorPage config={mockConfig} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("404 - Not Found");
    unmount();
  });
});
