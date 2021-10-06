import NextLink from "@/components/atoms/NextLink";
import type { TTag } from "@/types";
import { UrlTable } from "@/utils/paths/url";

type Props = {
  tag: TTag;
};

export const ButtonTagPlain: React.FC<Props> = ({ tag }) => (
  <NextLink href={`${UrlTable.tags}/${tag.slug}`}>
    <span className="inline-block text-sm leading-tight text-gray-600 dak:text-white">{`#${tag.name}`}</span>
  </NextLink>
);
