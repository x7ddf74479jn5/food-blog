import { AsideContainer } from "@/components/atoms/containers/AsideContainer";
import { BottomAreaContainer } from "@/components/atoms/containers/BottomAreaContainer";
import { ContainerWithOrder } from "@/components/atoms/containers/ContainerWithOrder";
import { MiddleAreaContainer } from "@/components/atoms/containers/MiddleAreaContainer";
import { ShareButtons } from "@/components/atoms/ShareButtons";
import { HeadingOne } from "@/components/atoms/texts/Heading";
import { HtmlHeadBase } from "@/components/functions/meta";
import { RootLayout } from "@/components/layouts/RootLayout";
import BackLinks from "@/components/molecules/BackLinks";
import { PickupArticles } from "@/components/organisms/PickupArticles/index";
import { useMedia } from "@/hooks/useMedia/index";
import type { TConfig, TPickup } from "@/types";

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
};

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  children,
  config,
  pickup,
  host,
  title,
  heading,
  url,
  backLinks,
}) => {
  const isSmallOrDown = useMedia("<=", "sm");

  return (
    <RootLayout config={config}>
      <HtmlHeadBase indexUrl={host} pageTitle={title} url={url} />
      <div className="my-8">
        <HeadingOne>{heading}</HeadingOne>
      </div>
      <MiddleAreaContainer>
        <AsideContainer className="lg:w-full" side="left">
          <ShareButtons url={url} title={title} direction={isSmallOrDown ? "row" : "column"} />
        </AsideContainer>
        <main className="grid order-1 md:order-2 grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2 mt-4 mb-12">
          {children}
        </main>
      </MiddleAreaContainer>
      <BottomAreaContainer>
        <ContainerWithOrder order="order-1 lg:order-2" className="flex-grow">
          <PickupArticles pickupArticles={pickup.articles} />
        </ContainerWithOrder>
        <ContainerWithOrder order="order-2 lg:order-1" className="flex-shrink">
          <BackLinks links={backLinks} />
        </ContainerWithOrder>
      </BottomAreaContainer>
    </RootLayout>
  );
};
