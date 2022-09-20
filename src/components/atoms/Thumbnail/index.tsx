import Image from "next/future/image";
import { memo } from "react";

import NextLink from "@/components/atoms/NextLink";
import { urlTable } from "@/utils/paths/url";

type Props = {
  title: string;
  src: string;
  id?: string;
};

const Thumbnail: React.FC<Props> = ({ title, src, id }) => {
  const image = (
    <Image
      src={src}
      alt={title}
      width={640}
      height={360}
      className="aspect-video h-auto w-full object-cover"
      // placeholder="blur"
      // blurDataURL={""}
    />
  );
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

export default memo(Thumbnail);
