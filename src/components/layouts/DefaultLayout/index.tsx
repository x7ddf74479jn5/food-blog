import dynamic from "next/dynamic";

import { AsideContainer } from "@/components/atoms/containers/AsideContainer";
import { MainContainer } from "@/components/atoms/containers/MainContainer";
import { ShareButtons } from "@/components/atoms/ShareButtons";
import { RootLayout } from "@/components/layouts/RootLayout";
import { CategoryMenu } from "@/components/organisms/CategoryMenu";
import useWindowSize from "@/hooks/useWindowSize";
import type { TCategory, TConfig } from "@/types";

type Props = {
  children: React.ReactNode;
  pageTitle: string;
  config: TConfig;
  url: string;
  backLinks: Array<{
    href: string;
    label: string;
  }>;
  categories: TCategory[];
};

const DefaultLayout: React.FC<Props> = ({ url, pageTitle, children, config, backLinks, categories }: Props) => {
  const BackLinks = dynamic(() => import("@/components/molecules/BackLinks"));
  const size = useWindowSize();
  const isMobile = size.width < 768;
  return (
    <RootLayout config={config}>
      <div className="flex flex-col md:flex-row gap-4 md:gap-16 justify-center items-center md:items-stretch mb-16">
        <AsideContainer side="left">
          <ShareButtons
            url={url}
            title={pageTitle}
            twitterId={config.twitterId}
            direction={isMobile ? "row" : "column"}
          />
        </AsideContainer>
        <MainContainer>{children}</MainContainer>
        <AsideContainer side="right">
          <CategoryMenu categories={categories} columns="grid-cols-3 sm:grid-cols-5 md:grid-cols-1" />
        </AsideContainer>
      </div>
      <div className="mt-8 mb-16">
        <BackLinks links={backLinks} />
      </div>
    </RootLayout>
  );
};

export default DefaultLayout;
