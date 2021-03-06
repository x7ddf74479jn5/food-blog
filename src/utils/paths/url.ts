export const apiRoute = {
  apiPreview: "/api/preview",
  apiArticles: "/api/articles",
} as const;

export const urlTable = {
  home: "/",
  root: "/",
  articles: "/articles",
  categories: "/articles/categories",
  tags: "/articles/tags",
  pickup: "/articles/pickup",
  popular: "/articles/popular",
  preview: "/preview",
  search: "/search",
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
