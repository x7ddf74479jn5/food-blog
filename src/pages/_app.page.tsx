import "@/styles/global.css";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";

import { AppProviders } from "@/contexts";
import { GoogleAnalytics } from "@/lib/google-analytics";
import { notoSansJP } from "@/styles/font";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <GoogleAnalytics />
      <AppProviders>
        <div className={`${notoSansJP.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </AppProviders>
    </>
  );
};

export default App;
