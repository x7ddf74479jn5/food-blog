import "@/styles/global.css";

import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { GoogleAnalytics } from "@/lib/google-analytics";

import { RootProvider } from "./provider";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <RootProvider>
        <body
          className="mx-auto mb-16 flex min-h-screen max-w-screen-xl flex-col bg-white px-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
          style={{ overflowAnchor: "none" }}
        >
          {/* @ts-expect-error Server Component */}
          <Header />
          {children}
          {/* @ts-expect-error Server Component */}
          <Footer />
        </body>
      </RootProvider>
      <GoogleAnalytics />
    </html>
  );
};

export default RootLayout;
