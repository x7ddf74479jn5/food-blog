import NextLink from "@/components/atoms/NextLink";
import { classNames } from "@/utils/css";

type Props = { size: "lg" | "sm"; siteTitle: string };

export const SiteTitleView: React.FC<Props> = ({ siteTitle, size = "lg" }) => {
  return (
    <NextLink href="/" className={classNames("font-bold text-green-600", size === "lg" ? "text-2xl" : "text-xs")}>
      {siteTitle}
    </NextLink>
  );
};
