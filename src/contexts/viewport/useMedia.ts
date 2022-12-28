import { useCallback, useMemo, useSyncExternalStore } from "react";

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

/**
 * example:
 *
 * const isSmallOrDown = useMedia("(max-width: 767px)")
 * const isMedium = useMedia("(min-width: 768px) and (max-width: 1023px)")
 * const isLargeOrUp = useMedia("(min-width: 1024px)")
 */
export const useMediaQuery = (query: string) => {
  const matchMediaList = useMemo(() => (typeof window === "undefined" ? undefined : window.matchMedia(query)), [query]);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      matchMediaList?.addEventListener("change", onStoreChange);
      return () => matchMediaList?.removeEventListener("change", onStoreChange);
    },
    [matchMediaList]
  );

  return useSyncExternalStore(
    subscribe,
    () => matchMediaList?.matches ?? false,
    () => false
  );
};

export const getQuery = (matchType: MatchType, size: Size) => {
  if (matchType === ">=") {
    return `(min-width: ${breakpoints[size].min}px)`;
  } else if (matchType === "<=") {
    return `(max-width: ${breakpoints[size].max}px)`;
  } else {
    return `(min-width: ${breakpoints[size].min}px) and (max-width: ${breakpoints[size].max}px)`;
  }
};

/**
 * example:
 *
 * const isSmallOrDown = useMedia("<=", "sm") // (max-width: 767px)
 * const isMedium = useMedia("=", "md") // (min-width: 768px) and (max-width: 1023px)
 * const isLargeOrUp = useMedia(">=", "lg") // (min-width: 1024px)
 */
export const useMedia = (matchType: MatchType, size: Size) => {
  return useMediaQuery(getQuery(matchType, size));
};
