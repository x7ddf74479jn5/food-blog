import renderer from "react-test-renderer";

import { ContainerWithOrder } from ".";

describe("components/atoms/containers/ContainerWithOrder", () => {
  it("snapshot", () => {
    const tree = renderer.create(<ContainerWithOrder order="order-1">children</ContainerWithOrder>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
