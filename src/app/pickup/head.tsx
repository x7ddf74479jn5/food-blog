import { HtmlHeadBase, HtmlHeadSeo } from "@/components/meta/HtmlHead";
import { getPickupPageMeta } from "@/components/pages/Pickup/meta";

const Head = async () => {
  const meta = await getPickupPageMeta();

  return (
    <head>
      <HtmlHeadBase />
      <HtmlHeadSeo {...meta} />
    </head>
  );
};

export default Head;
