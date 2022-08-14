import type { NextPage } from "next";

import { HtmlHeadNoIndex } from "@/components/functions/meta";
import { ErrorFallback } from "@/components/organisms/ErrorFallback";

const Error404Page: NextPage = () => (
  <>
    <HtmlHeadNoIndex />
    <ErrorFallback heading="404 - Not Found" message="ページが見つかりませんでした" />
  </>
);

export default Error404Page;
