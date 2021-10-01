type Table = {
  [key: string]: string;
};

export const UrlTable = {
  home: "/",
  root: "/",
  categories: "/categories",
  tags: "/tags",
};

const labelTable: Table = {
  "/": "レシピ一覧へ",
  "/categories": "カテゴリー別一覧へ",
  "/tags": "タグ別一覧へ",
};

export const getBackLinks = (paths: string[]): { href: string; label: string }[] => {
  return paths.map((path) => {
    return { href: path, label: labelTable[path] };
  });
};
