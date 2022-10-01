import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

import { usePopover } from "@/hooks/usePopover";
import { urlTable } from "@/utils/paths/url";

import { useSearchMutation, useSearchState } from "../SearchContext";
import { SearchHistory } from "./SearchHistory";

const useSearch = () => {
  const router = useRouter();
  const { text, history } = useSearchState();
  const { setText, setHistory } = useSearchMutation();

  const textSearch = useCallback(() => {
    if (text.trim() === "") return;

    router.push(
      {
        pathname: urlTable.search,
        query: { q: text },
      },
      undefined,
      { shallow: true }
    );

    if (!history.includes(text) && text !== "") {
      setHistory((prev) => [text, ...prev].slice(0, 5));
    }
  }, [text, router, history, setHistory]);

  return {
    text,
    setText,
    textSearch,
  };
};

const SearchBar: React.FC = () => {
  const { text, setText, textSearch } = useSearch();
  const { isActive, setIsActive, ref } = usePopover<HTMLDivElement>();
  const [isShow, setIsShow] = useState(isActive);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);

  const handleFocus = () => setIsActive(true);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter": {
        textSearch();
        setIsActive(false);
        setIsShow(false);
      }
      case "ArrowDown": {
        setIsActive(false);
        setIsShow(true);
      }
    }
  };

  const handleSubmit = () => {
    textSearch();
    setIsActive(false);
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
          type="textSearch"
          placeholder="Search..."
          className="w-full bg-gray-100 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyPress}
          onSubmit={handleSubmit}
          value={text}
        />
      </div>

      <SearchHistory show={isShow} onClose={handleCloseSearch} />
    </div>
  );
};

export default SearchBar;
