import { HtmlHeadBase } from "@/components/meta/HtmlHead";
import { generateWebpageJsonLd, JsonLdScript } from "@/components/meta/JsonLd";
import { fetchConfig } from "@/repositories";

const Head = async () => {
  const config = await fetchConfig();

  return (
    <head>
      <HtmlHeadBase />
      <JsonLdScript contents={[generateWebpageJsonLd({ config })]} />
    </head>
  );
};

export default Head;
