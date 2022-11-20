type Props = {
  title: string;
  description: string;
  url: string;
  image: string;
};

export const HtmlHeadSeo: React.FC<Props> = ({ description, image, title, url }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@pandashark6" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <link href={url} rel="canonical" />
    </>
  );
};
