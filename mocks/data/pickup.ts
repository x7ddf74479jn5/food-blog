import { mockArticles } from "@mocks/data";
import { dateCommon } from "@mocks/data/utils";

export const mockPickup = {
  id: "1",
  name: "旬の食材を使ったおすすめレシピ",
  description: "旬の食材を使ったおすすめレシピ",
  startDate: new Date("2021/10/08 00:00"),
  endDate: new Date("2023/02/08 00:00"),
  articles: Object.values(mockArticles),
  ...dateCommon,
};
