import dynamic from "next/dynamic";

import { AsideContainer } from "@/components/atoms/containers/AsideContainer";
import { MainContainer } from "@/components/atoms/containers/MainContainer";
import { MiddleAreaContainer } from "@/components/atoms/containers/MiddleAreaContainer";
import { RootLayout } from "@/components/layouts/RootLayout";
import { CategoryListSide } from "@/components/molecules/CategoryListSide";
import { SlickArticles } from "@/components/organisms/SlickArticles/index";
import { useMedia } from "@/hooks/useMedia";
import type { TCategory, TConfig, TPickup } from "@/types";

type Props = {
  children: React.ReactNode;
  pageTitle: string;
  config: TConfig;
  url: string;
  pickup: TPickup;
  categories: TCategory[];
};

const HomeLayout: React.FC<Props> = ({ pickup, url, pageTitle, children, config, categories }: Props) => {
  const isSmallOrDown = useMedia("<=", "sm");
  const ShareButtons = dynamic(() => import("@/components/atoms/ShareButtons"));

  return (
    <RootLayout config={config}>
      <div className="px-0 md:px-16 mt-8 md:mt-16">
        <SlickArticles pickup={pickup} />
      </div>
      <MiddleAreaContainer>
        <AsideContainer side="left">
          <ShareButtons url={url} title={pageTitle} direction={isSmallOrDown ? "row" : "column"} />
        </AsideContainer>
        <MainContainer>{children}</MainContainer>
        <AsideContainer side="right">
          <CategoryListSide categories={categories} columns="grid-cols-3 sm:grid-cols-5 md:grid-cols-1" />
        </AsideContainer>
      </MiddleAreaContainer>
    </RootLayout>
  );
};

export default HomeLayout;
