import getSafeDate from "./getSafeDate";

describe("utils/date", () => {
  describe("getSafeDate", () => {
    test("OK: 渡した日付と同じ日付が変える", () => {
      expect(getSafeDate(new Date("2020-01-01"))).toStrictEqual(new Date("2020-01-01T00:00:00.000Z"));
    }),
      test("OK: 日付が不正の場合現在時間が返される", () => {
        const mockDate = new Date(2021, 1, 2, 2, 2, 2);
        jest.spyOn(global, "Date").mockImplementation(() => mockDate as unknown as string);
        expect(getSafeDate(undefined)).toStrictEqual(mockDate);
      });
  });
});
