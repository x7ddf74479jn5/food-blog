import { Listbox } from "@headlessui/react";
import { useCallback, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { DropdownTransition } from "@/components/atoms/transition/DropdownTransition";

const people = [
  { id: "all", name: "すべて" },
  { id: "1", name: "Durward Reynolds" },
  { id: "2", name: "Kenton Towne" },
  { id: "3", name: "Therese Wunsch" },
  { id: "4", name: "Benedict Kessler" },
  { id: "5", name: "Katelyn Rohan" },
];

type P = {
  id: string;
  name: string;
};

export const CategoryListbox = () => {
  const [selected, setSelected] = useState(people[0]);

  const handleSelect = useCallback((v: P) => {
    setSelected(v);
  }, []);

  return (
    <Listbox
      as="div"
      className="flex flex-col items-start justify-between gap-y-2 md:flex-row md:items-center md:gap-x-4"
      value={selected}
      onChange={handleSelect}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="dropdown-label">Category</Listbox.Label>
          <div className="dropdown w-full">
            <div className="dropdown-container">
              <div className="dropdown-textfield">{selected.name}</div>
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
                {/* <Listbox.Option
                  className={({ active }) => `dropdown-option ${active ? "dropdown-active" : "dropdown-inactive"}`}
                  value="all"
                >
                  すべて
                </Listbox.Option> */}
                {people.map((person) => (
                  <Listbox.Option
                    className={({ active }) => `dropdown-option ${active ? "dropdown-active" : "dropdown-inactive"}`}
                    key={person.id}
                    value={person}
                  >
                    {person.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </DropdownTransition>
          </div>
        </>
      )}
    </Listbox>
  );
};
