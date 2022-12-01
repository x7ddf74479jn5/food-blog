import { CategoryListSideView } from "@/components/model/category/CategoryListSide/CategoryListSideView";
import { getCategories } from "@/services/category";

type Props = {
  columns: string;
};

export const CategoryListSide = async ({ columns }: Props) => {
  const categories = await getCategories();

  return <CategoryListSideView categories={categories} columns={columns} />;
};
