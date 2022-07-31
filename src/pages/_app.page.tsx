import "@/styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import { SearchHistoryProvider } from "@/context/SearchHistoryContext";
import { GoogleAnalytics, usePageView } from "@/lib/gtag";

import SEO from "../../next-seo.config";

if (process.env.NEXT_PUBLIC_MSW_ENABLED === "true") {
  (async () => {
    await import("../../mocks/msw/worker");
    console.info("MSW is enabled");
  })();
}

const App = ({ Component, pageProps }: AppProps) => {
  usePageView();

  return (
    <div>
      <DefaultSeo {...SEO} />
      <GoogleAnalytics />
      <ThemeProvider attribute="class">
        <SearchHistoryProvider>
          <Component {...pageProps} />
        </SearchHistoryProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
