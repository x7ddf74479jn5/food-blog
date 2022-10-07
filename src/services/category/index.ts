import { fetchCategories, fetchCategory } from "@/repositories";
import type { TCategory } from "@/types";
import { generateImageBlurDataURL } from "@/utils/image";

export const makeCategoryWithPlaceholderImage = async (category: TCategory) => {
  const blurDataURL = await generateImageBlurDataURL(category.image.url);

  return { ...category, image: { ...category.image, blurDataURL } };
};

export const getCategory = async (id: string) => {
  const category = await fetchCategory(id);

  return await makeCategoryWithPlaceholderImage(category);
};

export const getCategories = async () => {
  const res = await fetchCategories();
  const categories: TCategory[] = await Promise.all(res.map(makeCategoryWithPlaceholderImage));

  return categories;
};
