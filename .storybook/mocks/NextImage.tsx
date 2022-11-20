/**
 * @see next/image mock
 * https://github.com/vercel/next.js/issues/18393#issuecomment-955577890
 */

import * as NextImage from "next/image";
import type { ImageProps } from "next/image";
import React from "react";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: ({ src, ...props }: ImageProps) => {
    if (typeof src === "string") {
      const imgSrc = src.startsWith("/") ? src.substring(1) : src;

      return <OriginalNextImage {...props} src={imgSrc} unoptimized blurDataURL={imgSrc} />;
    } else {
      // don't need blurDataURL here since it is already defined on the StaticImport type
      return <OriginalNextImage {...props} src={src} unoptimized />;
    }
  },
});
