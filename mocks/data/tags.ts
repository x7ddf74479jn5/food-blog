import type { TTag } from "@/types";

import { dateCommon } from "./utils";

type TTagCollection = {
  [key: string]: TTag;
};

export const mockTags: TTagCollection = {
  komatsuna: { ...dateCommon, id: "1", slug: "komatshna", name: "小松菜", color: "green" as const },
  mozzarella: { ...dateCommon, id: "2", slug: "mozzarella", name: "モッツァレラ", color: "pink" as const },
  lettuce: { ...dateCommon, id: "3", slug: "lettuce", name: "レタス", color: "green" as const },
  mincedMeat: { ...dateCommon, id: "4", slug: "minced_meat", name: "挽き肉", color: "red" as const },
  rice: { ...dateCommon, id: "5", slug: "rice", name: "ごはん", color: "yellow" as const },
  aburaage: { ...dateCommon, id: "6", slug: "aburaage", name: "油揚げ", color: "gray" as const },
  onion: { ...dateCommon, id: "7", slug: "onion", name: "玉ねぎ", color: "green" as const },
  udon: { ...dateCommon, id: "8", slug: "udon", name: "うどん", color: "yellow" as const },
  misoSoup: { ...dateCommon, id: "9", slug: "miso_soup", name: "味噌汁", color: "gray" as const },
  tomato: { ...dateCommon, id: "10", slug: "tomato", name: "トマト", color: "green" as const },
  preparation: { ...dateCommon, id: "11", slug: "preparation", name: "仕込み", color: "gray" as const },
  ooba: { ...dateCommon, id: "12", slug: "ooba", name: "大葉", color: "green" as const },
};
