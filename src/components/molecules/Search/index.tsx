import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

// import { TArticle } from "@/types";

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

  // const handleClickInside = () => setActive(false);

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
  // console.log("results ", results);
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
          className="w-full text-sm dark:text-gray-100 bg-gray-100 dark:bg-gray-700 focus:outline-none"
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyPress={handleKeyPress}
          value={query}
        />
      </div>

      {/* {isActive && results && results.length > 0 && (
        <ul className="fixed max-h-screen/2 overflow-y-auto mt-1 mr-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
          {results.map(({ id, title }) => (
            <li
              key={id}
              className="px-4 py-2 text-sm dark:text-gray-100 leading-5 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-green-500"
            >
              <NextLink href={`/articles/${id}`} onClick={handleClickInside}>
                {title}
              </NextLink>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default Search;
