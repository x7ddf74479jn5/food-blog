import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { PrimaryButton } from "@/components/atoms/buttons";
import type { TCategory, TTag } from "@/types";
import { classNames } from "@/utils/css";
import { urlTable } from "@/utils/paths/url";

import SearchBar from "./SearchBar";
import { SearchProvider, useSearchMutation, useSearchState } from "./SearchContext";
import { SearchFilter } from "./SearchFilter";

const useSearch = () => {
  const router = useRouter();
  const { text, history, selectedCategory, selectedTags } = useSearchState();
  const { setHistory } = useSearchMutation();
  const category = selectedCategory?.id === "all" ? undefined : selectedCategory?.id ? "" : "";
  const tags = selectedTags?.map((tag) => tag.id).join(",");

  const search = useCallback(() => {
    router.push(
      {
        pathname: urlTable.search,
        query: { q: text, category, tags },
      },
      undefined,
      { shallow: true }
    );

    if (!history.includes(text) && text !== "") {
      setHistory((prev) => [text, ...prev].slice(0, 5));
    }
  }, [router, text, category, tags, history, setHistory]);

  return {
    search,
  };
};

type SearchAreaProps = {
  categories: TCategory[];
  tags: TTag[];
};

export const SearchArea: React.FC<SearchAreaProps> = (props) => {
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const { search } = useSearch();

  const handleClick = search;

  const handleToggle = useCallback((open: boolean) => {
    setIsFilterEnabled(open);
  }, []);

  return (
    <SearchProvider>
      <SearchBar />
      <div
        className={classNames(
          "mt-3 gap-2",
          isFilterEnabled ? "flex flex-column flex-wrap" : "flex flex-row flex-wrap justify-between"
        )}
      >
        <div className={classNames(isFilterEnabled ? "w-full" : "w-auto")}>
          <SearchFilter {...props} onToggle={handleToggle} />
        </div>
        <div className={classNames("flex flex-row justify-end max-h-fit", isFilterEnabled ? "w-full mt-2" : "w-auto")}>
          <PrimaryButton size="sm" label="検索" onClick={handleClick} />
        </div>
      </div>
    </SearchProvider>
  );
};
