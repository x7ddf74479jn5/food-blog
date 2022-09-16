import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { memo } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import NextLink from "@/components/atoms/NextLink";
import { DropdownTransition } from "@/components/atoms/transition/DropdownTransition";
import type { TCategory } from "@/types";
import { classNames } from "@/utils/css";
import { urlTable } from "@/utils/paths/url";

type CategoryMenuItemProps = {
  label: string;
  href: string;
  disabled?: boolean;
};

export const CategoryMenuItem: React.FC<CategoryMenuItemProps> = ({ href, label, disabled }) => {
  return (
    <Menu.Item as="div" disabled={disabled}>
      {({ active }) => (
        <NextLink
          href={href}
          className={classNames("dropdown-option", active ? "dropdown-active" : "dropdown-inactive")}
        >
          {label}
        </NextLink>
      )}
    </Menu.Item>
  );
};

const usePath = () => {
  const { asPath } = useRouter();

  const matchPath = (path: string) => asPath === path;

  return { matchPath };
};

type CategoryMenuProps = {
  categories: TCategory[];
};

export const CategoryMenu: React.FC<CategoryMenuProps> = memo(({ categories }) => {
  const { matchPath } = usePath();

  return (
    <Menu as="div" className="dropdown">
      {({ open }) => (
        <>
          <Menu.Button className="dropdown-button">
            <span>カテゴリー</span>
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </Menu.Button>

          <DropdownTransition>
            <Menu.Items static className="dropdown-options w-28">
              <CategoryMenuItem label="一覧" href={urlTable.categories} disabled={matchPath(urlTable.categories)} />

              <CategoryMenuItem label="おすすめ" href={urlTable.pickup} disabled={matchPath(urlTable.pickup)} />
              <CategoryMenuItem label="人気" href={urlTable.popular} disabled={matchPath(urlTable.popular)} />

              {categories.map((category) => (
                <CategoryMenuItem
                  key={category.id}
                  href={`${urlTable.categories}/${category.slug}`}
                  label={category.name}
                  disabled={matchPath(`${urlTable.categories}/${category.slug}`)}
                />
              ))}
            </Menu.Items>
          </DropdownTransition>
        </>
      )}
    </Menu>
  );
});

CategoryMenu.displayName = "CategoryMenu";
