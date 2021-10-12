import dynamic from "next/dynamic";

import { ShareButtons } from "@/components/atoms/ShareButtons";
import { RootLayout } from "@/components/layouts/RootLayout";
import useWindowSize from "@/hooks/useWindowSize";
import type { TConfig } from "@/types";

type Props = {
  children: React.ReactNode;
  pageTitle: string;
  config: TConfig;
  url: string;
  backLinks: Array<{
    href: string;
    label: string;
  }>;
};

const DefaultLayout: React.FC<Props> = ({ url, pageTitle, children, config, backLinks }: Props) => {
  const BackLinks = dynamic(() => import("@/components/molecules/BackLinks"));
  const size = useWindowSize();
  const isMobile = size.width < 768;
  return (
    <RootLayout config={config}>
      <div className="flex flex-col md:flex-row items-center">
        <aside className="flex flex-col order-2 md:order-1 gap-y-8 md:mt-32 mb-16 w-full lg:w-1/3 h-auto">
          <div className="flex flex-col h-full">
            <div className="md:sticky md:top-16">
              <ShareButtons
                url={url}
                title={pageTitle}
                twitterId={config.twitterId}
                direction={isMobile ? "row" : "column"}
              />
            </div>
          </div>
        </aside>

        <main className="overflow-hidden order-1 md:order-2 pt-4 pb-12 max-w-prose">{children}</main>

        <aside className="flex flex-col order-3 gap-y-8 md:mt-32 mb-4 w-full lg:w-1/3 h-auto">
          <div className="flex flex-col h-full">
            <div className="md:sticky md:top-16">
              <ShareButtons url={url} title={pageTitle} twitterId={config.twitterId} direction="column" />
            </div>
          </div>
        </aside>
      </div>
      <div className="mt-8 mb-16">
        <BackLinks links={backLinks} />
      </div>
    </RootLayout>
  );
};

export default DefaultLayout;
