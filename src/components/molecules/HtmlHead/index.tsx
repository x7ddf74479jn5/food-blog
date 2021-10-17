import React from "react";

import { HtmlHeadBase, HtmlHeadJsonLt } from "@/components/atoms/meta";

type HtmlHeadProps = {
  title: string;
  description: string;
  url: string;
  image: string;
  host: string;
  siteName: string;
  authorName: string;
  datePublished: string;
  dateModified: string;
};

export const HtmlHead: React.FC<HtmlHeadProps> = ({
  title,
  description,
  url,
  image,
  host,
  siteName,
  datePublished,
  dateModified,
  authorName,
}) => {
  const _title = title ? `${title} | ${siteName}` : siteName;
  const _url = url ? new URL(url, host).toString() : "";
  const _image = url && image ? new URL(image, host).toString() : "";
  return (
    <>
      <HtmlHeadBase indexUrl={host} title={_title} description={description} url={_url} image={_image} />
      <HtmlHeadJsonLt
        url={_url}
        title={_title}
        image={_image}
        datePublished={datePublished}
        dateModified={dateModified}
        authorName={authorName}
        description={description}
      />
    </>
  );
};
