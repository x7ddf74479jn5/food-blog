import { fetchConfig } from "@/repositories";

import { FooterView } from "./FooterView";

export const Footer = async function () {
  const { organization } = await fetchConfig();

  return <FooterView organization={organization} />;
};
