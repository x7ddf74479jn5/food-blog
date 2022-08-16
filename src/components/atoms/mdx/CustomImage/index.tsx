import type { ImageProps } from "next/image";
import Image from "next/image";

type Props = {
  className?: string;
  alt?: string;
} & ImageProps;

const CustomImage: React.FC<Props> = ({ src, alt = "", width, height, ...otherProps }) => {
  if (width && height) {
    return (
      <div className="relative mb-4 flex w-full items-center justify-center">
        <Image {...otherProps} src={src} alt={alt} width={width} height={height} layout="intrinsic" />
      </div>
    );
  }

  return (
    <div className="relative mb-4 flex h-48 w-full items-center justify-center lg:h-96">
      <Image {...otherProps} src={src} alt={alt} layout="fill" objectFit="contain" />
    </div>
  );
};

export default CustomImage;
