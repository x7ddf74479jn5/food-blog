import type { TArticle, TRankedArticle } from "@/types";

import { mockCategories } from "./categories";
import { mockTags } from "./tags";
import { dateCommon } from "./utils";
import { mockWriters } from "./writers";

const articleStock = {
  id: "p97vmuno3jdn",
  title: "基本の一番だしの作り方",
  writer: mockWriters.pandashark,
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
  category: mockCategories.rice,
  tags: [mockTags.preparation, mockTags.misoSoup, mockTags.udon],
  imageOption: null,
};

const articleTomatoSalad = {
  id: "mm8oec5icb",
  title: "新玉ねぎとトマトのシンプルサラダの作り方",
  writer: mockWriters.pandashark,
  description:
    "スライストマトに、たっぷりのサラダ玉ねぎと大葉を乗せ、オリーブオイル、ポン酢、醤油、にんにくで作った特製ドレッシングをかけるだけの簡単・極旨サラダです。",
  image: { url: "/images/2996666_s.jpg", height: 427, width: 640 },
  excerpt: "",
  body: `**分量： 2人分**

スライストマトに、たっぷりのサラダ玉ねぎと大葉を乗せ、オリーブオイル、ポン酢、醤油、にんにくで作った特製ドレッシングをかけるだけの簡単・極旨サラダです。

## 材料
- トマト：１個、スライス
- サラダ玉ねぎ：1/2個、みじん切り
- 大葉：適量、みじん切り
- プチマリン：適量
- オリーブオイル：大さじ1.5
- ポン酢：大さじ1/2
- 醤油：大さじ1/2
- にんにくチューブ：小さじ1/2

## 作り方
- みじん切りにしたサラダ玉ねぎとドレッシングの材料を混ぜ合わせます。
- スライスしたトマトにサラ玉ドレッシングをかけます。
- みじん切りにした大葉とプチマリンを乗せて完成！`,
  category: mockCategories.salad,
  tags: [mockTags.tomato, mockTags.onion, mockTags.ooba],
  imageOption: null,
};

const articleOhitashi = {
  id: "3y-w7i75kmd",
  title: "栄養たっぷり小松菜と油揚げのおひたしの作り方",
  writer: mockWriters.pandashark,
  description:
    "小松菜と油揚げのおひたしは、茹でた子大豆もやしと焼いた油揚げを混ぜた、栄養たっぷりの料理です。かつおぶしを乗せ、オリーブオイル、レモン果汁、醤油をかけてお召し上がりください。前菜やビールのおつまみにピッタリです♪",
  image: { url: "/images/4966941_s.jpg", height: 427, width: 640 },
  excerpt: "",
  body: `**分量： 2人分**

小松菜と油揚げのおひたしは、茹でた小松菜と焼いた油揚げを混ぜた、栄養たっぷりの料理です。かつおぶしを乗せ、オリーブオイル、レモン果汁、醤油をかけてお召し上がりください。前菜やビールのおつまみにピッタリです♪

## 材料
- 小松菜：100 g
- 油揚げ：50 g
-  かつおぶし；適量
- オリーブオイル：適量
- レモン果汁：適量
- だし醤油 or 醤油：適量

## 作り方
- 小松菜を多めのお湯で2分茹でます。
- 厚めの油揚げを使用するので、まずは３０秒電子レンジで温めます。
- 温めた油揚げを、フライパンで焼き色がつくまで焼きます。
- 焼いた油揚げを 1 cm 間隔の厚さに切ります。
- 切った油揚げと茹でた小松菜を軽く混ぜてお皿に盛り付けます。
- かつおぶしを乗せれば完成！
- オリーブオイル、レモン果汁、醤油をかけてお召し上がりください♪`,
  category: mockCategories.salad,
  tags: [mockTags.aburaage, mockTags.komatsuna],
  imageOption: null,
};

const articleTacoRice = {
  id: "q_y-lyvhew",
  title: "熊本県産玉ねぎを使った絶品タコライスの作り方",
  writer: mockWriters.pandashark,
  description:
    "タコライスは沖縄県の料理ですが、今では日本のどこのご家庭でも食されるようになりました。この「絶品タコライス」は、熊本県産の完全無農薬サラダ玉ねぎを使用しており、この玉ねぎの甘さとタコライスに入ったチリパウダーの辛さが口の中で絶妙にマッチします。ご飯ものだけどビールとの相性は抜群！子供たちも大好きな料理です♪",
  image: { url: "/images/3129120_s.jpg", height: 427, width: 640 },
  excerpt: "",
  body: `**分量： 2人分**

タコライスは沖縄県の料理ですが、今では日本のどこのご家庭でも食されるようになりました。この「絶品タコライス」は、熊本県産の完全無農薬サラダ玉ねぎを使用しており、この玉ねぎの甘さとタコライスに入ったチリパウダーの辛さが口の中で絶妙にマッチします。ご飯ものだけどビールとの相性は抜群！子供たちも大好きな料理です♪

## 材料
- ごはん（炊いた米）：200g
- 合い挽き肉：150g
- サラダ玉ねぎ（小玉）：1/2個
- ニンニク：1/2片
- レタス：葉３枚
- ミニトマト：８個
- シュレッドチーズ：適量
- 米油：小さじ１
- チリパウダー：小さじ１
- 酒：大さじ１
- 醤油：大さじ１
- ケチャップ：大さじ１
- 中濃ソース：大さじ１
- 塩：少々
- コショウ：少々

## 作り方
- レタスを細切りにします。
- ミニトマトを、好きな形に切ります。
- サラダ玉ねぎをみじん切りにします。
- ニンニクをみじん切りにします。
- 熱したフライパンに米油を入れ、ニンニクを20秒炒めます。
- フライパンに合い挽き肉を投入し、火が通ったら玉ねぎを加えて、さらに20秒炒めます。
- チリパウダーを加えて混ぜ合わせます。
- 酒、醤油、ケチャップ、中濃ソース、塩、コショウを入れ、汁気がなくなるまで炒めます。
- お皿にごはんを盛り、レタス・挽き肉・チーズの順に乗せ、ミニトマトを周りに飾り付けます。

## ポイント
ひき肉を炒める際、汁気がなくなるまで炒めることで、肉にしっかり味が染み込みます。`,
  category: mockCategories.rice,
  tags: [mockTags.rice, mockTags.mincedMeat, mockTags.lettuce, mockTags.onion, mockTags.tomato],
  imageOption: null,
};

type TArticleCollection = {
  stock: TArticle;
  tomatoSalad: TArticle;
  ohitashi: TArticle;
  tacoRice: TArticle;
};

export const mockArticles: TArticleCollection = {
  stock: { ...dateCommon, ...articleStock },
  tomatoSalad: { ...dateCommon, ...articleTomatoSalad },
  ohitashi: { ...dateCommon, ...articleOhitashi },
  tacoRice: { ...dateCommon, ...articleTacoRice },
};

export const mockPopularArticles: TRankedArticle[] = Object.values(mockArticles).map((article, index) => ({
  ...article,
  order: ++index,
}));
