import "@/styles/global.css";

import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";

import { GoogleAnalytics } from "@/lib/google-analytics";

import { RootProvider } from "./provider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <DefaultSeo {...SEO} />
        <GoogleAnalytics />
      </head>
      <RootProvider>
        <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100" style={{ overflowAnchor: "none" }}>
          {children}
        </body>
      </RootProvider>
    </html>
  );
};

export default RootLayout;
