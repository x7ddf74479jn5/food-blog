import { FaFacebook, FaGetPocket, FaLine, FaTwitter } from "react-icons/fa";
import { SiHatenabookmark } from "react-icons/si";
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  PocketShareButton,
  TwitterShareButton,
} from "react-share";

import { Skelton } from "@/components/atoms/Skelton";
import Tooltip from "@/components/atoms/Tooltip";
import { useMount } from "@/hooks/useMount";
import { classNames } from "@/utils/css";

type Direction = "row" | "column";

const Wrapper = ({ direction, children }: React.PropsWithChildren<{ direction: Direction }>) => (
  <div className={classNames("flex items-center justify-center gap-4", direction === "row" ? "flex-row" : "flex-col")}>
    {children}
  </div>
);

const SkeltonShareButtons = ({ direction }: { direction: Direction }) => {
  const items = [...Array(5)].map((_, i) => <Skelton key={i} className="h-6 w-6 bg-gray-300" />);

  return <Wrapper direction={direction}>{items}</Wrapper>;
};

type Props = {
  url: string;
  title: string;
  direction?: Direction;
};

export const ShareButtons: React.FC<Props> = ({ url, title, direction = "row" }) => {
  const isMounted = useMount();

  if (!isMounted) return <SkeltonShareButtons direction={direction} />;

  const buttonClassName = classNames("flex items-center justify-center", direction === "row" ? "flex-row" : "flex-col");

  return (
    <Wrapper direction={direction}>
      <TwitterShareButton url={url} title={title} className={buttonClassName}>
        <Tooltip label="Twitterでシェア">
          <FaTwitter className="text-gray-400 hover:text-[#1DA1F2]" size={24} />
        </Tooltip>
      </TwitterShareButton>
      <FacebookShareButton url={url} title={title} className={buttonClassName}>
        <Tooltip label="Facebookでシェア">
          <FaFacebook className="text-gray-400 hover:text-[#3b5998]" size={24} />
        </Tooltip>
      </FacebookShareButton>
      <LineShareButton url={url} title={title} className={buttonClassName}>
        <Tooltip label="LINEでシェア">
          <FaLine className="text-gray-400 hover:text-[#00B900]" size={24} />
        </Tooltip>
      </LineShareButton>
      <PocketShareButton url={url} title={title} className={buttonClassName}>
        <Tooltip label="Pocketに保存">
          <FaGetPocket className="text-gray-400 hover:text-[#ee4056]" size={24} />
        </Tooltip>
      </PocketShareButton>
      <HatenaShareButton url={url} title={title} className={buttonClassName}>
        <Tooltip label="はてなブックマークでシェア">
          <SiHatenabookmark className="text-gray-400 hover:text-[#00A4DE]" size={24} />
        </Tooltip>
      </HatenaShareButton>
    </Wrapper>
  );
};
