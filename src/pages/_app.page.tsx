import "@/styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MDXProvider } from "@mdx-js/react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";

import MDXCustomComponents from "@/components/atoms/mdx";
import { usePageView } from "@/lib/gtag";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout): ReactNode => {
  usePageView();

  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <ThemeProvider attribute="class">
      <MDXProvider components={MDXCustomComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
};

export default App;
