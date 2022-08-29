import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

import { useSearchHistoryContext } from "@/context";
import { usePopover } from "@/hooks/usePopover";
import { urlTable } from "@/utils/paths/url";

import { SearchHistory } from "./SearchHistory";

export const useSearch = () => {
  const [query, _setQuery] = useState("");
  const router = useRouter();
  const { histories, setHistories } = useSearchHistoryContext();

  const search = useCallback(() => {
    if (query.trim() === "") return;

    router.push(
      {
        pathname: urlTable.search,
        query: { q: query },
      },
      undefined,
      { shallow: true }
    );

    if (!histories.includes(query) && query !== "") {
      setHistories((prev) => [query, ...prev].slice(0, 5));
    }

    _setQuery("");
  }, [histories, query, router, setHistories]);

  const setQuery = useCallback((query: string) => _setQuery(query), []);

  return {
    query,
    setQuery,
    search,
  };
};

const SearchBar: React.FC = () => {
  const { query, setQuery, search } = useSearch();
  const { isActive, setIsActive, ref } = usePopover<HTMLDivElement>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  const handleFocus = () => setIsActive(true);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      search();
      setIsActive(false);
    }
  };

  const handleSubmit = () => {
    search();
    setIsActive(false);
  };

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
          onKeyPress={handleKeyPress}
          onSubmit={handleSubmit}
          value={query}
          inputMode="text"
          enterKeyHint="search"
        />
      </div>

      <SearchHistory isActive={isActive} setQuery={setQuery} />
    </div>
  );
};

export default SearchBar;
