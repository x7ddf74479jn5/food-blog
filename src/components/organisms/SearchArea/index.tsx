import { memo, useCallback, useState } from "react";

import { PrimaryButton } from "@/components/atoms/buttons";
import type { TCategory, TTag } from "@/types";
import { classNames } from "@/utils/css";

import SearchBar from "./SearchBar";
import { SearchProvider, useSearchState } from "./SearchContext";
import { SearchFilter } from "./SearchFilter";
import { useSearch } from "./useSearch";

export const useSearchArea = () => {
  const { text, selectedCategory, selectedTags } = useSearchState();
  const q = text.trim();
  const category = selectedCategory.id === "all" ? "" : selectedCategory.id ?? "";
  const tags = selectedTags?.map((tag) => tag.id).join(",");

  const { search } = useSearch({ q, category, tags });

  return {
    search,
  };
};

const useSearchFilter = () => {
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);

  const toggleFilter = useCallback((open: boolean) => {
    setIsFilterEnabled(open);
  }, []);

  return [isFilterEnabled, toggleFilter] as const;
};

type SearchAreaProps = {
  categories: TCategory[];
  tags: TTag[];
};

const SearchAreaCore: React.FC<SearchAreaProps> = (props) => {
  const [isFilterEnabled, toggleFilter] = useSearchFilter();
  const { search } = useSearchArea();

  const handleClick = search;
  const handleToggle = toggleFilter;

  return (
    <>
      <SearchBar />
      <div
        className={classNames(
          "mt-3 gap-2",
          isFilterEnabled ? "flex flex-column flex-wrap" : "flex flex-row flex-wrap justify-between"
        )}
      >
        <div aria-label="検索フィルター" className={classNames(isFilterEnabled ? "w-full" : "w-auto")}>
          <SearchFilter {...props} onToggle={handleToggle} />
        </div>
        <div className={classNames("flex flex-row justify-end max-h-fit", isFilterEnabled ? "w-full mt-2" : "w-auto")}>
          <PrimaryButton size="sm" label="検索" onClick={handleClick} />
        </div>
      </div>
    </>
  );
};

export const SearchArea: React.FC<SearchAreaProps> = memo((props) => (
  <SearchProvider>
    <SearchAreaCore {...props} />
  </SearchProvider>
));

SearchArea.displayName = "SearchArea";
