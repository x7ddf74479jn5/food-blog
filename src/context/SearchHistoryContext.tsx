import type { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

type ContextProps = {
  histories: Array<string>;
  setHistories: Dispatch<SetStateAction<Array<string>>>;
};

type Props = {
  children: ReactNode;
};

const SearchHistoryContext = createContext({} as ContextProps);

export const SearchHistoryProvider = ({ children }: Props): ReactElement => {
  const [histories, setHistories] = useState<Array<string>>([]);

  return (
    <SearchHistoryContext.Provider
      value={{
        histories,
        setHistories,
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistoryContext = (): ContextProps => {
  return useContext(SearchHistoryContext);
};
