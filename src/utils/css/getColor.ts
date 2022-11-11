import type { TCategoryOrTagColor } from "@/types";

const colors = ["green", "yellow", "red", "pink", "blue", "purple", "indigo", "gray"];

const isCategoryOrTagColor = (color: any): color is TCategoryOrTagColor => {
  return colors.includes(color);
};

const BGColors = {
  blue: "bg-blue-700",
  gray: "bg-gray-500",
  green: "bg-green-700",
  indigo: "bg-indigo-700",
  pink: "bg-pink-700",
  purple: "bg-purple-700",
  red: "bg-red-700",
  yellow: "bg-yellow-700",
};

const borderColors = {
  blue: "border-blue-700",
  gray: "border-gray-700",
  green: "border-green-700",
  indigo: "border-indigo-700",
  pink: "border-pink-700",
  purple: "border-purple-700",
  red: "border-red-700",
  yellow: "border-yellow-700",
};

const borderColorsDark = {
  blue: "dark:border-blue-300",
  gray: "dark:border-gray-300",
  green: "dark:border-green-300",
  indigo: "dark:border-indigo-300",
  pink: "dark:border-pink-300",
  purple: "dark:border-purple-300",
  red: "dark:border-red-300",
  yellow: "dark:border-yellow-300",
};

export const getBGColor = (color: any): string => {
  const _color = isCategoryOrTagColor(color) ? color : "gray";
  return BGColors[_color];
};

export const getBorderColor = (color: any): string => {
  const _color = isCategoryOrTagColor(color) ? color : "gray";
  return borderColors[_color] + " " + borderColorsDark[_color];
};
