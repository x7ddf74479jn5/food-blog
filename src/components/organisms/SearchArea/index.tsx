import { useCallback, useState } from "react";

import { PrimaryButton } from "@/components/atoms/buttons";
import SearchBar from "@/components/organisms/SearchArea/SearchBar";
import type { TCategory, TTag } from "@/types";
import { classNames } from "@/utils/css";

import { SearchFilter } from "./SearchFilter";

type Props = {
  categories: TCategory[];
  tags: TTag[];
};

export const SearchArea: React.FC<Props> = (props) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  const handleToggle = useCallback((open: boolean) => {
    setIsFilterOpen(open);
  }, []);

  return (
    <>
      <SearchBar />
      <div
        className={classNames(
          "mt-3 gap-2",
          isFilterOpen ? "flex flex-column flex-wrap" : "flex flex-row flex-wrap justify-between"
        )}
      >
        <div className={classNames(isFilterOpen ? "w-full" : "w-auto")}>
          <SearchFilter {...props} onToggle={handleToggle} />
        </div>
        <div className={classNames("flex flex-row justify-end max-h-fit", isFilterOpen ? "w-full mt-2" : "w-auto")}>
          <PrimaryButton size="sm" label="検索" onClick={handleClick} />
        </div>
      </div>
    </>
  );
};
