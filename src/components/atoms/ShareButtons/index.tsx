/* eslint-disable tailwindcss/classnames-order */
import { FaFacebook, FaGetPocket, FaLine, FaTwitter } from "react-icons/fa";
import { SiHatenabookmark } from "react-icons/si";
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  PocketShareButton,
  TwitterShareButton,
} from "react-share";

import Tooltip from "@/components/atoms/Tooltip";

type Props = {
  url: string;
  title: string;
  twitterId?: string;
  direction?: "row" | "column";
};

export const ShareButtons: React.FC<Props> = ({ url, title, twitterId, direction = "row" }) => {
  const _direction = direction === "row" ? "flex-row" : "flex-col";
  return (
    <div className={`flex ${_direction} gap-4 justify-center items-center`}>
      <TwitterShareButton url={url} title={title} via={twitterId}>
        <Tooltip label="Twitterでシェア">
          <FaTwitter className="text-gray-400 hover:text-[#1DA1F2]" size={24} />
        </Tooltip>
      </TwitterShareButton>
      <FacebookShareButton url={url} title={title}>
        <Tooltip label="Facebookでシェア">
          <FaFacebook className="text-gray-400 hover:text-[#3b5998]" size={24} />
        </Tooltip>
      </FacebookShareButton>
      <LineShareButton url={url} title={title}>
        <Tooltip label="LINEでシェア">
          <FaLine className="text-gray-400 hover:text-[#00B900]" size={24} />
        </Tooltip>
      </LineShareButton>
      <PocketShareButton url={url} title={title}>
        <Tooltip label="Pocketに保存">
          <FaGetPocket className="text-gray-400 hover:text-[#ee4056]" size={24} />
        </Tooltip>
      </PocketShareButton>
      <HatenaShareButton url={url} title={title}>
        <Tooltip label="はてなブックマークでシェア">
          <SiHatenabookmark className="text-gray-400 hover:text-[#00A4DE]" size={24} />
        </Tooltip>
      </HatenaShareButton>
    </div>
  );
};
