import Image from "next/image";

import { SideSectionContainer } from "@/components/atoms/containers/SideSectionContainer/index";
import type { TCategory } from "@/types";

type CategoryMenuProps = {
  categories: TCategory[];
  columns: string;
};

export const CategoryMenu: React.VFC<CategoryMenuProps> = ({ categories, columns }) => {
  return (
    <SideSectionContainer header="カテゴリー">
      <div className={`grid grid-flow-row gap-2 ${columns}`}>
        {categories.map((category) => (
          <div className="flex flex-col justify-center items-center " key={category.id}>
            <div className="">
              <Image src={category.image.url} alt={category.slug} width={128} height={128} objectFit="cover" />
            </div>
            <p className="text-sm">{category.name}</p>
          </div>
        ))}
      </div>
    </SideSectionContainer>
  );
};
