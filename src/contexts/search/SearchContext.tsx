import type { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import type { AllOrCategory, TTag } from "@/types";

export type SearchState = {
  text: string;
  history: string[];
  selectedCategory: AllOrCategory;
  selectedTags: TTag[];
};

export type SearchMutation = {
  setText: Dispatch<SetStateAction<string>>;
  setHistory: Dispatch<SetStateAction<Array<string>>>;
  setSelectedCategory: Dispatch<SetStateAction<AllOrCategory>>;
  setSelectedTags: Dispatch<SetStateAction<Array<TTag>>>;
};

export const defaultSearchState: SearchState = {
  history: [],
  selectedCategory: { id: "all", name: "すべて" },
  selectedTags: [],
  text: "",
};

const SearchContext = createContext<SearchState>(defaultSearchState);

const SearchMutationContext = createContext<SearchMutation>({} as SearchMutation);

export type SearchProviderInnerProps = {
  children: React.ReactNode;
  state: SearchState;
  mutation: SearchMutation;
};
export const SearchProviderInner = ({ children, mutation, state }: SearchProviderInnerProps) => {
  return (
    <SearchContext.Provider value={state}>
      <SearchMutationContext.Provider value={mutation}>{children}</SearchMutationContext.Provider>
    </SearchContext.Provider>
  );
};

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps): ReactElement => {
  const [text, setText] = useState<string>("");
  const [history, setHistory] = useState<Array<string>>([]);
  const [selectedCategory, setSelectedCategory] = useState<AllOrCategory>({
    id: "all",
    name: "すべて",
  });
  const [selectedTags, setSelectedTags] = useState<Array<TTag>>([]);

  return (
    <SearchProviderInner
      state={{ history, selectedCategory, selectedTags, text }}
      mutation={{ setHistory, setSelectedCategory, setSelectedTags, setText }}
    >
      {children}
    </SearchProviderInner>
  );
};

export const useSearchState = () => {
  return useContext(SearchContext);
};

export const useSearchMutation = () => {
  return useContext(SearchMutationContext);
};
