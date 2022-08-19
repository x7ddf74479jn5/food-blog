/* eslint-disable @typescript-eslint/naming-convention */
import type { ComponentProps } from "react";

import { CustomImage } from "@/components/atoms/mdx/CustomImage";
import { CustomLink } from "@/components/atoms/mdx/CustomLink";

import { Callout } from "./Callout";
import { LinkCard } from "./LinkCard";

export const MDXCustomComponents = {
  img: (props: ComponentProps<typeof CustomImage>) => <CustomImage {...props} />,
  a: (props: ComponentProps<typeof CustomLink>) => <CustomLink {...props} />,
  Callout,
  LinkCard,
};

export default MDXCustomComponents;
