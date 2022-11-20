import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { fetchConfig } from "@/repositories";

const Head = async () => {
  const { host, siteDescription, siteImage, siteTitle } = await fetchConfig();

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo title={siteTitle} description={siteDescription} url={host} image={siteImage.url} />
    </head>
  );
};

export default Head;
