import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
import { getBorderColor } from "@/utils/css";
import { urlTable } from "@/utils/paths/url";

type ButtonCategoryProps = {
  category: TCategory;
};

export const ButtonCategory: React.FC<ButtonCategoryProps> = ({ category }) => {
  const borderColor = getBorderColor(category.color);
  return (
    <NextLink href={`${urlTable.categories}/${category.slug}`}>
      <div className={`inline-block rounded-lg border-2 py-1 px-2 text-black dark:text-white ${borderColor}`}>
        {category.name}
      </div>
    </NextLink>
  );
};
