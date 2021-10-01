import Tooltip from "@components/atoms/Tooltip";
import { FaFacebook, FaGetPocket, FaLine, FaTwitter } from "react-icons/fa";
import { SiHatenabookmark } from "react-icons/si";
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  PocketShareButton,
  TwitterShareButton,
} from "react-share";

type Props = {
  url: string;
  title: string;
  twitterId?: string;
};

export const ShareButtons: React.FC<Props> = ({ url, title, twitterId }) => {
  return (
    <div className="flex flex-row gap-4">
      <TwitterShareButton url={url} title={title} via={twitterId}>
        <Tooltip label="Twitterでシェア">
          <FaTwitter className="text-gray-400 hover:text-green-500" size={24} />
        </Tooltip>
      </TwitterShareButton>
      <FacebookShareButton url={url} title={title}>
        <Tooltip label="Facebookでシェア">
          <FaFacebook className="text-gray-400 hover:text-green-500" size={24} />
        </Tooltip>
      </FacebookShareButton>
      <LineShareButton url={url} title={title}>
        <Tooltip label="LINEでシェア">
          <FaLine className="text-gray-400 hover:text-green-500" size={24} />
        </Tooltip>
      </LineShareButton>
      <PocketShareButton url={url} title={title}>
        <Tooltip label="Pocketに保存">
          <FaGetPocket className="text-gray-400 hover:text-green-500" size={24} />
        </Tooltip>
      </PocketShareButton>
      <HatenaShareButton url={url} title={title}>
        <Tooltip label="はてなブックマークでシェア">
          <SiHatenabookmark className="text-gray-400 hover:text-green-500" size={24} />
        </Tooltip>
      </HatenaShareButton>
    </div>
  );
};
