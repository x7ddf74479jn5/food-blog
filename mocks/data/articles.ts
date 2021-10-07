import type { TArticle } from "@/types";

import { categories } from "./categories";
import { tags } from "./tags";
import { dateCommon } from "./utils";
import { writers } from "./writers";

const articleStock = {
  id: "1",
  title: "基本の一番だしの作り方",
  writer: writers.pandashark,
  description:
    "だし昆布と鰹節（削り節）から取った出汁は、味噌汁、そば、うどん、煮物、鍋料理など、多くの和食に使用できます。",
  image: { url: "/images/5026416_s.jpg", height: 427, width: 640 },
  excerpt:
    "だし昆布と鰹節（削り節）から取った出汁は、味噌汁、そば、うどん、煮物、鍋料理など、多くの和食に使用できます。",
  body: `**分量： 800ml**

だし昆布と鰹節（削り節）から取った出汁は、味噌汁、そば、うどん、煮物、鍋料理など、多くの和食に使用できます。

## 材料
- 水：1000ml
- だし昆布：10g
- かつお削り節：40g

## 作り方
- 固く絞った布巾で、昆布の表面の汚れを軽く拭き取ります。
- 鍋に水と昆布を入れます。
- 弱火で７分ほど熱し、鍋底から小さい泡が出てきたら昆布を取り出します。
- 昆布だしを一旦沸騰させてから、削り節を入れ、弱火で１分煮出します。
- ボウルの上にザルを置き、その上にキッチンペーパーを敷いて出汁を濾します。

---

**二番だしの取り方**
1. 鍋に 500ml の水を入れて沸騰させます。
2. 鍋に一番だしのだしがらを入れ、３分煮出します。
3. 一番だしと同じ方法で濾します。

---

## 保存方法
使わない分は保存容器に移して、冷蔵庫で保存してください。冷蔵保存で 2〜3 日は持ちます。

##  ポイント
だし昆布の表面の白い粉は「うま味」成分なので、取り除かずにそのままお使いください。`,
  category: categories.rice,
  tags: [tags.preparation, tags.misoSoup, tags.udon],
  imageOption: null,
};

type TArticleCollection = {
  [key: string]: TArticle;
};

export const articles: TArticleCollection = {
  stock: { ...dateCommon, ...articleStock },
};
