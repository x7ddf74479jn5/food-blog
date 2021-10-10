import type { TCategoryOrTagColor } from "@/types";

const colors = ["green", "yellow", "red", "pink", "blue", "purple", "indigo", "gray"];

export const isCategoryOrTagColor = (color: any): color is TCategoryOrTagColor => {
  return colors.includes(color);
};
