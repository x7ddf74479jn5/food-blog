export const apiRoute = {
  apiArticles: "/api/articles",
  apiPreview: "/api/preview",
} as const;

export const urlTable = {
  articles: "/articles",
  categories: "/categories",
  home: "/",
  pickup: "/pickup",
  popular: "/popular",
  preview: "/preview",
  root: "/",
  search: "/search",
  tags: "/tags",
} as const;

export type UrlTableValue = typeof urlTable[keyof typeof urlTable];

const labelTable = {
  [urlTable.home]: "レシピ一覧へ",
  [urlTable.categories]: "カテゴリー別一覧へ",
  [urlTable.tags]: "タグ別一覧へ",
} as const;

type LabelTableKey = keyof typeof labelTable;

export const getBackLinks = (paths: LabelTableKey[]): { href: string; label: string }[] => {
  return paths.map((path) => {
    return { href: path, label: labelTable[path] };
  });
};
