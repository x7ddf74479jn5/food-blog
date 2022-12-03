import Image from "next/image";
import type { ComponentPropsWithoutRef, FC } from "react";

import { isSafeNumber } from "@/utils";

type CustomImageProps = ComponentPropsWithoutRef<"img">;

export const CustomImage: FC<CustomImageProps> = ({ alt = "", height, src = "", width }) => {
  if (width && height) {
    const w = Number(width);
    const h = Number(height);

    if (isSafeNumber(w) && isSafeNumber(h)) {
      return (
        <div className="relative mb-4 flex w-full items-center justify-center">
          <Image src={src} alt={alt} width={w} height={h} className="h-auto max-w-full" />
        </div>
      );
    }
  }

  return (
    <div className="relative mb-4 flex h-48 w-full items-center justify-center lg:h-96">
      <Image src={src} alt={alt} sizes="100vw" className="object-contain" />
    </div>
  );
};
