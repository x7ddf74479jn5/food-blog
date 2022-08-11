import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

import { LayoutErrorBoundary } from "@/components/functions/error";
import Header from "@/components/organisms/Header";
import type { TCategory, TConfig } from "@/types";

type RootLayoutProps = {
  config: TConfig;
  categories: TCategory[];
  children: React.ReactNode;
};

export const RootLayout: React.FC<RootLayoutProps> = memo(({ config, categories, children }) => {
  const Footer = useMemo(() => dynamic(() => import("@/components/organisms/Footer")), []);
  const { siteTitle, organization } = config;
  return (
    <>
      <div className="mx-auto mb-16 flex min-h-screen max-w-screen-xl flex-col px-4">
        <Header siteTitle={siteTitle} categories={categories} />
        <LayoutErrorBoundary>{children}</LayoutErrorBoundary>
        <Footer siteTitle={siteTitle} organization={organization} />
      </div>
    </>
  );
});

RootLayout.displayName = "RootLayout";
