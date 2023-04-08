import { Noto_Sans_JP } from "next/font/google";

export const notoSansJP = Noto_Sans_JP({
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: ["400", "700"],
});
