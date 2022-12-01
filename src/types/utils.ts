export type TCategoryOrTagColor = "green" | "blue" | "indigo" | "purple" | "red" | "yellow" | "pink" | "gray";

export type TImage = {
  url: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export type TImageOption = {
  fontColor: string;
};

export type ValueOf<T> = T[keyof T];

export type MappedConst<T extends string> = {
  [K in T]: K;
};

export type PageMeta = {
  description: string;
  image: string;
  url: string;
  title: string;
};

export type PagePropsOrError<T extends object> =
  | (T & { error?: undefined })
  | { error: { statusCode: 404 | 500 | undefined } };
