import dynamic from "next/dynamic";
import { memo } from "react";

import { AsideContainer } from "@/components/atoms/containers/AsideContainer";
import { BottomAreaContainer } from "@/components/atoms/containers/BottomAreaContainer";
import { ContainerWithOrder } from "@/components/atoms/containers/ContainerWithOrder";
import { MiddleAreaContainer } from "@/components/atoms/containers/MiddleAreaContainer";
import { HtmlHeadBase } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts/RootLayout";
import BackLinks from "@/components/molecules/BackLinks";
import { PickupArticles } from "@/components/organisms/PickupArticles/index";
import { PopularArticles } from "@/components/organisms/PopularArticles";
import { useMedia } from "@/hooks/useMedia/index";
import type { TCategory, TConfig, TPickup, TRankedArticle } from "@/types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ShareButtons = dynamic(() => import("@/components/atoms/ShareButtons").then((mod) => mod.ShareButtons), {
  ssr: false,
});

type TwoColumnLayoutProps = {
  children: React.ReactNode;
  config: TConfig;
  pickup: TPickup;
  host: string;
  url: string;
  title: string;
  heading: string;
  backLinks: Array<{
    href: string;
    label: string;
  }>;
  categories: TCategory[];
  popularArticles: TRankedArticle[];
};

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = memo(
  ({ children, config, pickup, host, title, heading, url, backLinks, categories, popularArticles }) => {
    const isSmallOrDown = useMedia("<=", "sm");

    return (
      <RootLayout config={config} categories={categories}>
        <HtmlHeadBase indexUrl={host} pageTitle={title} url={url} />
        <div className="my-8">
          <h1>{heading}</h1>
        </div>
        <MiddleAreaContainer>
          <AsideContainer className="lg:w-full" side="left">
            <ShareButtons url={url} title={title} direction={isSmallOrDown ? "row" : "column"} />
          </AsideContainer>
          <main>{children}</main>
        </MiddleAreaContainer>
        <BottomAreaContainer>
          <ContainerWithOrder order="order-1 lg:order-2" className="grow">
            <PickupArticles pickupArticles={pickup.articles} />
            <PopularArticles popularArticles={popularArticles} />
          </ContainerWithOrder>
          <ContainerWithOrder order="order-2 lg:order-1" className="shrink">
            <BackLinks links={backLinks} />
          </ContainerWithOrder>
        </BottomAreaContainer>
      </RootLayout>
    );
  }
);

TwoColumnLayout.displayName = "TwoColumnLayout";
