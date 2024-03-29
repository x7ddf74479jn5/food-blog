import { Listbox } from "@headlessui/react";
import { memo, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { DropdownTransition } from "@/components/atoms/transition/DropdownTransition";
import { useSearchMutation, useSearchState } from "@/contexts/search/SearchContext";
import type { AllOrCategory, TCategory } from "@/types";

const allCategory = { id: "all", name: "すべて" } as const;

type CategoryListboxProps = {
  categories: TCategory[];
};

export const CategoryListbox: React.FC<CategoryListboxProps> = memo(({ categories }) => {
  const { selectedCategory } = useSearchState();
  const { setSelectedCategory } = useSearchMutation();

  const handleSelect = useCallback(
    (category: AllOrCategory) => {
      setSelectedCategory(category);
    },
    [setSelectedCategory]
  );

  return (
    <Listbox
      as="div"
      className="flex flex-col items-start justify-between gap-y-2 md:flex-row md:items-center md:gap-x-4"
      value={selectedCategory}
      onChange={handleSelect}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="dropdown-label">カテゴリー</Listbox.Label>
          <div className="dropdown w-full">
            <div className="dropdown-container">
              <div className="dropdown-textfield">{selectedCategory.name}</div>
              <Listbox.Button className="dropdown-icon-button">
                {open ? (
                  <FaChevronUp aria-hidden="true" className="text-gray-700 dark:text-gray-100" />
                ) : (
                  <FaChevronDown aria-hidden="true" className="text-gray-700 dark:text-gray-100" />
                )}
              </Listbox.Button>
            </div>
            <DropdownTransition>
              <Listbox.Options className="dropdown-options w-full">
                <Listbox.Option
                  className={({ active }) => `dropdown-option ${active ? "dropdown-active" : "dropdown-inactive"}`}
                  value={allCategory}
                >
                  {allCategory.name}
                </Listbox.Option>
                {categories.map((category) => (
                  <Listbox.Option
                    className={({ active }) => `dropdown-option ${active ? "dropdown-active" : "dropdown-inactive"}`}
                    key={category.id}
                    value={category}
                  >
                    {category.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </DropdownTransition>
          </div>
        </>
      )}
    </Listbox>
  );
});

CategoryListbox.displayName = "CategoryListbox";
