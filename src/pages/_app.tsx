import "@/styles/global.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { SearchProvider } from "@/components/feature/SearchArea/SearchContext";

// FIXME: MSW is broken "ERR_UNSUPPORTED_DIR_IMPORT"
// if (process.env.NEXT_PUBLIC_MSW_ENABLED === "true") {
//   (async () => {
//     const { setupMSW } = await import("../../mocks/msw/worker");
//     setupMSW();
//     console.info("MSW is enabled");
//   })();
// }

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </ThemeProvider>
  );
};

export default App;
