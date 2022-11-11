import type { MicroCMSListContent } from "microcms-js-sdk";

import type { TTag } from "@/types";

import { dateCommon } from "./utils";

type TMockTagKey =
  | "komatsuna"
  | "mozzarella"
  | "lettuce"
  | "mincedMeat"
  | "rice"
  | "aburaage"
  | "onion"
  | "udon"
  | "misoSoup"
  | "tomato"
  | "preparation"
  | "ooba";

type TTagCollection = {
  [P in TMockTagKey]: TTag & MicroCMSListContent;
};

export const mockTags: TTagCollection = {
  aburaage: { ...dateCommon, color: "gray" as const, id: "6", name: "油揚げ", slug: "aburaage" },
  komatsuna: { ...dateCommon, color: "green" as const, id: "1", name: "小松菜", slug: "komatshna" },
  lettuce: { ...dateCommon, color: "green" as const, id: "3", name: "レタス", slug: "lettuce" },
  mincedMeat: { ...dateCommon, color: "red" as const, id: "4", name: "挽き肉", slug: "minced_meat" },
  misoSoup: { ...dateCommon, color: "gray" as const, id: "9", name: "味噌汁", slug: "miso_soup" },
  mozzarella: { ...dateCommon, color: "pink" as const, id: "2", name: "モッツァレラ", slug: "mozzarella" },
  onion: { ...dateCommon, color: "green" as const, id: "7", name: "玉ねぎ", slug: "onion" },
  ooba: { ...dateCommon, color: "green" as const, id: "12", name: "大葉", slug: "ooba" },
  preparation: { ...dateCommon, color: "gray" as const, id: "11", name: "仕込み", slug: "preparation" },
  rice: { ...dateCommon, color: "yellow" as const, id: "5", name: "ごはん", slug: "rice" },
  tomato: { ...dateCommon, color: "green" as const, id: "10", name: "トマト", slug: "tomato" },
  udon: { ...dateCommon, color: "yellow" as const, id: "8", name: "うどん", slug: "udon" },
};
