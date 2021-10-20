import { memo } from "react";

import NextLink from "@/components/atoms/NextLink";
import ThemeSwitch from "@/components/atoms/ThemeSwitch";
import Search from "@/components/molecules/Search";

type Props = {
  siteTitle: string;
};

const Header: React.FC<Props> = ({ siteTitle }) => {
  return (
    <header className="py-2">
      <div className="flex justify-between items-center">
        <NextLink href="/" className="text-2xl font-bold text-green-500">
          {siteTitle}
        </NextLink>

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
