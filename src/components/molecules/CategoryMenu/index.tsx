import Image from "next/image";

import { SideSectionContainer } from "@/components/atoms/containers/SideSectionContainer/index";
import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
import { urlTable } from "@/utils/paths/url";

type CategoryMenuProps = {
  categories: TCategory[];
  columns: string;
};

export const CategoryMenu: React.VFC<CategoryMenuProps> = ({ categories, columns }) => {
  return (
    <SideSectionContainer header="カテゴリー">
      <div
        className={`grid grid-flow-row gap-2 md:max-h-[calc(28rem+8rem)] md:overflow-y-auto place-items-center ${columns}`}
      >
        {categories.map((category) => (
          <div className="flex flex-col justify-center items-center w-24 h-full" key={category.id}>
            <NextLink href={`${urlTable.categories}/${category.slug}`}>
              <Image src={category.image.url} alt={category.slug} width={128} height={128} objectFit="cover" />
              <p className="text-sm text-center">{category.name}</p>
            </NextLink>
          </div>
        ))}
      </div>
    </SideSectionContainer>
  );
};
