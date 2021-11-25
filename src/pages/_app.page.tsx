import "@/styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import { MDXProvider } from "@mdx-js/react";
import type { AppPropsWithLayout } from "next/app";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

// import MDXCustomComponents from "@/components/atoms/mdx";
import { SearchHistoryProvider } from "@/context/SearchHistoryContext";
import { GoogleAnalytics, usePageView } from "@/lib/gtag";

import SEO from "../../next-seo.config";

const App = ({ Component, pageProps }: AppPropsWithLayout): ReactNode => {
  usePageView();

  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <>
      <DefaultSeo {...SEO} />
      <GoogleAnalytics />
      <ThemeProvider attribute="class">
        <SearchHistoryProvider>
          <Component {...pageProps} />
        </SearchHistoryProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
