import Image from "next/future/image";

import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
import { urlTable } from "@/utils/paths/url";

type CategoryListProps = {
  categories: TCategory[];
  width: number;
  height: number;
};

export const CategoryList: React.FC<CategoryListProps> = ({ categories, width, height }) => {
  return (
    <ul className="order-1 mt-4 mb-12 grid grid-cols-3 gap-2 sm:grid-cols-5 md:order-2 lg:grid-cols-6">
      {categories.map((category) => (
        <li key={category.id}>
          <NextLink href={`${urlTable.categories}/${category.slug}`}>
            <div className="flex flex-col items-center justify-center">
              <div className="w-auto">
                <Image
                  src={category.image.url}
                  alt={category.slug}
                  width={width}
                  height={height}
                  className="aspect-square h-auto w-full object-cover"
                  placeholder="blur"
                  blurDataURL={`${category.image.url}?q=0`}
                />
              </div>
              <p className="text-sm">{category.name}</p>
            </div>
          </NextLink>
        </li>
      ))}
    </ul>
  );
};
