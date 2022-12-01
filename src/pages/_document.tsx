import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="ja">
        <Head />
        <body
          className="mx-auto mb-16 flex min-h-screen max-w-screen-xl flex-col bg-white px-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
          style={{ overflowAnchor: "none" }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
