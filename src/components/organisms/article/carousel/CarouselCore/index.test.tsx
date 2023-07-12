import { render } from "jest/test-utils";

import { CarouselCore } from ".";

describe("components/organisms/article/carousel/CarouselCore", () => {
  it("OK: 初期表示が正しい", async () => {
    const items = Array(5)
      .fill(0)
      .map((_, i) => (
        <div key={i} data-testid="carousel-item">
          item-{i}
        </div>
      ));
    const { getAllByTestId, getByTestId } = render(<CarouselCore>{items}</CarouselCore>);
    expect(getAllByTestId("carousel-item")).toHaveLength(5);
    expect(getAllByTestId("carousel-dot-button")).toHaveLength(5);
    expect(getByTestId("carousel-prev-button")).toBeInTheDocument();
    expect(getByTestId("carousel-next-button")).toBeInTheDocument();
  });
});
