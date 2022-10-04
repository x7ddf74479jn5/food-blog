import { useCallback, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

import { usePopover } from "@/hooks/usePopover";

import { useSearchMutation, useSearchState } from "../SearchContext";
import { useSearch } from "../useSearch";
import { SearchHistory } from "./SearchHistory";

const useSearchBar = () => {
  const { text } = useSearchState();
  const { setText } = useSearchMutation();
  const q = text.trim();
  const { search } = useSearch({ q });

  const textSearch = () => {
    if (q === "") return;
    search();
  };

  return {
    text,
    setText,
    textSearch,
  };
};

const SearchBar: React.FC = () => {
  const { text, setText, textSearch } = useSearchBar();
  const { isActive, setIsActive, ref } = usePopover<HTMLDivElement>();
  const [isShow, setIsShow] = useState(isActive);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);

  const handleFocus = () => setIsActive(true);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter": {
        textSearch();
        setIsShow(false);
      }
      case "ArrowDown": {
        setIsShow(true);
      }
    }
  };

  const handleSubmit = () => {
    textSearch();
    setIsShow(false);
  };

  const handleCloseSearch = useCallback(() => setIsShow(false), []);

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center space-x-2 rounded-full bg-gray-100 py-2 px-3 dark:bg-gray-700">
        <IconContext.Provider
          value={{
            color: "gray",
          }}
        >
          <FaSearch />
        </IconContext.Provider>

        <input
          type="search"
          placeholder="Search..."
          className="w-full bg-gray-100 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
          value={text}
        />
      </div>

      <SearchHistory show={isShow} onClose={handleCloseSearch} />
    </div>
  );
};

export default SearchBar;
