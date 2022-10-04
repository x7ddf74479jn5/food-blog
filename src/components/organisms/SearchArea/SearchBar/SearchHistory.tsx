import { Listbox } from "@headlessui/react";
import { memo, useEffect, useRef } from "react";

import { DropdownTransition } from "@/components/atoms/transition/DropdownTransition";

import { useSearchMutation, useSearchState } from "../SearchContext";

type SearchHistoryProps = {
  show: boolean;
  onClose: () => void;
};
export const SearchHistory: React.FC<SearchHistoryProps> = memo(({ show, onClose }) => {
  const { history } = useSearchState();
  const { setText } = useSearchMutation();

  const handleClick = (history: string) => {
    setText(history);
  };

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (show) {
      ref?.current?.click();
    }
  }, [show]);

  if (!show || !history || history.length === 0) return null;

  return (
    <Listbox onChange={handleClick}>
      <Listbox.Button ref={ref} className="sr-only">
        検索履歴
      </Listbox.Button>
      <DropdownTransition afterLeave={onClose}>
        <Listbox.Options
          static
          className="fixed z-10 mt-1 mr-4 max-h-[50vh] overflow-y-auto rounded-md border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-600 dark:bg-gray-700"
        >
          {history.map((history) => (
            <Listbox.Option
              key={history}
              value={history}
              className={({ active }) =>
                `cursor-pointer py-2 px-4 text-left text-sm leading-5  dark:text-gray-100 ${
                  active ? "bg-gray-100 dark:bg-green-500" : "bg-white dark:bg-gray-700"
                } `
              }
            >
              {history}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </DropdownTransition>
    </Listbox>
  );
});

SearchHistory.displayName = "SearchHistory";
