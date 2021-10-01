import { ShareButtons } from "@/components/atoms/ShareButtons/index";
import BackLinks from "@/components/molecules/BackLinks";
import Meta from "@/components/molecules/Meta";
import { TOC } from "@/components/molecules/TOC/index";
import Header from "@/components/organisms/Header";
import type { TConfig } from "@/types";

type Props = {
  url: string;
  children: React.ReactNode;
  pageTitle: string;
  config: TConfig;
  backLinks: Array<{
    href: string;
    label: string;
  }>;
};

const ArticleLayout: React.FC<Props> = ({ url, children, config, pageTitle, backLinks }: Props) => {
  return (
    <>
      <Meta />
      <div className="px-4 mx-auto max-w-screen-lg">
        <Header siteTitle={config.siteTitle} />
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start mt-4">
          <main className="pb-12">{children}</main>
          <aside className="lg:sticky top-3 mb-4 w-full lg:w-1/3 h-full">
            <TOC isSide />
            <ShareButtons url={url} title={pageTitle} twitterId={config.twitterId} />
          </aside>
        </div>
        <BackLinks links={backLinks} />
      </div>
    </>
  );
};

export default ArticleLayout;
