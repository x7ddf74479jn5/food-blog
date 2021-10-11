import dynamic from "next/dynamic";

import Meta from "@/components/molecules/Meta";
import Header from "@/components/organisms/Header";
import type { TConfig } from "@/types";

import { LayoutErrorBoundary } from "../LayoutErrorBoundary";

type RootLayoutProps = {
  config: TConfig;
  children: React.ReactNode;
};

export const RootLayout: React.FC<RootLayoutProps> = ({ config, children }) => {
  const Footer = dynamic(() => import("@/components/organisms/Footer"));
  const { siteTitle, organization } = config;
  return (
    <>
      <Meta />
      <div className="flex flex-col px-4 mx-auto mb-16 max-w-screen-lg min-h-screen">
        <Header siteTitle={siteTitle} />
        <div className="grid flex-1 justify-center">
          <LayoutErrorBoundary>{children}</LayoutErrorBoundary>
        </div>
        <Footer siteTitle={siteTitle} organization={organization} />
      </div>
    </>
  );
};
