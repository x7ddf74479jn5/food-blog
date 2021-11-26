import { memo } from "react";

import { SiteTitle } from "@/components/atoms/SiteTitle";
import ThemeSwitch from "@/components/atoms/ThemeSwitch";
import Search from "@/components/molecules/Search";

type Props = {
  siteTitle: string;
};

const Header: React.FC<Props> = ({ siteTitle }) => {
  return (
    <header className="py-2">
      <div className="flex justify-between items-center">
        <SiteTitle size="text-2xl" title={siteTitle} />
        <div className="hidden sm:block w-1/3">
          <Search />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
        </div>
      </div>
      <div className="block sm:hidden mt-2">
        <Search />
      </div>
    </header>
  );
};

export default memo(Header);
