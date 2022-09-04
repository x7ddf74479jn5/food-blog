import { expect, test } from "@playwright/test";

import { mockArticles, mockConfig } from "../../mocks/data";

const { stock } = mockArticles;

test("検索、検索結果表示、詳細ページ遷移", async ({ page, context }) => {
  // Go to staging URL
  await page.goto("https://food-blog-git-develop-x7ddf74479jn5.vercel.app/");
  // Detect the device viewport size and set the targe input
  const view = page.viewportSize();
  if (!view) throw Error();
  const isMobile = view.width < 767;
  const SearchArea = isMobile
    ? page.locator('[aria-label="search-area-mobile"]')
    : page.locator('[aria-label="search-area-pc"]');
  const SearchBox = SearchArea.locator("input");
  // Fill input
  await SearchBox.fill(stock.title);

  await Promise.all([
    SearchBox.press("Enter"),
    page.waitForNavigation(/*{ url: 'https://food-blog-git-develop-x7ddf74479jn5.vercel.app//search?q=基本の一番だしの作り方' }*/),
    context.waitForEvent("page"),
  ]);

  await expect(page.locator("h1")).toContainText(stock.title);
  await expect(page.locator("h2", { hasText: stock.title })).toBeDefined();

  // Wait for the page to load
  await page.locator("a", { hasText: stock.title }).first().waitFor();

  // Go to the article page
  await Promise.all([
    page.locator("a", { hasText: stock.title }).first().click(),
    page.waitForNavigation(/*{ url: 'https://food-blog-git-develop-x7ddf74479jn5.vercel.app//articles/p97vmuno3jdn' }*/),
  ]);

  await expect(page.locator("h1")).toHaveText(stock.title);
  await expect(page).toHaveURL(`https://food-blog-git-develop-x7ddf74479jn5.vercel.app/articles/${stock.id}`);
  await expect(page).toHaveTitle(`${stock.title} | ${mockConfig.siteTitle}`);
});
