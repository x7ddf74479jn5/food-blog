import { memo } from "react";

import { LayoutErrorBoundary } from "@/components/functions/error";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import type { TCategory, TConfig, TTag } from "@/types";

type RootLayoutProps = {
  config: TConfig;
  categories: TCategory[];
  tags: TTag[];
  children: React.ReactNode;
};

export const RootLayout: React.FC<RootLayoutProps> = memo(({ categories, children, config, tags }) => {
  const { organization, siteTitle } = config;
  return (
    <div className="mx-auto mb-16 flex min-h-screen max-w-screen-xl flex-col px-4">
      <Header siteTitle={siteTitle} categories={categories} tags={tags} />
      <LayoutErrorBoundary>{children}</LayoutErrorBoundary>
      <Footer siteTitle={siteTitle} organization={organization} />
    </div>
  );
});

RootLayout.displayName = "RootLayout";
