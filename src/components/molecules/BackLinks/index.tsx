import { FaChevronLeft } from "react-icons/fa";

import NextLink from "@/components/atoms/NextLink";

export type Props = {
  links: Array<{
    href: string;
    label: string;
  }>;
};

const BackLinks: React.FC<Props> = ({ links }) => {
  return (
    <ul className="flex flex-col space-y-2 align-top ">
      {links.map((link, index) => (
        <li key={index}>
          <NextLink href={link.href} className="flex flex-row gap-2 items-center">
            <FaChevronLeft />
            {link.label}
          </NextLink>
        </li>
      ))}
    </ul>
  );
};

export default BackLinks;
