import { Menu } from "@headlessui/react";

import { CategoryMenuItem } from "@/components/atoms/CategoryMenuItem";
import type { TCategory } from "@/types";

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

export const CategoryMenu: React.VFC<CategoryMenuProps> = ({ categories }) => {
  return (
    <div className="inline-block relative text-left">
      <Menu>
        {({ open }) => (
          <>
            <span className="rounded-md shadow-sm">
              <Menu.Button className="inline-flex justify-center py-1 px-3 w-full text-sm font-medium leading-5 text-gray-700 hover:text-gray-500 dark:text-gray-100 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-500 dark:hover:border-gray-400 transition duration-150 ease-in-out focus:outline-none">
                <span>{"カテゴリー"}</span>
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
};
