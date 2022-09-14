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
    <Menu.Item as="div" disabled={disabled}>
      {({ active }) => (
        <NextLink
          href={href}
          className={classNames("dropdown-option", active ? "dropdown-active" : "dropdown-inactive")}
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
        <Menu.Items static className="dropdown-options w-28">
          <CategoryMenuItem text="一覧" href={urlTable.categories} disabled={asPath === urlTable.categories} />

          <CategoryMenuItem text="おすすめ" href={urlTable.pickup} disabled={asPath === urlTable.pickup} />
          <CategoryMenuItem text="人気" href={urlTable.popular} disabled={asPath === urlTable.popular} />

          {categories.map((category) => (
            <CategoryMenuItem
              key={category.id}
              href={`${urlTable.categories}/${category.slug}`}
              text={category.name}
              disabled={isCurrentPage(category.slug)}
            />
          ))}
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
    <Menu as="div" className="dropdown">
      {({ open }) => (
        <>
          <Menu.Button className="dropdown-button">
            <span>カテゴリー</span>
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </Menu.Button>

          <CategoryMenuItems open={open} categories={categories} />
        </>
      )}
    </Menu>
  );
});

CategoryMenu.displayName = "CategoryMenu";
