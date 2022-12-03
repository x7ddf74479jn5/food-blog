import { useSearchState } from "@/components/organisms/SearchArea/SearchContext";

export const SearchedQueryOptions = () => {
  const { selectedCategory, selectedTags } = useSearchState();
  const tags = selectedTags.map((tag) => tag.name).join(" ");

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm text-gray-700 dark:text-gray-300">カテゴリー: {selectedCategory.name}</p>
      {tags && <p className="text-sm text-gray-700 dark:text-gray-300">タグ: {tags}</p>}
    </div>
  );
};
