import { dateCommon } from "@mocks/data/utils";

import type { TCategory } from "@/types";

type TCategoryCollection = {
  [key: string]: TCategory;
};

export const categories: TCategoryCollection = {
  rice: { ...dateCommon, id: "1", slug: "rice", name: "ご飯物", color: "gray" as const },
  salad: { ...dateCommon, id: "2", slug: "salad", name: "サラダ", color: "gray" as const },
  tips: { ...dateCommon, id: "3", slug: "tips", name: "料理基礎", color: "gray" as const },
};
