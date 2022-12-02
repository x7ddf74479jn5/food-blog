import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
import { classNames } from "@/utils/css";
import { urlTable } from "@/utils/paths/url";

type ButtonCategoryProps = {
  category: TCategory;
};

export const ButtonCategory: React.FC<ButtonCategoryProps> = ({ category }) => {
  return (
    <NextLink href={`${urlTable.categories}/${category.slug}`}>
      <div
        className={classNames(
          "inline-block rounded-lg border-2 py-1 px-2 text-black dark:text-white",
          category.color === "blue"
            ? "bg-blue-700 dark:border-blue-300"
            : category.color === "green"
            ? "bg-green-700 dark:border-green-300"
            : category.color === "indigo"
            ? "bg-indigo-700 dark:border-indigo-300"
            : category.color === "pink"
            ? "bg-pink-700 dark:border-pink-300"
            : category.color === "purple"
            ? "bg-purple-700 dark:border-purple-300"
            : category.color === "red"
            ? "bg-red-700 dark:border-red-300"
            : category.color === "yellow"
            ? "bg-yellow-700 dark:border-yellow-300"
            : "bg-gray-700 dark:border-gray-300"
        )}
      >
        {category.name}
      </div>
    </NextLink>
  );
};
