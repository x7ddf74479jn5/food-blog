import { memo } from "react";

import {
  AsideContainer,
  BottomAreaContainer,
  ContainerWithOrder,
  MiddleAreaContainer,
} from "@/components/atoms/containers";
import { HtmlHeadBase } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts";
import BackLinks from "@/components/molecules/BackLinks";
import { ShareButtons } from "@/components/molecules/ShareButtons";
import { PickupArticles, PopularArticles } from "@/components/organisms/article";
import type { TCategory, TConfig, TPickup, TRankedArticle } from "@/types";

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
    return (
      <RootLayout config={config} categories={categories}>
        <HtmlHeadBase indexUrl={host} pageTitle={title} url={url} />
        <div className="my-8">
          <h1>{heading}</h1>
        </div>
        <MiddleAreaContainer>
          <AsideContainer className="order-2 md:order-1 lg:w-full">
            <ShareButtons url={url} title={title} className="flex-row md:flex-col" />
          </AsideContainer>
          <main className="order-1 md:order-2">{children}</main>
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
