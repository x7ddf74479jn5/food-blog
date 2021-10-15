import Image from "next/image";

import { SideSectionContainer } from "@/components/atoms/containers/SideSectionContainer/index";
import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
import { UrlTable } from "@/utils/paths/url";

type CategoryMenuProps = {
  categories: TCategory[];
  columns: string;
};

export const CategoryMenu: React.VFC<CategoryMenuProps> = ({ categories, columns }) => {
  return (
    <SideSectionContainer header="カテゴリー">
      <div className={`grid grid-flow-row gap-2 ${columns}`}>
        {categories.map((category) => (
          <div className="flex flex-col justify-center items-center" key={category.id}>
            <NextLink href={`${UrlTable.categories}/${category.slug}`}>
              <Image src={category.image.url} alt={category.slug} width={128} height={128} objectFit="cover" />
              <p className="text-sm text-center">{category.name}</p>
            </NextLink>
          </div>
        ))}
      </div>
    </SideSectionContainer>
  );
};
