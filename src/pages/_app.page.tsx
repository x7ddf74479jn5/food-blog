import "@/styles/global.css";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";
import { ThemeProvider } from "next-themes";

import { SearchProvider } from "@/components/organisms/SearchArea/SearchContext";
import { GoogleAnalytics } from "@/lib/google-analytics";

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
    <div>
      <DefaultSeo {...SEO} />
      <GoogleAnalytics />
      <ThemeProvider attribute="class" enableSystem>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
