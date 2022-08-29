import { useSearchHistoryContext } from "@/context";

type SearchHistoryProps = {
  isActive: boolean;
  setQuery: (query: string) => void;
};
export const SearchHistory: React.FC<SearchHistoryProps> = ({ isActive, setQuery }) => {
  const { histories } = useSearchHistoryContext();
  const handleClick = (history: string) => {
    setQuery(history);
  };

  if (!isActive || !histories || histories.length === 0) return null;

  return (
    <ul className="fixed z-10 mt-1 mr-4 max-h-[50vh] overflow-y-auto rounded-md border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-600 dark:bg-gray-700">
      {histories.map((history) => (
        <li
          key={history}
          className="cursor-pointer py-2 px-4 text-left text-sm leading-5 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-green-500"
        >
          <button onClick={() => handleClick(history)}>{history}</button>
        </li>
      ))}
    </ul>
  );
};
