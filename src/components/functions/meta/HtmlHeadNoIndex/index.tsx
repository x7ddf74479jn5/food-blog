import Head from "next/head";
import { memo } from "react";

export const HtmlHeadNoIndex = memo(() => (
  <Head>
    <meta name="robots" content="noindex" />
  </Head>
));

HtmlHeadNoIndex.displayName = "HtmlHeadNoIndex";
