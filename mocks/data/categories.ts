import { dateCommon } from "@mocks/data/utils";

import type { TCategory } from "@/types";

type TCategoryCollection = {
  [key: string]: TCategory;
};

export const mockCategories: TCategoryCollection = {
  rice: {
    ...dateCommon,
    id: "1",
    slug: "rice",
    name: "ご飯物",
    color: "gray" as const,
    image: { url: "/images/3129120_s.jpg", width: 100, height: 100 },
  },
  salad: {
    ...dateCommon,
    id: "2",
    slug: "salad",
    name: "サラダ",
    color: "gray" as const,
    image: { url: "/images/2996666_s.jpg", width: 100, height: 100 },
  },
  tips: {
    ...dateCommon,
    id: "3",
    slug: "tips",
    name: "料理基礎",
    color: "gray" as const,
    image: { url: "/images/5026416_s.jpg", width: 100, height: 100 },
  },
};
