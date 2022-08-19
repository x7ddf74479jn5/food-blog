export type TCategoryOrTagColor = "green" | "blue" | "indigo" | "purple" | "red" | "yellow" | "pink" | "gray";

export type TImage = {
  url: string;
  width: number;
  height: number;
};

export type TImageOption = {
  fontColor: string;
};

export type ValueOf<T> = T[keyof T];

export type MappedConst<T extends string> = {
  [K in T]: K;
};

export type PagePropsOrError<T extends object> = (T & { error?: undefined }) | { error: { statusCode: number } };
