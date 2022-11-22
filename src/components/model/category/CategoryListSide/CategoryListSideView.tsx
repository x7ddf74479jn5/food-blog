import Image from "next/image";

import { SideSectionContainer } from "@/components/ui/containers";
import NextLink from "@/components/ui/NextLink";
import type { TCategory } from "@/types";
import { urlTable } from "@/utils/paths/url";

type Props = {
  categories: TCategory[];
  columns: string;
};

export const CategoryListSideView: React.FC<Props> = ({ categories, columns }) => {
  return (
    <SideSectionContainer header="カテゴリー" href="/articles/categories">
      <ul
        className={`grid grid-flow-row place-items-center gap-2 md:max-h-[calc(28rem+8rem)] md:overflow-y-auto ${columns}`}
      >
        {categories.map((category) => (
          <li key={category.id}>
            <div className="flex h-full w-24 flex-col items-center justify-center">
              <NextLink href={`${urlTable.categories}/${category.slug}`}>
                <Image
                  src={category.image.url}
                  alt={category.slug}
                  width={128}
                  height={128}
                  className="aspect-square h-24 w-24 object-cover"
                  placeholder="blur"
                  blurDataURL={category.image.blurDataURL}
                />
                <p className="text-center text-sm">{category.name}</p>
              </NextLink>
            </div>
          </li>
        ))}
      </ul>
    </SideSectionContainer>
  );
};
