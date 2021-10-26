export type TDateCommon = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type TCategoryOrTagColor = "green" | "blue" | "indigo" | "purple" | "red" | "yellow" | "pink" | "gray";

export type TImage = {
  url: string;
  width: number;
  height: number;
};

export type TImageOption = {
  fontColor: string;
};

export type TResources = "article" | "note";

export type TListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset?: number;
  limit?: number;
};

export type Obj<T = any> = Record<string, T>;
