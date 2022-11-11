import { mockArticles } from "mocks/data";
import { dateCommon } from "mocks/data/utils";

export const mockPickup = {
  articles: Object.values(mockArticles),
  description: "旬の食材を使ったおすすめレシピ",
  endDate: new Date("2023/02/08 00:00"),
  id: "1",
  name: "旬の食材を使ったおすすめレシピ",
  startDate: new Date("2021/10/08 00:00"),
  ...dateCommon,
};
