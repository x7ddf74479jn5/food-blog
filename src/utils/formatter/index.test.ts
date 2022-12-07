import { formatPageTitle, formatPageUrl } from "./formatPage";
import { getExcerpt } from "./getExcerpt";

describe("utils/formatter/formatPage", () => {
  it("formatPageTitle: カテゴリーページのTitleが整形できる", () => {
    const result = formatPageTitle("カテゴリー", "Food Blog");
    expect(result).toBe("カテゴリー | Food Blog");
  });

  it("formatPageUrl: カテゴリーページのURLが整形できる", () => {
    const result = formatPageUrl("/articles/categories", "http://localhost:3000");
    expect(result).toBe("http://localhost:3000/articles/categories");
  });
});

describe("utils/formatter/getExcerpt", () => {
  it("100文字以上のときtruncateされる", () => {
    const paragraph = `<p class="test" id='test'>ある朝、グレゴール・ザムザが気がかりな夢から目ざめたとき、自分がベッドの上で一匹の巨大な毒虫に変ってしまっているのに気づいた。彼は甲殻のように固い背中を下にして横たわり、頭を少し上げると、何本もの弓形のすじにわかれてこんもりと盛り上がっている自分の茶色の腹が見えた。腹の盛り上がりの上には、かけぶとんがすっかりずり落ちそうになって、まだやっともちこたえていた。ふだんの大きさに比べると情けないくらいかぼそいたくさんの足が自分の眼の前にしょんぼりと光っていた。</p>
    `;
    const expected = `ある朝、グレゴール・ザムザが気がかりな夢から目ざめたとき、自分がベッドの上で一匹の巨大な毒虫に変ってしまっているのに気づいた。彼は甲殻のように固い背中を下にして横たわり、頭を少し上げると、何本もの弓…`;
    const result = getExcerpt(paragraph);
    expect(result).toBe(expected);
  });

  it("99文字以下のとき元の文章のままである", () => {
    const paragraph = `<p class="test" id='test'>ある朝、グレゴール・ザムザが気がかりな夢から目ざめたとき、自分がベッドの上で一匹の巨大な毒虫に変ってしまっているのに気づいた。</p>`;
    const expected = `ある朝、グレゴール・ザムザが気がかりな夢から目ざめたとき、自分がベッドの上で一匹の巨大な毒虫に変ってしまっているのに気づいた。`;
    const result = getExcerpt(paragraph);
    expect(result).toBe(expected);
  });
});
