/**
 * @see next/image mock
 * https://github.com/vercel/next.js/issues/18393#issuecomment-955577890
 */

import React from "react";
import * as NextImage from "next/future/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (/** @type {import('next/image').ImageProps} */ props) => {
    if (typeof props.src === "string") {
      return <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />;
    } else {
      // don't need blurDataURL here since it is already defined on the StaticImport type
      return <OriginalNextImage {...props} unoptimized />;
    }
  },
});
