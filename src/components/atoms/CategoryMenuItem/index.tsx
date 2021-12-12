import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";

import NextLink from "@/components/atoms/NextLink";
import { urlTable } from "@/utils/paths/url";

type CategoryMenuItemProps = {
  text: string;
  slug?: string | undefined;
};

const menuItemCss = {
  activeTrue: "bg-gray-100 dark:bg-green-500 text-gray-900 dark:text-gray-100",
  activeFalse: "text-gray-700 dark:text-gray-300",
  common: "flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none cursor-pointer",
};

export const CategoryMenuItem: React.VFC<CategoryMenuItemProps> = ({ slug, text }) => {
  const router = useRouter();
  const asPath = router.asPath;

  const isCurrentPage = () => {
    if (!asPath.startsWith(urlTable.categories)) {
      return false;
    }
    if (slug === router.query.slug || slug === undefined) {
      return true;
    }
    return false;
  };

  return (
    <Menu.Item disabled={isCurrentPage()}>
      {({ active }) => (
        <NextLink
          href={asPath}
          className={`${active ? menuItemCss.activeTrue : menuItemCss.activeFalse} ${menuItemCss.common}`}
        >
          {text}
        </NextLink>
      )}
    </Menu.Item>
  );
};
