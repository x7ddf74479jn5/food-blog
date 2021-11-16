import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

const Search: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [, setActive] = useState(false);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  const handleFocus = () => setActive(true);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query === "") {
      return;
    }
    if (event.key === "Enter") {
      router.push({
        pathname: "/search",
        query: { q: query },
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActive(false);
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
          value={query}
          inputMode="text"
        />
      </div>
    </div>
  );
};

export default Search;
