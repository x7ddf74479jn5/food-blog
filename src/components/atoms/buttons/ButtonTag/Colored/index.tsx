import NextLink from "@/components/atoms/NextLink";
import type { TTag } from "@/types";
import { classNames, getBGColor } from "@/utils/css";
import { urlTable } from "@/utils/paths/url";

type Props = {
  tag: TTag;
};

export const ButtonTagColored = ({ tag }: Props) => {
  const bgColor = getBGColor(tag.color);
  return (
    <NextLink href={`${urlTable.tags}/${tag.slug}`}>
      <div className={classNames("inline-block py-1 px-2 text-white rounded-lg", bgColor)}>#{tag.name}</div>
    </NextLink>
  );
};
