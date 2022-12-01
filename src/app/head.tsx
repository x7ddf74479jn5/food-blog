import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { generateWebpageJsonLd, JsonLdScript } from "@/components/meta/JsonLd";
import { fetchConfig } from "@/repositories";

const Head = async () => {
  const config = await fetchConfig();
  const { host, siteDescription, siteImage, siteTitle } = config;

  return (
    <head>
      <HtmlHeadBase />
      <JsonLdScript contents={[generateWebpageJsonLd({ config })]} />
      <HtmlHeadSeo title={siteTitle} description={siteDescription} url={host} image={siteImage.url} />
    </head>
  );
};

export default Head;
