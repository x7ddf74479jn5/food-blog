import type { ImageProps } from "next/image";
import Image from "next/image";

type Props = {
  className: string;
  alt: string;
} & ImageProps;

const CustomImage: React.VFC<Props> = (props) => {
  return (
    <div className="next-image-container">
      <Image
        className={props.className}
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        loading={props.loading || "lazy"}
        layout="responsive"
      />
    </div>
  );
};

export default CustomImage;
