import Image from "next/image";

import NextLink from "@/components/ui/NextLink";
import type { TCategory } from "@/types";
import { urlTable } from "@/utils/paths/url";

type Props = {
  categories: TCategory[];
  width: number;
  height: number;
};

export const CategoryListView: React.FC<Props> = ({ categories, height, width }) => (
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
                blurDataURL={category.image.blurDataURL}
              />
            </div>
            <p className="text-sm">{category.name}</p>
          </div>
        </NextLink>
      </li>
    ))}
  </ul>
);
