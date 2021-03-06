import { memo } from "react";

import { SiteTitle } from "@/components/atoms/SiteTitle";
import ThemeSwitch from "@/components/atoms/ThemeSwitch";
import { CategoryMenu } from "@/components/molecules/CategoryMenu";
import Search from "@/components/molecules/Search";
import type { TCategory } from "@/types";

type Props = {
  siteTitle: string;
  categories: TCategory[];
};

const Header: React.FC<Props> = ({ siteTitle, categories }) => {
  return (
    <header className="py-2">
      <div className="flex justify-between items-center">
        <SiteTitle size="text-2xl" title={siteTitle} />
        <div className="hidden w-1/3 sm:block">
          <Search />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <CategoryMenu categories={categories} />
        </div>
      </div>
      <div className="block mt-2 sm:hidden">
        <Search />
      </div>
    </header>
  );
};

export default memo(Header);
