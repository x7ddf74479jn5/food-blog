import Image from "next/image";

import type { TCategory } from "@/types";

type CategoryListProps = {
  categories: TCategory[];
};

export const CategoryList: React.VFC<CategoryListProps> = ({ categories }) => {
  return (
    <>
      {categories.map((category) => (
        <div className="flex flex-col justify-center items-center " key={category.id}>
          <div className="">
            <Image src={category.image.url} alt={category.slug} width={128} height={128} objectFit="cover" />
          </div>
          <p className="text-sm">{category.name}</p>
        </div>
      ))}
    </>
  );
};
