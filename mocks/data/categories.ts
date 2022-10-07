import { dateCommon } from "@mocks/data/utils";

import type { TCategory } from "@/types";

type TMockCategoryKey = "rice" | "salad" | "tips";

type TCategoryCollection = {
  [P in TMockCategoryKey]: TCategory;
};

const imageCommon = { height: 100, width: 6100, blurDataURL: "blurDataURL" };

export const mockCategories: TCategoryCollection = {
  rice: {
    ...dateCommon,
    id: "1",
    slug: "rice",
    name: "ご飯物",
    color: "gray" as const,
    image: { url: "/3129120_s.jpg", ...imageCommon },
  },
  salad: {
    ...dateCommon,
    id: "2",
    slug: "salad",
    name: "サラダ",
    color: "gray" as const,
    image: { url: "/2996666_s.jpg", ...imageCommon },
  },
  tips: {
    ...dateCommon,
    id: "3",
    slug: "tips",
    name: "料理基礎",
    color: "gray" as const,
    image: { url: "/5026416_s.jpg", ...imageCommon },
  },
};
