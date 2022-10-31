import "@/styles/global.css";

import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";
import { ThemeProvider } from "next-themes";

import { SearchProvider } from "@/components/organisms/SearchArea/SearchContext";
import { GoogleAnalytics, usePageView } from "@/lib/google-analytics";

// FIXME: MSW is broken "ERR_UNSUPPORTED_DIR_IMPORT"
// if (process.env.NEXT_PUBLIC_MSW_ENABLED === "true") {
//   (async () => {
//     const { setupMSW } = await import("../../mocks/msw/worker");
//     setupMSW();
//     console.info("MSW is enabled");
//   })();
// }

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  usePageView();

  return (
    <html lang="ja">
      <head />
      <DefaultSeo {...SEO} />
      <GoogleAnalytics />
      <ThemeProvider attribute="class" enableSystem>
        <SearchProvider>
          <body
            className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
            style={{ overflowAnchor: "none" }}
          >
            {children}
          </body>
        </SearchProvider>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
