import { renderHook } from "@testing-library/react-hooks";

import { useMedia } from "./";

const breakpoints = {
  xs: { min: 0, max: 639 },
  sm: { min: 640, max: 767 },
  md: { min: 768, max: 1023 },
  lg: { min: 1024, max: 1279 },
  xl: { min: 1280, max: 1535 },
  "2xl": { min: 1536, max: 999999 },
};

type Size = keyof typeof breakpoints;
type MatchType = ">=" | "<=" | "=";

describe("hooks/useMedia", () => {
  afterAll(() => jest.restoreAllMocks());

  it("OK: getQueryの返り値が正しい", async () => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });

    const { result, rerender } = renderHook(
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
