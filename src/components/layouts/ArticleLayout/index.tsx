import dynamic from "next/dynamic";

import { ShareButtons } from "@/components/atoms/ShareButtons/index";
import { RootLayout } from "@/components/layouts/RootLayout";
import { TOC } from "@/components/molecules/TOC/index";
import { RelatedArticles } from "@/components/organisms/RelatedArticles";
import type { TArticle, TConfig } from "@/types";

type Props = {
  url: string;
  children: React.ReactNode;
  pageTitle: string;
  config: TConfig;
  backLinks: Array<{
    href: string;
    label: string;
  }>;
  relatedArticles: TArticle[];
};

const ArticleLayout: React.FC<Props> = ({ url, children, config, pageTitle, backLinks, relatedArticles }: Props) => {
  const BackLinks = dynamic(() => import("@/components/molecules/BackLinks"));
  return (
    <RootLayout config={config}>
      <div className="mb-32">
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start mt-4 mb-8">
          <main className="pb-12">{children}</main>
          <aside className="flex lg:sticky top-3 flex-col gap-y-8 mb-4 w-full lg:w-1/3 h-full">
            <TOC isSide />
            <ShareButtons url={url} title={pageTitle} twitterId={config.twitterId} />
            <RelatedArticles relatedArticles={relatedArticles} />
          </aside>
        </div>
        <BackLinks links={backLinks} />
      </div>
    </RootLayout>
  );
};

export default ArticleLayout;
