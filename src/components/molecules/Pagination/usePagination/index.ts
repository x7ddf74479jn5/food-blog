import type React from "react";
import { useCallback, useEffect, useState } from "react";

type Argument = {
  root?: React.RefObject<HTMLElement> | null;
  onIntersect: VoidFunction;
  threshold?: number | number[];
  rootMargin?: string;
  enabled?: boolean;
};

type Response = {
  loadMoreRef: (node: Element) => void;
};

const usePagination = ({
  root = null,
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px",
  enabled = true,
}: Argument): Response => {
  const [target, setTarget] = useState<Element | null>(null);

  const loadMoreRef = useCallback((node: Element) => {
    if (node !== null) {
      setTarget(node);
    }
  }, []);

  const newIntersectionObserver = useCallback(
    () =>
      new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && onIntersect()), {
        root: root && root.current,
        rootMargin,
        threshold,
      }),
    [root, onIntersect, threshold, rootMargin]
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const el = target;

    if (!el) {
      return;
    }
    const observer = newIntersectionObserver();

    observer.observe(el);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.unobserve(el);
    };
  }, [enabled, target, newIntersectionObserver]);

  return { loadMoreRef };
};

export default usePagination;
