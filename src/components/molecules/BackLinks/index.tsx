import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";

import NextLink from "@/components/atoms/NextLink";

export type Props = {
  links: Array<{
    href: string;
    label: string;
  }>;
};

const BackLinks: React.FC<Props> = ({ links }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <ul className="flex flex-col space-y-2 align-top">
      <li>
        <button onClick={handleBack} className="flex flex-row items-center gap-2">
          <FaChevronLeft />
          前のページへ
        </button>
      </li>
      {links.map((link, index) => (
        <li key={index}>
          <NextLink href={link.href} className="flex flex-row items-center gap-2">
            <FaChevronLeft />
            {link.label}
          </NextLink>
        </li>
      ))}
    </ul>
  );
};

export default BackLinks;
