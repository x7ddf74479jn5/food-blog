import type { ComponentProps } from "react";

import CustomImage from "@/components/atoms/mdx/CustomImage";
import CustomLink from "@/components/atoms/mdx/CustomLink";

export const MDXCustomComponents = {
  img: (props: ComponentProps<typeof CustomImage>) => <CustomImage {...props} />,
  a: (props: ComponentProps<typeof CustomLink>) => <CustomLink {...props} />,
};

export default MDXCustomComponents;
