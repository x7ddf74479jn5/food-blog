import Image from "next/image";

import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
import { urlTable } from "@/utils/paths/url";

type CategoryListProps = {
  categories: TCategory[];
  width: number;
  height: number;
};

export const CategoryList: React.VFC<CategoryListProps> = ({ categories, width, height }) => {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <NextLink href={`${urlTable.categories}/${category.slug}`}>
            <div className="flex flex-col justify-center items-center">
              <div className="w-auto">
                <Image src={category.image.url} alt={category.slug} width={width} height={height} objectFit="cover" />
              </div>
              <p className="text-sm">{category.name}</p>
            </div>
          </NextLink>
        </li>
      ))}
    </ul>
  );
};
