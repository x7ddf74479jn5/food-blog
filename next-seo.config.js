module.exports = {
  defaultTitle: "Food Blog",
  titleTemplate: "%s | Food Blog",
  description: "料理レシピを紹介するブログ",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://food-blog-chi.vercel.app/",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    site_name: "Food Blog",
    images: [
      {
        url: "https://food-blog-chi.vercel.app/site_image.jpg",
      },
    ],
  },
  twitter: {
    handle: "@pandashark6",
    cardType: "summary",
  },
};
