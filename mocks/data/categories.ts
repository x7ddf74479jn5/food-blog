import { dateCommon } from "@mocks/data/utils";

import type { TCategory } from "@/types";

type TMockCategoryKey = "rice" | "salad" | "tips";

type TCategoryCollection = {
  [P in TMockCategoryKey]: TCategory;
};

const imageCommon = { blurDataURL: "blurDataURL", height: 100, width: 6100 };

export const mockCategories: TCategoryCollection = {
  rice: {
    ...dateCommon,
    color: "gray" as const,
    id: "1",
    image: { url: "/3129120_s.jpg", ...imageCommon },
    name: "ご飯物",
    slug: "rice",
  },
  salad: {
    ...dateCommon,
    color: "gray" as const,
    id: "2",
    image: { url: "/2996666_s.jpg", ...imageCommon },
    name: "サラダ",
    slug: "salad",
  },
  tips: {
    ...dateCommon,
    color: "gray" as const,
    id: "3",
    image: { url: "/5026416_s.jpg", ...imageCommon },
    name: "料理基礎",
    slug: "tips",
  },
};
