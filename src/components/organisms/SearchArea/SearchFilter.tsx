import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { CategoryListbox } from "@/components/organisms/SearchArea/CategoryListbox";
import type { TCategory, TTag } from "@/types";

import { TagCombobox } from "./TagCombobox";

type SearchFilterProps = {
  categories: TCategory[];
  tags: TTag[];
  onToggle: (open: boolean) => void;
};

export const SearchFilter: React.FC<SearchFilterProps> = ({ categories, tags, onToggle }) => {
  return (
    <Disclosure>
      {({ open }) => {
        onToggle(open);

        return (
          <>
            <Disclosure.Button
              className={`flex items-center justify-center gap-2 py-1 px-3 text-sm font-medium leading-5 text-gray-700 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-300 ${
                open ? "rounded-md border border-green-600" : ""
              } `}
            >
              <span>詳細検索</span>
              {open ? <FaChevronUp /> : <FaChevronDown />}
            </Disclosure.Button>

            <Disclosure.Panel className="mt-2 space-y-4 pl-3">
              <CategoryListbox categories={categories} />

              <TagCombobox tags={tags} />
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
};
