import { ThemeProvider } from "next-themes";

import { SearchProvider } from "./search/SearchContext";
import { ViewportProvider } from "./viewport/ViewportContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <ViewportProvider>
        <SearchProvider>{children}</SearchProvider>
      </ViewportProvider>
    </ThemeProvider>
  );
};
