import { renderHook } from "@testing-library/react";

import { getQuery, useMedia } from "./useMedia";

const breakpoints = {
  "2xl": { max: 999999, min: 1536 },
  lg: { max: 1279, min: 1024 },
  md: { max: 1023, min: 768 },
  sm: { max: 767, min: 640 },
  xl: { max: 1535, min: 1280 },
  xs: { max: 639, min: 0 },
};

type Size = keyof typeof breakpoints;
type MatchType = ">=" | "<=" | "=";

describe("hooks/useMedia", () => {
  describe("getQuery", () => {
    it.each`
      matchType | size    | expected
      ${">="}   | ${"sm"} | ${`(min-width: ${breakpoints["sm"].min}px)`}
      ${"<="}   | ${"sm"} | ${`(max-width: ${breakpoints["sm"].max}px)`}
      ${"="}    | ${"sm"} | ${`(min-width: ${breakpoints["sm"].min}px) and (max-width: ${breakpoints["sm"].max}px)`}
    `("matchType:'$matchType', size:'$size'のとき$expected", ({ expected, matchType, size }) => {
      const result = getQuery(matchType, size);
      expect(result).toBe(expected);
    });
  });

  describe("useMedia", () => {
    afterAll(() => jest.restoreAllMocks());

    it("指定したメディアクエリにマッチする", async () => {
      window.matchMedia = jest.fn().mockImplementation((query) => {
        return {
          addEventListener: jest.fn(),
          addListener: jest.fn(),
          matches: query,
          media: query,
          onchange: null,
          removeEventListener: jest.fn(),
          removeListener: jest.fn(),
        };
      });

      const { result } = renderHook(
        ({ matchType, size }: { matchType: MatchType; size: Size }) => useMedia(matchType, size),
        { initialProps: { matchType: "<=", size: "sm" } }
      );
      const matchedQuery = `(max-width: ${breakpoints["sm"].max}px)`;
      // queryとwindow.matchMedia.matchesが一致するかで正誤判定
      expect(result.current).toStrictEqual(matchedQuery);
      expect(window.matchMedia).toBeCalledWith(matchedQuery);

      const unmatchedQuery = `(min-width: ${breakpoints["sm"].min}px)`;
      expect(result.current).not.toStrictEqual(unmatchedQuery);
      expect(window.matchMedia).not.toBeCalledWith(unmatchedQuery);
    });
  });
});
