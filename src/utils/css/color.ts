import type { TCategoryOrTagColor } from "@/types";

export const getBGColor = (color: TCategoryOrTagColor) => {
  return color === "blue"
    ? "bg-blue-700"
    : color === "green"
    ? "bg-green-700"
    : color === "pink"
    ? "bg-pink-700"
    : color === "purple"
    ? "bg-purple-700"
    : color === "red"
    ? "bg-red-700"
    : color === "yellow"
    ? "bg-yellow-700"
    : "bg-gray-500";
};

export const getBorderColor = (color: TCategoryOrTagColor) => {
  return color === "blue"
    ? "bg-blue-700 dark:border-blue-300"
    : color === "green"
    ? "bg-green-700 dark:border-green-300"
    : color === "pink"
    ? "bg-pink-700 dark:border-pink-300"
    : color === "purple"
    ? "bg-purple-700 dark:border-purple-300"
    : color === "red"
    ? "bg-red-700 dark:border-red-300"
    : color === "yellow"
    ? "bg-yellow-700 dark:border-yellow-300"
    : "bg-gray-700 dark:border-gray-300";
};
