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
    <ul className="grid order-1 md:order-2 grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2 mt-4 mb-12">
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
