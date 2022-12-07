import { combination, isSafeNumber } from ".";

describe("combination", () => {
  const array = [...Array(4)].map((_, i) => i);

  it.each`
    len  | expected
    ${2} | ${[[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]]}
    ${3} | ${[[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]}
  `("長さ4の配列かつ組み合わせの長さ$lenのとき$expected.lengthの組み合わせ", ({ expected, len }) => {
    const result = Array.from(combination(array, len));
    expect(result).toStrictEqual(expected);
  });
});

describe("isSafeNumber", () => {
  it.each`
    maybeNumber  | expected
    ${1}         | ${true}
    ${"1"}       | ${true}
    ${undefined} | ${false}
  `("$maybeNumberのとき$expected", ({ expected, maybeNumber }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const result = isSafeNumber(maybeNumber);
    expect(result).toBe(expected);
  });
});
