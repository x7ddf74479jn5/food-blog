import { useEffect, useState } from "react";

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

/**
 * example:
 *
 * const isSmallOrDown = useMedia("(max-width: 767px)")
 * const isMedium = useMedia("(min-width: 768px) and (max-width: 1023px)")
 * const isLargeOrUp = useMedia("(min-width: 1024px)")
 */
export const useMediaQuery = (query: string) => {
  const [isMatch, setMatch] = useState(typeof window === "undefined" ? false : window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== isMatch) {
      setMatch(media.matches);
    }

    const listener = () => setMatch(media.matches);
    /**
     * addListener は非推奨だが、古いブラウザのために使用している。
     * 古いブラウザを切るなら window.addEventListener("resize", listener) が推奨。
     */
    media.addListener(listener);
    return () => media.removeListener(listener);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return isMatch;
};

const getQuery = (matchType: MatchType, size: Size) => {
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
