import { Combobox } from "@headlessui/react";
import { useCallback, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

import { DropdownTransition } from "@/components/atoms/transition/DropdownTransition";

import { useSearchMutation, useSearchState } from "../SearchContext";
import { useSearch } from "../useSearch";

const useSearchBar = () => {
  const { history, text } = useSearchState();
  const { setText } = useSearchMutation();
  const q = text.trim();
  const { search } = useSearch({ q });

  const textSearch = useCallback(() => {
    if (q === "") return;
    search();
  }, [q, search]);

  return {
    history,
    setText,
    text,
    textSearch,
  };
};

const SearchBar: React.FC = () => {
  const { history, setText, text, textSearch } = useSearchBar();
  const [isShow, setIsShow] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    [setText]
  );

  const handleFocus = useCallback(() => setIsShow(true), []);

  const handleComposing = useCallback((isComposing: boolean) => setIsComposing(isComposing), []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "Enter": {
          if (isComposing) return;
          textSearch();
        }
      }
    },
    [isComposing, textSearch]
  );

  const handleChangeCombobox = useCallback((text: string) => setText(text), [setText]);

  const handleBlur = useCallback(() => setIsShow(false), []);

  return (
    <Combobox as="div" className="relative" value={text} onChange={handleChangeCombobox}>
      <div className="flex items-center space-x-2 rounded-full bg-gray-100 py-2 px-3 dark:bg-gray-700">
        <IconContext.Provider
          value={{
            color: "gray",
          }}
        >
          <FaSearch />
        </IconContext.Provider>

        <Combobox.Input
          type="search"
          placeholder="Search..."
          className="w-full bg-gray-100 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
          onChange={handleChangeInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => handleComposing(true)}
          onCompositionEnd={() => handleComposing(false)}
          value={text}
        />
      </div>

      <DropdownTransition show={isShow}>
        <Combobox.Options
          static
          className={`${
            text.length === 0 && history.length === 0
              ? "hidden"
              : "absolute z-10 mt-1 mr-4 max-h-[50vh] overflow-y-auto rounded-md border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-600 dark:bg-gray-700"
          }`}
        >
          {text.length > 0 && (
            <Combobox.Option
              value={text}
              className={({ active }) =>
                `cursor-pointer py-2 px-4 text-left text-sm leading-5  dark:text-gray-100 ${
                  active ? "bg-gray-100 dark:bg-green-500" : "bg-white dark:bg-gray-700"
                } `
              }
            >
              {text}
            </Combobox.Option>
          )}
          {text === "" &&
            history.map((history) => (
              <Combobox.Option
                key={history}
                value={history}
                className={({ active }) =>
                  `cursor-pointer py-2 px-4 text-left text-sm leading-5  dark:text-gray-100 ${
                    active ? "bg-gray-100 dark:bg-green-500" : "bg-white dark:bg-gray-700"
                  } `
                }
              >
                {history}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </DropdownTransition>
    </Combobox>
  );
};

export default SearchBar;
