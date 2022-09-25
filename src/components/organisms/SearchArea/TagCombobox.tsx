import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

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

export const TagCombobox = () => {
  const [selectedPeople, setSelectedPeople] = useState<Array<P>>([]);
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

  const handleUnselect = (s: P) => {
    setSelectedPeople((prev) => prev.filter((person) => person.id !== s.id));
  };

  console.log(selectedPeople);

  return (
    <Combobox as="div" className="flex flex-col" value={selectedPeople} onChange={handleSelect} multiple>
      {({ open }) => (
        <>
          <div className="flex flex-col items-start justify-between gap-y-2 md:flex-row md:items-center md:gap-x-4">
            <Combobox.Label className="dropdown-label">Tag</Combobox.Label>
            <div className="dropdown w-full">
              <div className="dropdown-container">
                <Combobox.Input className="dropdown-textfield" onChange={handleChangeQuery} id="category-input" />
                <Combobox.Button className="dropdown-icon-button">
                  {open ? (
                    <FaChevronUp aria-hidden="true" className="text-gray-700 dark:text-gray-100" />
                  ) : (
                    <FaChevronDown aria-hidden="true" className="text-gray-700 dark:text-gray-100" />
                  )}
                </Combobox.Button>
              </div>
              <DropdownTransition afterLeave={() => setQuery("")}>
                <Combobox.Options className="dropdown-options w-full">
                  {filteredPeople.length === 0 && query !== "" ? (
                    <div className="dropdown-inactive dropdown-option">該当するタグが見つかりませんでした</div>
                  ) : (
                    filteredPeople.map((person) => (
                      <Combobox.Option
                        className={({ active }) =>
                          `dropdown-option ${active ? "dropdown-active" : "dropdown-inactive"}`
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
          </div>

          {selectedPeople.length > 0 && (
            <div className="mt-2 flex flex-row flex-wrap gap-x-2 gap-y-1 text-gray-700 dark:text-gray-100">
              {selectedPeople.map((person) => (
                <div key={person.id} className="flex flex-row items-center justify-between gap-1">
                  <button onClick={() => handleUnselect(person)}>
                    <IoCloseCircle className="h-6 w-6" />
                  </button>
                  <div>{person.name}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Combobox>
  );
};
