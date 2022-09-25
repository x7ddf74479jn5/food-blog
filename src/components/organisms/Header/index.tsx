import { memo } from "react";

import { SiteTitle } from "@/components/atoms/SiteTitle";
import { CategoryMenu } from "@/components/molecules/category/CategoryMenu";
import { ThemeSwitch } from "@/components/molecules/ThemeSwitch";
import { SearchArea } from "@/components/organisms/SearchArea";
import type { TCategory, TTag } from "@/types";

type HeaderProps = {
  siteTitle: string;
  categories: TCategory[];
  tags: TTag[];
};

const Header: React.FC<HeaderProps> = ({ siteTitle, categories, tags }) => {
  return (
    <header className="py-2">
      <div className="flex items-start justify-between">
        <SiteTitle size="text-2xl" title={siteTitle} />
        <div className="hidden w-1/2 sm:block" aria-label="search-area-pc">
          <SearchArea categories={categories} tags={tags} />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <CategoryMenu categories={categories} />
        </div>
      </div>
      <div className="mt-2 block sm:hidden" aria-label="search-area-mobile">
        <SearchArea categories={categories} tags={tags} />
      </div>
    </header>
  );
};

export default memo(Header);
