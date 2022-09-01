import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { memo } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import NextLink from "@/components/atoms/NextLink";
import type { TCategory } from "@/types";
import { classNames } from "@/utils/css";
import { urlTable } from "@/utils/paths/url";

type CategoryMenuItemProps = {
  text: string;
  href: string;
  disabled?: boolean;
};

export const CategoryMenuItem: React.FC<CategoryMenuItemProps> = ({ href, text, disabled }) => {
  return (
    <Menu.Item disabled={disabled}>
      {({ active }) => (
        <NextLink
          href={href}
          className={classNames(
            "flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none cursor-pointer",
            active ? "menubox-active" : "menubox-inactive"
          )}
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
        <Menu.Items static className="menubox-container absolute right-0 z-10 mt-1 w-28">
          <div className="divide-y divide-gray-100 py-1 dark:divide-gray-600">
            <div>
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
              <Menu.Button className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-1 px-3 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:border-gray-400">
                <span>カテゴリー</span>
                {open ? <FaChevronUp className="hover:bg-gray-500" /> : <FaChevronDown className="hover:bg-gray-500" />}
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
