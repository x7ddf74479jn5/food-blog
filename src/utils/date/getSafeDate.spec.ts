import getSafeDate from "./getSafeDate";

const mockDate = new Date(1594374371110);

jest.mock("./getNewDate", () => {
  const getNewDate = jest.fn().mockReturnValue(new Date(1594374371110));
  return { getNewDate };
});

describe("utils/date", () => {
  describe("getSafeDate", () => {
    test("OK: 渡した日付と同じ日付が変える", () => {
      expect(getSafeDate(new Date("2020-01-01"))).toStrictEqual(new Date("2020-01-01T00:00:00.000Z"));
    }),
      test("OK: 日付が不正の場合現在時間が返される", () => {
        expect(getSafeDate(undefined)).toStrictEqual(mockDate);
      });
  });
});
