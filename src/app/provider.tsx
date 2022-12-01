"use client";

import { ThemeProvider } from "next-themes";

import { SearchProvider } from "@/components/feature/SearchArea/SearchContext";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <SearchProvider>{children}</SearchProvider>
    </ThemeProvider>
  );
};
