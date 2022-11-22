import NextLink from "@/components/ui/NextLink";
import type { TTag } from "@/types";
import { getBGColor } from "@/utils/css";
import { urlTable } from "@/utils/paths/url";

type Props = {
  tag: TTag;
};

export const TagButtonColored = ({ tag }: Props) => {
  const BGColor = getBGColor(tag.color);

  return (
    <NextLink href={`${urlTable.tags}/${tag.slug}`}>
      <div className={`inline-block py-1 px-2 text-white  ${BGColor} rounded-lg`}>#{tag.name}</div>
    </NextLink>
  );
};
