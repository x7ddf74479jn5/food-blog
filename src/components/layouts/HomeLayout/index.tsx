import { AsideContainer } from "@/components/atoms/containers/AsideContainer";
import { MainContainer } from "@/components/atoms/containers/MainContainer";
import { ShareButtons } from "@/components/atoms/ShareButtons";
import { RootLayout } from "@/components/layouts/RootLayout";
import { CategoryMenu } from "@/components/molecules/CategoryMenu";
import { SlickArticles } from "@/components/organisms/SlickArticles/index";
import useWindowSize from "@/hooks/useWindowSize";
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
  const size = useWindowSize();
  const isMobile = size.width < 768;

  return (
    <RootLayout config={config}>
      <div className="px-0 md:px-16 mt-8 md:mt-16 mb-16">
        <SlickArticles pickup={pickup} />
      </div>
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
    </RootLayout>
  );
};

export default HomeLayout;
