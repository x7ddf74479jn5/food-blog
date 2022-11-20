import { SiteTitle } from "@/components/atoms/SiteTitle";

type Props = {
  organization: string;
};

export const FooterView: React.FC<Props> = ({ organization }) => (
  <footer className="mx-auto mt-auto flex w-full flex-row place-content-center gap-2 bg-gray-50 py-2 text-xs dark:bg-gray-700">
    {/* @ts-expect-error Server Component */}
    <SiteTitle size="sm" />
    ©︎ {new Date().getFullYear()} {organization}
  </footer>
);
