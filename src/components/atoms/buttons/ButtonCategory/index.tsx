import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
import { getBorderColor } from "@/utils/formatter/getColor";
import { urlTable } from "@/utils/paths/url";

type Props = {
  category: TCategory;
};

const ButtonCategory = ({ category }: Props) => {
  const borderColor = getBorderColor(category.color);
  return (
    <NextLink href={`${urlTable.categories}/${category.slug}`}>
      <div className={`inline-block py-1 px-2 text-black dark:text-white rounded-lg border-2 ${borderColor}`}>
        {category.name}
      </div>
    </NextLink>
  );
};

export default ButtonCategory;
