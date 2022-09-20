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

type ShareButtonsProps = {
  url: string;
  title: string;
  className: string;
};

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, className }) => {
  return (
    <div className={`flex place-items-center gap-4 ${className}`}>
      <TwitterShareButton url={url} title={title}>
        <Tooltip label="Twitterでシェア">
          <FaTwitter className="text-[#1DA1F2] lg:text-gray-400 lg:hover:text-[#1DA1F2]" size={24} />
        </Tooltip>
      </TwitterShareButton>
      <FacebookShareButton url={url} title={title}>
        <Tooltip label="Facebookでシェア">
          <FaFacebook className="text-[#3b5998] lg:text-gray-400 lg:hover:text-[#3b5998]" size={24} />
        </Tooltip>
      </FacebookShareButton>
      <LineShareButton url={url} title={title}>
        <Tooltip label="LINEでシェア">
          <FaLine className="text-[#00B900] lg:text-gray-400 lg:hover:text-[#00B900]" size={24} />
        </Tooltip>
      </LineShareButton>
      <PocketShareButton url={url} title={title}>
        <Tooltip label="Pocketに保存">
          <FaGetPocket className="text-[#ee4056] lg:text-gray-400 lg:hover:text-[#ee4056]" size={24} />
        </Tooltip>
      </PocketShareButton>
      <HatenaShareButton url={url} title={title}>
        <Tooltip label="はてなブックマークでシェア">
          <SiHatenabookmark className="text-[#00A4DE] lg:text-gray-400 lg:hover:text-[#00A4DE]" size={24} />
        </Tooltip>
      </HatenaShareButton>
    </div>
  );
};
