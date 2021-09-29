import { isCategoryOrTagColor } from "@/utils/validator";

const BGColors = {
  green: "bg-green-700",
  yellow: "bg-yellow-700",
  red: "bg-red-700",
  pink: "bg-pink-700",
  blue: "bg-blue-700",
  indigo: "bg-indigo-700",
  purple: "bg-purple-700",
  gray: "bg-gray-700",
};

const borderColors = {
  green: "border-green-700",
  yellow: "border-yellow-700",
  red: "border-red-700",
  pink: "border-pink-700",
  blue: "border-blue-700",
  indigo: "border-indigo-700",
  purple: "border-purple-700",
  gray: "border-gray-700",
};

const borderColorsDark = {
  green: "dark:border-green-300",
  yellow: "dark:border-yellow-300",
  red: "dark:border-red-300",
  pink: "dark:border-pink-300",
  blue: "dark:border-blue-300",
  indigo: "dark:border-indigo-300",
  purple: "dark:border-purple-300",
  gray: "dark:border-gray-300",
};

export const getBGColor = (color: any): string => {
  const _color = isCategoryOrTagColor(color) ? color : "gray";
  return BGColors[_color];
};

export const getBorderColor = (color: any): string => {
  const _color = isCategoryOrTagColor(color) ? color : "gray";
  return borderColors[_color] + " " + borderColorsDark[_color];
};
