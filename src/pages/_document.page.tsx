import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html>
        <Head />
        <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100" style={{ overflowAnchor: "none" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
