import NextLink from "@/components/atoms/NextLink";
import type { TTag } from "@/types";
import { classNames } from "@/utils/css";
import { urlTable } from "@/utils/paths/url";

type Props = {
  tag: TTag;
};

export const ButtonTagColored = ({ tag }: Props) => {
  return (
    <NextLink href={`${urlTable.tags}/${tag.slug}`}>
      <div
        className={classNames(
          "inline-block py-1 px-2 text-white rounded-lg",
          tag.color === "blue"
            ? "bg-blue-700"
            : tag.color === "green"
            ? "bg-green-700"
            : tag.color === "indigo"
            ? "bg-indigo-700"
            : tag.color === "pink"
            ? "bg-pink-700"
            : tag.color === "purple"
            ? "bg-purple-700"
            : tag.color === "red"
            ? "bg-red-700"
            : tag.color === "yellow"
            ? "bg-yellow-700"
            : "bg-gray-500"
        )}
      >
        #{tag.name}
      </div>
    </NextLink>
  );
};
