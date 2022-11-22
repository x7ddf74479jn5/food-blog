import { render, screen } from "jest/test-utils";

import { TOC } from ".";

describe("components/model/article/TOC", () => {
  console.warn = jest.fn();

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div>
      <div id="js-toc-content" className="hidden">
        <h2 data-testid="heading">h2</h2>
        <h3 data-testid="heading">h3</h3>
        <h4 data-testid="heading">h4</h4>
        <h5 data-testid="heading">h5</h5>
        <h6 data-testid="heading">h6</h6>
      </div>
      {children}
    </div>
  );

  it("OK: 初期レンダリング ", () => {
    render(
      <Wrapper>
        <TOC />
      </Wrapper>
    );

    const contentHeader = screen.getAllByRole("heading", { level: 2 })[1];
    expect(contentHeader).toHaveTextContent("目次");
    const anchors = screen.getAllByRole("link");
    const headings = screen.getAllByRole("heading");
    for (let index = 0; index < anchors.length; index++) {
      expect(headings[index].innerText).toBe(anchors[index].innerText);
    }
  });
});
