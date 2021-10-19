import renderer from "react-test-renderer";

import CustomImage from ".";

describe("components/atoms/mdx/CustomImage", () => {
  it("snapshot", () => {
    const image = renderer.create(<CustomImage src={"/mocks/data/images/2996666_s.jpg"} />).toJSON();
    expect(image).toMatchSnapshot();
    const nextImage = renderer
      .create(<CustomImage src={"/mocks/data/images/2996666_s.jpg"} width={100} height={100} />)
      .toJSON();
    expect(nextImage).toMatchSnapshot();
  });
});
