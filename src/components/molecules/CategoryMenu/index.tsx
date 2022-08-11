import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { memo } from "react";

import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
import { urlTable } from "@/utils/paths/url";

type CategoryMenuItemProps = {
  text: string;
  href: string;
  disabled?: boolean;
};

const menuItemCss = {
  activeTrue: "bg-gray-100 dark:bg-green-500 text-gray-900 dark:text-gray-100",
  activeFalse: "text-gray-700 dark:text-gray-300",
  common: "flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none cursor-pointer",
};

export const CategoryMenuItem: React.FC<CategoryMenuItemProps> = ({ href, text, disabled }) => {
  return (
    <Menu.Item disabled={disabled}>
      {({ active }) => (
        <NextLink
          href={href}
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

const CategoryMenuItems: React.FC<CategoryMenuItemsProps> = ({ open, categories }) => {
  const router = useRouter();
  const asPath = router.asPath;

  const isCurrentPage = (slug: string) => {
    if (!asPath.startsWith(urlTable.categories)) {
      return false;
    }
    if (slug === router.query.slug) {
      return true;
    }
    return false;
  };

  return (
    <>
      {open && (
        <Menu.Items
          static
          className="absolute right-0 z-10 mt-1 w-28 rounded-md border border-gray-200 bg-white shadow-lg outline-none dark:border-gray-600 dark:bg-gray-700"
        >
          <div className="divide-y divide-gray-100 py-1 dark:divide-gray-600">
            <div className="">
              <CategoryMenuItem text="一覧" href={urlTable.categories} disabled={asPath === urlTable.categories} />
            </div>
            <div>
              <CategoryMenuItem text="おすすめ" href={urlTable.pickup} disabled={asPath === urlTable.pickup} />
              <CategoryMenuItem text="人気" href={urlTable.popular} disabled={asPath === urlTable.popular} />
            </div>
            <div>
              {categories.map((category) => (
                <CategoryMenuItem
                  key={category.id}
                  href={`${urlTable.categories}/${category.slug}`}
                  text={category.name}
                  disabled={isCurrentPage(category.slug)}
                />
              ))}
            </div>
          </div>
        </Menu.Items>
      )}
    </>
  );
};

type CategoryMenuProps = {
  categories: TCategory[];
};

export const CategoryMenu: React.FC<CategoryMenuProps> = memo(({ categories }) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <span className="rounded-md shadow-sm">
              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-1 px-3 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:border-gray-400">
                <span>カテゴリー</span>
                <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
