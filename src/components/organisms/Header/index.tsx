import { memo } from "react";

import { SiteTitle } from "@/components/atoms/SiteTitle";
import { CategoryMenu } from "@/components/molecules/category/CategoryMenu";
import SearchBar from "@/components/molecules/SearchBar";
import { ThemeSwitch } from "@/components/molecules/ThemeSwitch";
import type { TCategory } from "@/types";

type Props = {
  siteTitle: string;
  categories: TCategory[];
};

const Header: React.FC<Props> = ({ siteTitle, categories }) => {
  return (
    <header className="py-2">
      <div className="flex items-center justify-between">
        <SiteTitle size="text-2xl" title={siteTitle} />
        <div className="hidden w-1/3 sm:block" aria-label="search-area-pc">
          <SearchBar />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <CategoryMenu categories={categories} />
        </div>
      </div>
      <div className="mt-2 block sm:hidden" aria-label="search-area-mobile">
        <SearchBar />
      </div>
    </header>
  );
};

export default memo(Header);
