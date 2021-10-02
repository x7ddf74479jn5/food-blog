import NextLink from "@/components/atoms/NextLink";
import type { TTag } from "@/types";
import { getBGColor } from "@/utils/formatter";

type Props = {
  tag: TTag;
};

export const ButtonTagColored = ({ tag }: Props) => {
  const BGColor = getBGColor(tag.color);

  return (
    <NextLink href={`/tags/${tag.slug}`}>
      <div className={`inline-block py-1 px-2 text-white  ${BGColor} rounded-lg`}>{tag.name}</div>
    </NextLink>
  );
};
