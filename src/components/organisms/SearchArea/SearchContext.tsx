import type { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import type { AllOrCategory, TTag } from "@/types";

type SearchState = {
  text: string;
  history: string[];
  selectedCategory: AllOrCategory;
  selectedTags: TTag[];
};

type SearchMutation = {
  setText: Dispatch<SetStateAction<string>>;
  setHistory: Dispatch<SetStateAction<Array<string>>>;
  setSelectedCategory: Dispatch<SetStateAction<AllOrCategory>>;
  setSelectedTags: Dispatch<SetStateAction<Array<TTag>>>;
};

const SearchContext = createContext<SearchState>({
  text: "",
  history: [],
  selectedCategory: { id: "all", name: "すべて" },
  selectedTags: [],
});

const SearchMutationContext = createContext<SearchMutation>({} as SearchMutation);

type Props = {
  children: ReactNode;
};

export const SearchProvider = ({ children }: Props): ReactElement => {
  const [text, setText] = useState<string>("");
  const [history, setHistory] = useState<Array<string>>([]);
  const [selectedCategory, setSelectedCategory] = useState<AllOrCategory>({
    id: "all",
    name: "すべて",
  });
  const [selectedTags, setSelectedTags] = useState<Array<TTag>>([]);

  return (
    <SearchContext.Provider
      value={{
        text,
        history,
        selectedCategory,
        selectedTags,
      }}
    >
      <SearchMutationContext.Provider
        value={{
          setText,
          setHistory,
          setSelectedCategory,
          setSelectedTags,
        }}
      >
        {children}
      </SearchMutationContext.Provider>
    </SearchContext.Provider>
  );
};

export const useSearchState = () => {
  return useContext(SearchContext);
};

export const useSearchMutation = () => {
  return useContext(SearchMutationContext);
};
