import type { ImageProps } from "next/image";
import Image from "next/image";

type Props = {
  className?: string;
  alt?: string;
} & ImageProps;

const CustomImage: React.VFC<Props> = ({ src, alt = "", width, height, ...otherProps }) => {
  if (width && height) {
    return (
      <div className="flex relative justify-center items-center mb-4 w-full">
        <Image
          {...otherProps}
          // className={"flex justify-center items-center"}
          src={src}
          alt={alt}
          width={width}
          height={height}
          layout="intrinsic"
        />
      </div>
    );
  }

  return (
    <div className="flex relative justify-center items-center mb-4 w-full">
      <Image {...otherProps} src={src} alt={alt} layout="fill" objectFit="contain" />
    </div>
  );
};

export default CustomImage;
