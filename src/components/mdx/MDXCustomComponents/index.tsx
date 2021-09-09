import type { ComponentProps } from "react";

import CustomImage from "@/components/mdx/CustomImage";
import CustomLink from "@/components/mdx/CustomLink";

export const components = {
  img: (props: ComponentProps<typeof CustomImage>) => <CustomImage {...props} />,
  a: (props: ComponentProps<typeof CustomLink>) => <CustomLink {...props} />,
};

export default components;
