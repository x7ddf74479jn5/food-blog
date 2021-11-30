# Food Blog

Next.js, MDX, microCMSで作ったレシピブログです。要件として非エンジニアの方がCMSから入稿とサイトの基本設定の変更ができることを想定しています。

## Screenshot

![Food Blog Screenshot](https://raw.githubusercontent.com/x7ddf74479jn5/next-portfolio/master/public/img/samples/food-blog-eyecatch.webp)

## URL

[https://food-blog-chi.vercel.app/](https://food-blog-chi.vercel.app/)

## Techs

- Frontend
  - Next.js
  - TypeScript
  - Tailwind CSS
- Backend
  - microCMS
- Misc
  - MDX
  - Jest
  - Storybook
  
## Sitemap

| URL                         | Name                 | Note                                         | 
| --------------------------- | -------------------- | -------------------------------------------- | 
| /                           | ホーム               | ピックアップと最新記事を10件表示             | 
| /articles/[id]              | 記事詳細             | MDX                                          | 
| /articles/categories        | カテゴリー一覧       |                                              | 
| /articles/categories/[slug] | カテゴリー別記事一覧 |                                              | 
| /articles/tags/[slug]       | タグ別記事一覧       |                                              | 
| /preview/[id]               | 記事プレビュー       | microCMSのコンテンツ管理ページからのみ参照可 | 
| /search                     | 記事検索             |  ヘッダーの検索窓から遷移                    | 

## FYI

MDX = Markdown + JSX

[![hashicorp/next-mdx-remote - GitHub](https://gh-card.dev/repos/hashicorp/next-mdx-remote.svg)](https://github.com/hashicorp/next-mdx-remote)

本ブログでは**hashicorp/next-mdx-remote**を用いて外部APIから取得したMDXをビルド時に変換しています。

```ts
// getStaticPropsで呼びます。プラグインなどの設定はここで。
export const mdx2html = async (source: string) => {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkBreaks, remarkEmoji, remarkFootnotes, remarkSlug, remarkUnwrapImages],
    },
  });

  return mdxSource;
};
```

```jsx
// MDX内のリンクを外部リンクか内部リンクか判定し、最適化しているカスタムコンポーネントの例です。
const CustomLink: React.FC<Props> = ({ href, children }) => {
  const isInternalLink = href.startsWith("/") ? true : false;

  return (
    <>
      {isInternalLink ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )}
    </>
  );
};
```

```jsx
// カスタムコンポーネントをまとめてエクスポート。
export const MDXCustomComponents = {
  // Markdownのパース結果のa要素とimg要素をカスタムコンポーネントに置き換え。
  img: (props: ComponentProps<typeof CustomImage>) => <CustomImage {...props} />,
  a: (props: ComponentProps<typeof CustomLink>) => <CustomLink {...props} />,
  Callout,
  LinkCard,
};
```

```jsx
// propsはMDX内で次のように愚直に渡しています。
<LinkCard article={articles[0]} />

const data = { articles: linkCardArticles };

// 最終的には次のように流し込みます。
<MDXRemote {...mdxSource} components={MDXCustomComponents} scope={data} />
```

## Author

- [GitHub](https://github.com/x7ddf74479jn5)
- [Twitter](https://twitter.com/pandashark6)
