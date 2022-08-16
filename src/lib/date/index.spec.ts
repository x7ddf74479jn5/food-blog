import { formatJpYYYYMD, getSafeDate, isValidISODate } from "./date-fns";

describe("utils/date", () => {
  describe("formatJpYYYYMDD", () => {
    test("OK", () => {
      expect(formatJpYYYYMD(new Date("2020-01-01"))).toBe("2020年1月1日");
      expect(formatJpYYYYMD(new Date("2020-12-01"))).toBe("2020年12月1日");
    });
  });

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

  describe("isValid", () => {
    test("OK: 日付である", () => {
      expect(isValidISODate("2020-01-01")).toBeTruthy();
      expect(isValidISODate("2020-12-12")).toBeTruthy();
      expect(isValidISODate("2020-12-12T00:00")).toBeTruthy();
      expect(isValidISODate("2020-12-12T00:00:00")).toBeTruthy();
      expect(isValidISODate("2020-12-12T00:00:00Z")).toBeTruthy();
      expect(isValidISODate("2020-12-12T00:00:00+09:00")).toBeTruthy();
    });

    test("OK: これらも日付である", () => {
      expect(isValidISODate("2020")).toBeTruthy();
      expect(isValidISODate("2020-10")).toBeTruthy();
      expect(isValidISODate("20201010")).toBeTruthy();
      expect(isValidISODate("99991212T000000+1234")).toBeTruthy();

      expect(isValidISODate("2020-W10-4")).toBeTruthy();
      expect(isValidISODate("2020W104")).toBeTruthy();
    });

    test("NG: 日付ではない", () => {
      expect(isValidISODate("")).toBeFalsy();
      expect(isValidISODate("InvalidDateString")).toBeFalsy();
      expect(isValidISODate("1A2B-C-D")).toBeFalsy();

      expect(isValidISODate("1900-2-3")).toBeFalsy();
      expect(isValidISODate("2020/12/12")).toBeFalsy();
      expect(isValidISODate("2020--1T12:12")).toBeFalsy();
    });

    test("OK: 日付形式だが正しくない", () => {
      expect(isValidISODate("2020-15-12")).toBeFalsy();
      expect(isValidISODate("2020-12-99T00:00")).toBeFalsy();
      expect(isValidISODate("2020-12-12T99:00")).toBeFalsy();
      expect(isValidISODate("2020-12-12T00:00:00:00")).toBeFalsy();
    });
  });
});
