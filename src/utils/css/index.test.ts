import { classNames } from "@/utils/css/classNames";

describe("utils/css", () => {
  it.each`
    classes                  | expected
    ${["class1", "class2"]}  | ${"class1 class2"}
    ${["class1", undefined]} | ${"class1"}
  `("$classesのとき'$expected'", ({ classes, expected }) => {
    const result = classNames(...classes);
    expect(result).toStrictEqual(expected);
  });
});
