import Image from "next/image";

import type { TCategory } from "@/types";

type CategoryListProps = {
  categories: TCategory[];
  width: number;
  height: number;
};

export const CategoryList: React.VFC<CategoryListProps> = ({ categories, width, height }) => {
  return (
    <>
      {categories.map((category) => (
        <div className="flex flex-col justify-center items-center " key={category.id}>
          <div className="w-auto">
            <Image src={category.image.url} alt={category.slug} width={width} height={height} objectFit="cover" />
          </div>
          <p className="text-sm">{category.name}</p>
        </div>
      ))}
    </>
  );
};
