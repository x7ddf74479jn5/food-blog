import renderer from "react-test-renderer";

import CustomImage from ".";

describe("components/atoms/mdx/CustomImage", () => {
  const mockImage = "/mocks/data/images/2996666_s.jpg";

  it("snapshot", () => {
    const image1 = renderer.create(<CustomImage src={mockImage} />).toJSON();
    expect(image1).toMatchSnapshot();
    const image2 = renderer.create(<CustomImage src={mockImage} width={100} height={100} />).toJSON();
    expect(image2).toMatchSnapshot();
  });
});
