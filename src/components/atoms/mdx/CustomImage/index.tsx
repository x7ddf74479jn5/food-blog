import Image from "next/image";
import type { ComponentPropsWithoutRef, FC } from "react";

type CustomImageProps = ComponentPropsWithoutRef<"img">;

export const CustomImage: FC<CustomImageProps> = ({ src = "", alt = "", width, height }) => {
  if (width && height) {
    return (
      <div className="relative mb-4 flex w-full items-center justify-center">
        <Image src={src} alt={alt} width={width} height={height} className="h-auto max-w-full" />
      </div>
    );
  }

  return (
    <div className="relative mb-4 flex h-48 w-full items-center justify-center lg:h-96">
      <Image src={src} alt={alt} sizes="100vw" fill className="object-contain" />
    </div>
  );
};
