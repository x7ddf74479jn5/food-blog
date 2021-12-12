import { Menu } from "@headlessui/react";

import { CategoryMenuItem } from "@/components/atoms/CategoryMenuItem";
import type { TCategory } from "@/types";

type CategoryMenuItemsProps = {
  open: boolean;
  categories: TCategory[];
};

export const CategoryMenuItems: React.VFC<CategoryMenuItemsProps> = ({ open, categories }) => {
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
