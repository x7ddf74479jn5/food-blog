import { BlogJsonLd } from "next-seo";

type HtmlHeadJsonLtJsonLdProps = {
  url: string;
  title: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  description: string;
};

export const HtmlHeadJsonLt: React.VFC<HtmlHeadJsonLtJsonLdProps> = ({
  url,
  title,
  image,
  datePublished,
  dateModified,
  authorName,
  description,
}) => {
  return (
    <BlogJsonLd
      url={url}
      title={title}
      images={[image]}
      datePublished={datePublished}
      dateModified={dateModified}
      authorName={authorName}
      description={description}
    />
  );
};
