import { useGetSearchQueryParams } from "@/components/organisms/SearchArea/useSearch";

export const SearchedQueryOptions = () => {
  const { category, tags } = useGetSearchQueryParams();
  const formattedTags = tags?.split(",").join(" ");

  if (!category && !tags) return null;

  return (
    <div className="flex flex-col space-y-2">
      {category && <p className="text-sm text-gray-700 dark:text-gray-300">カテゴリー: {category}</p>}
      {tags && <p className="text-sm text-gray-700 dark:text-gray-300">タグ: {formattedTags}</p>}
    </div>
  );
};
