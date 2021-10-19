import renderer from "react-test-renderer";

import TextDate from ".";

describe("components/atoms/TextDate", () => {
  const date = new Date("2020-12-12T00:00:00+09:00");
  it("snapshot", () => {
    const tree = renderer.create(<TextDate date={date} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
