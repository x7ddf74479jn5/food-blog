import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { memo } from "react";

import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
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
    if (slug === router.query.slug) {
      return true;
    }
    return false;
  };

  return (
    <Menu.Item disabled={isCurrentPage()}>
      {({ active }) => (
        <NextLink
          href={`${urlTable.categories}/${slug ?? ""}`}
          className={`${active ? menuItemCss.activeTrue : menuItemCss.activeFalse} ${menuItemCss.common}`}
        >
          {text}
        </NextLink>
      )}
    </Menu.Item>
  );
};

type CategoryMenuItemsProps = {
  open: boolean;
  categories: TCategory[];
};

const CategoryMenuItems: React.VFC<CategoryMenuItemsProps> = ({ open, categories }) => {
  return (
    <>
      {open && (
        <Menu.Items
          static
          className="absolute right-0 z-10 mt-1 w-28 bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 shadow-lg outline-none"
        >
          <div className="py-1">
            <CategoryMenuItem text="一覧" />
            {categories.map((category) => (
              <CategoryMenuItem key={category.id} slug={category.slug} text={category.name} />
            ))}
          </div>
        </Menu.Items>
      )}
    </>
  );
};

type CategoryMenuProps = {
  categories: TCategory[];
};

export const CategoryMenu: React.VFC<CategoryMenuProps> = memo(({ categories }) => {
  return (
    <div className="inline-block relative text-left">
      <Menu>
        {({ open }) => (
          <>
            <span className="rounded-md shadow-sm">
              <Menu.Button className="inline-flex justify-center py-1 px-3 w-full text-sm font-medium leading-5 text-gray-700 hover:text-gray-500 dark:text-gray-100 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-500 dark:hover:border-gray-400 transition duration-150 ease-in-out focus:outline-none">
                <span>カテゴリー</span>
                <svg className="-mr-1 ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Menu.Button>
            </span>

            <CategoryMenuItems open={open} categories={categories} />
          </>
        )}
      </Menu>
    </div>
  );
});

CategoryMenu.displayName = "CategoryMenu";
