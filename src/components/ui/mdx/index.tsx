/* eslint-disable @typescript-eslint/naming-convention */
import type { ComponentProps } from "react";

import { CustomImage } from "@/components/ui/mdx/CustomImage";
import { CustomLink } from "@/components/ui/mdx/CustomLink";

import { Callout } from "./Callout";
import { LinkCard } from "./LinkCard";

export const MDXCustomComponents = {
  Callout,
  LinkCard,
  a: (props: ComponentProps<typeof CustomLink>) => <CustomLink {...props} />,
  img: (props: ComponentProps<typeof CustomImage>) => <CustomImage {...props} />,
};

export default MDXCustomComponents;
