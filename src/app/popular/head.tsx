import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { getPopularPageMeta } from "@/components/pages/Popular/meta";

const Head = async () => {
  const meta = await getPopularPageMeta();

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
    </head>
  );
};

export default Head;
