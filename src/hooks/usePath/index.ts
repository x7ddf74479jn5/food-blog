import { usePathname } from "next/navigation";
import { useCallback } from "react";

export const usePath = () => {
  const pathname = usePathname();
  const matchPath = useCallback((path: string) => pathname === path, [pathname]);

  return { matchPath };
};
