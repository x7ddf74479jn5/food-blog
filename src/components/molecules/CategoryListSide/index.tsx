import Image from "next/image";
import { memo } from "react";

import { SideSectionContainer } from "@/components/atoms/containers/SideSectionContainer/index";
import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
import { urlTable } from "@/utils/paths/url";

type CategoryListSideProps = {
  categories: TCategory[];
  columns: string;
};

export const CategoryListSide: React.VFC<CategoryListSideProps> = memo(({ categories, columns }) => {
  return (
    <SideSectionContainer header="カテゴリー">
      <ul
        className={`grid grid-flow-row gap-2 md:max-h-[calc(28rem+8rem)] md:overflow-y-auto place-items-center ${columns}`}
      >
        {categories.map((category) => (
          <li key={category.id}>
            <div className="flex flex-col justify-center items-center w-24 h-full">
              <NextLink href={`${urlTable.categories}/${category.slug}`}>
                <Image src={category.image.url} alt={category.slug} width={128} height={128} objectFit="cover" />
                <p className="text-sm text-center">{category.name}</p>
              </NextLink>
            </div>
          </li>
        ))}
      </ul>
    </SideSectionContainer>
  );
});

CategoryListSide.displayName = "CategoryListSide";
