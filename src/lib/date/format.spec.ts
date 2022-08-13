import { formatJpYYYYMD } from "./format";

describe("utils/date", () => {
  describe("formatJpYYYYMDD", () => {
    test("OK", () => {
      expect(formatJpYYYYMD(new Date("2020-01-01"))).toBe("2020年1月1日");
      expect(formatJpYYYYMD(new Date("2020-12-01"))).toBe("2020年12月1日");
    });
  });
});
