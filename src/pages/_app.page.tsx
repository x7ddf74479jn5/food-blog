import "@/styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import { SearchHistoryProvider } from "@/context/SearchHistoryContext";
import { GoogleAnalytics, usePageView } from "@/lib/google-analytics";

import SEO from "../../next-seo.config";

// FIXME: MSW is broken "ERR_UNSUPPORTED_DIR_IMPORT"
// if (process.env.NEXT_PUBLIC_MSW_ENABLED === "true") {
//   (async () => {
//     const { setupMSW } = await import("../../mocks/msw/worker");
//     setupMSW();
//     console.info("MSW is enabled");
//   })();
// }

const App = ({ Component, pageProps }: AppProps) => {
  usePageView();

  return (
    <div>
      <DefaultSeo {...SEO} />
      <GoogleAnalytics />
      <ThemeProvider attribute="class" enableSystem>
        <SearchHistoryProvider>
          <Component {...pageProps} />
        </SearchHistoryProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
