import { renderHook } from "@testing-library/react";

import { useMedia } from "./";

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
  afterAll(() => jest.restoreAllMocks());

  it("OK: getQueryの返り値が正しい", async () => {
    window.matchMedia = jest.fn().mockReturnValue({
      addListener: jest.fn(),
      matches: true,
      removeListener: jest.fn(),
    });

    const { rerender, result } = renderHook(
      ({ matchType, size }: { matchType: MatchType; size: Size }) => useMedia(matchType, size),
      { initialProps: { matchType: "<=", size: "sm" } }
    );
    const query = `(max-width: ${breakpoints["sm"].max}px)`;
    expect(result.current).toBeTruthy();
    expect(window.matchMedia).toBeCalledWith(query);

    rerender({ matchType: ">=", size: "sm" });
    const query2 = `(min-width: ${breakpoints["sm"].min}px)`;
    expect(result.current).toBeTruthy();
    expect(window.matchMedia).toBeCalledWith(query2);

    rerender({ matchType: "=", size: "sm" });
    const query3 = `(min-width: ${breakpoints["sm"].min}px) and (max-width: ${breakpoints["sm"].max}px)`;
    expect(result.current).toBeTruthy();
    expect(window.matchMedia).toBeCalledWith(query3);
  });
});
