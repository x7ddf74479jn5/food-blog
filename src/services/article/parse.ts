import "server-only";

import * as cheerio from "cheerio";

export const parseRecipeHtml = (src: string) => {
  const $ = cheerio.load(src);
  const ingredients = extractIngredients($);
  const instructions = extractInstructions($);
  return { ingredients, instructions };
};

const extractIngredients = ($: cheerio.CheerioAPI) => {
  const li = $("li", "#材料+ul").map((_i, el) => $(el).text());
  return Array.from(li);
};

const extractInstructions = ($: cheerio.CheerioAPI) => {
  const li = $("li", "#作り方+ul").map((_i, el) => $(el).text());
  return Array.from(li);
};

// @example
// const src = `
// <h2 id="材料">材料</h2>
// <ul>
// <li>レタス：葉３枚</li>
// <li>ミニトマト：８個</li>
// </ul>
// <h2 id="作り方">作り方</h2>
// <ul>
// <li>レタスを細切りにします。</li>
// <li>ミニトマトを、好きな形に切ります。</li>
// </ul>
// `
