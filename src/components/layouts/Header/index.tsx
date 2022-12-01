import { fetchTags } from "@/repositories";
import { getCategories } from "@/services/category";

import { HeaderView } from "./HeaderView";

export const Header = async () => {
  const [categories, tags] = await Promise.all([getCategories(), fetchTags()]);

  return <HeaderView categories={categories} tags={tags} />;
};
