import { getCategories } from "@/services/category";

import { CategoryListView } from "./CategoryListView";

type Props = {
  width: number;
  height: number;
};

export const CategoryList = async (props: Props) => {
  const categories = await getCategories();

  return <CategoryListView {...props} categories={categories} />;
};
