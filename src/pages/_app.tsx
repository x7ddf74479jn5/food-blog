import "@/styles/global.css";

import { MDXProvider } from "@mdx-js/react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";

import MDXCustomComponents from "@/components/mdx/MDXCustomComponents";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout): ReactNode => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <DefaultSeo>
      <ThemeProvider attribute="class">
        <MDXProvider components={MDXCustomComponents}>
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </DefaultSeo>
  );
};

export default App;
