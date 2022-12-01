import { useRouter } from "next/router";
import { useCallback } from "react";

export const usePath = () => {
  const { pathname } = useRouter();
  const matchPath = useCallback((path: string) => pathname === path, [pathname]);

  return { matchPath };
};
