import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { DropdownTransition } from "@/components/atoms/transition/DropdownTransition";
import type { TCategory, TTag } from "@/types";

import { CategoryCombobox } from "./CategoryCombobox";

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
            <Disclosure.Button className="flex items-center justify-center gap-2  rounded-md py-1 px-3 text-sm font-medium leading-5 text-gray-700 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-300">
              <span className="">詳細検索</span>
              {open ? <FaChevronUp className="" /> : <FaChevronDown />}
            </Disclosure.Button>

            <DropdownTransition>
              <Disclosure.Panel className="pl-3 text-gray-100">
                Category: <CategoryCombobox />
                Tag: <CategoryCombobox />
              </Disclosure.Panel>
            </DropdownTransition>
          </>
        );
      }}
    </Disclosure>
  );
};
