import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { generateWebpageJsonLd, JsonLdScript } from "@/components/meta/JsonLd";
import { getPickupPageMeta } from "@/components/pages/Pickup/meta";
import { fetchConfig } from "@/repositories";

const Head = async () => {
  const [config, meta] = await Promise.all([fetchConfig(), getPickupPageMeta()]);

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
      <JsonLdScript contents={[generateWebpageJsonLd({ config })]} />
    </head>
  );
};

export default Head;
