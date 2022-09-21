import { Disclosure } from "@headlessui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

            <Disclosure.Panel className="mt-2 space-y-4 pl-3">
              <div className="flex flex-col justify-between gap-y-2 md:flex-row md:gap-x-4">
                <CategoryCombobox />
              </div>
              <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-4">
                <CategoryCombobox />
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
};
