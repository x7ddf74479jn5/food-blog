import { classNames } from "@/utils/css/classNames";
import { getBGColor, getBorderColor } from "@/utils/css/color";

describe("utils/css/classNames", () => {
  it.each`
    classes                  | expected
    ${["class1", "class2"]}  | ${"class1 class2"}
    ${["class1", undefined]} | ${"class1"}
  `("$classesのとき'$expected'", ({ classes, expected }) => {
    const result = classNames(...classes);
    expect(result).toStrictEqual(expected);
  });
});

describe.only("utils/css/color", () => {
  describe("getBGColor", () => {
    it.each`
      color        | expected
      ${"green"}   | ${"bg-green-700"}
      ${'""'}      | ${"bg-gray-500"}
      ${undefined} | ${"bg-gray-500"}
    `("$colorのとき'$expected'", ({ color, expected }) => {
      const result = getBGColor(color);
      expect(result).toStrictEqual(expected);
    });
  });

  describe("getBorderColor", () => {
    it.each`
      color        | expected
      ${"green"}   | ${"bg-green-700 dark:border-green-300"}
      ${'""'}      | ${"bg-gray-700 dark:border-gray-300"}
      ${undefined} | ${"bg-gray-700 dark:border-gray-300"}
    `("$colorのとき'$expected'", ({ color, expected }) => {
      const result = getBorderColor(color);
      expect(result).toStrictEqual(expected);
    });
  });
});
