import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

import { useSearchHistoryContext } from "@/context";
import { urlTable } from "@/utils/paths/url";

const Search: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();
  const { histories, setHistories } = useSearchHistoryContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  const handleFocus = () => setIsActive(true);

  const search = (q: string) => {
    router.push(
      {
        pathname: urlTable.search,
        query: { q },
      },
      undefined,
      { shallow: true }
    );

    if (!histories.includes(query)) {
      setHistories((prev) => [query, ...prev].slice(0.5));
    }

    setQuery("");
    setIsActive(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query === "") {
      return;
    }

    if (event.key === "Enter") {
      search(query);
    }
  };

  const handleSubmit = () => {
    if (query === "") {
      return;
    }

    search(query);
  };

  const handleClickInside = (history: string) => {
    search(history);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center py-2 px-3 space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full">
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
          className="w-full dark:text-gray-100 bg-gray-100 dark:bg-gray-700 focus:outline-none"
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyPress={handleKeyPress}
          onSubmit={handleSubmit}
          value={query}
          inputMode="text"
        />
      </div>
      {isActive && histories && histories.length > 0 && (
        <ul className="overflow-y-auto fixed z-10 py-2 mt-1 mr-4 max-h-[50vh] bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 shadow-lg">
          {histories.map((history) => (
            <li
              key={history}
              className="py-2 px-4 text-sm leading-5 text-left dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-green-500 cursor-pointer"
            >
              <button onClick={() => handleClickInside(history)}>{history}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
