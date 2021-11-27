import Image from "next/image";

import NextLink from "@/components/atoms/NextLink";
import { urlTable } from "@/utils/paths/url";

type Props = {
  title: string;
  src: string;
  id?: string;
};

const Thumbnail: React.FC<Props> = ({ title, src, id }: Props) => {
  const image = <Image src={src} alt={`Cover Image for ${title}`} width={640} height={360} objectFit="cover" />;
  return (
    <>
      {id ? (
        <NextLink href={`${urlTable.articles}/${id}`} aria-label={title}>
          {image}
        </NextLink>
      ) : (
        image
      )}
    </>
  );
};

export default Thumbnail;
