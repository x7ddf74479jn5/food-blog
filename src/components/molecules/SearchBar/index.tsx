import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

import { useSearchHistoryContext } from "@/context";
import { urlTable } from "@/utils/paths/url";

const SearchBar: React.FC = () => {
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

    if (!histories.includes(query) && query !== "") {
      setHistories((prev) => [query, ...prev].slice(0, 5));
    }

    setQuery("");
    setIsActive(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query.trim() === "") {
      return;
    }

    if (event.key === "Enter") {
      search(query.trim());
    }
  };

  const handleSubmit = () => {
    if (query.trim() === "") {
      return;
    }

    search(query.trim());
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
      {isActive && histories && histories.length > 0 && (
        <ul className="fixed z-10 mt-1 mr-4 max-h-[50vh] overflow-y-auto rounded-md border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-600 dark:bg-gray-700">
          {histories.map((history) => (
            <li
              key={history}
              className="cursor-pointer py-2 px-4 text-left text-sm leading-5 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-green-500"
            >
              <button onClick={() => handleClickInside(history)}>{history}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
