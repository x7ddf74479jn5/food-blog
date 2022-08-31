import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { DropdownTransition } from "@/components/atoms/transition/DropdownTransition";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

type P = {
  id: number;
  name: string;
};

export const CategoryCombobox = () => {
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]]);
  const [query, setQuery] = useState("");
  const selectedPersonNames = selectedPeople.map((selectedPerson) => selectedPerson.name.toLowerCase());

  const notSelectedPeople = people.filter((person) => !selectedPersonNames.includes(person.name.toLowerCase()));

  const filteredPeople =
    query === ""
      ? notSelectedPeople
      : notSelectedPeople.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleSelect = (v: P[]) => setSelectedPeople((prev) => Array.from(new Set([...prev, ...v])));

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  return (
    <Combobox value={selectedPeople} onChange={handleSelect} multiple>
      {({ open }) => (
        <div className="dropdown mt-1">
          <div
            className="dropdown-container relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 
        "
          >
            <Combobox.Input
              className="dropdown-container w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black focus:ring-0 dark:text-white"
              onChange={handleChangeQuery}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {open ? (
                <FaChevronUp className="h-5 w-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
              ) : (
                <FaChevronDown className="h-5 w-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
              )}
            </Combobox.Button>
          </div>
          <DropdownTransition afterLeave={() => setQuery("")}>
            <Combobox.Options className="dropdown-container absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="dropdown-inactive relative cursor-default select-none py-2 px-4">Nothing found.</div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "dropdown-active" : "dropdown-inactive"
                      }`
                    }
                    key={person.id}
                    value={person}
                  >
                    {person.name}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </DropdownTransition>
        </div>
      )}
    </Combobox>
  );
};
