import NextLink from "@components/atoms/NextLink";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  id?: string;
};

const Thumbnail: React.FC<Props> = ({ title, src, id }: Props) => {
  const image = <Image src={src} alt={`Cover Image for ${title}`} width={1280} height={720} />;
  return (
    <>
      {id ? (
        <NextLink href={`/articles/${id}`} aria-label={title}>
          {image}
        </NextLink>
      ) : (
        image
      )}
    </>
  );
};

export default Thumbnail;
