import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { generateWebpageJsonLd, JsonLdScript } from "@/components/meta/JsonLd";
import { getPopularPageMeta } from "@/components/pages/Popular/meta";
import { fetchConfig } from "@/repositories";

const Head = async () => {
  const [config, meta] = await Promise.all([fetchConfig(), getPopularPageMeta()]);

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
      <JsonLdScript contents={[generateWebpageJsonLd({ config })]} />
    </head>
  );
};

export default Head;
