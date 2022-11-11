import { mockArticles } from "@mocks/data";
import { expect, test } from "@playwright/test";

test("index", async ({ page }) => {
  // Go to staging URL
  await page.goto("https://localhost:3000");

  // Load all images in the page
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let i = 0; i < document.body.scrollHeight; i += 100) {
      window.scrollTo(0, i);
      await delay(100);
    }
  });
  await page.evaluate(() => window.scrollTo(0, 0));

  await expect(page).toHaveScreenshot({
    animations: "disabled",
    fullPage: true,
    scale: "device",
    threshold: 0.2,
    timeout: 20000,
  });
});

test("articles/:id", async ({ page }) => {
  const { stock } = mockArticles;
  // Go to staging URL
  await page.goto(`https://localhost:3000/articles/${stock.id}`);

  // Load all images in the page
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let i = 0; i < document.body.scrollHeight; i += 100) {
      window.scrollTo(0, i);
      await delay(100);
    }
  });
  await page.evaluate(() => window.scrollTo(0, 0));

  await expect(page).toHaveScreenshot({
    animations: "disabled",
    fullPage: true,
    scale: "device",
    threshold: 0.2,
    timeout: 20000,
  });
});
