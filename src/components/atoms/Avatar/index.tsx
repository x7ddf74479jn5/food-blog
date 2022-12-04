import Image from "next/image";

type AvatarProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};
export const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image {...props} className="m-0 rounded-full border border-gray-100 bg-pink-700" />
  );
};
