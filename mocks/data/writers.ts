import { dateCommon } from "@mocks/data/utils";

import type { TWriter } from "@/types";

type TWriterCollection = {
  [key: string]: TWriter;
};

export const mockWriters: TWriterCollection = {
  pandashark: {
    ...dateCommon,
    id: "1",
    name: "pandashark",
    fullName: "pandashark",
    description: "description",
    twitterAccountName: "@pandashark",
    avatar: { url: "/images/pandashark_logo_180x180.png", width: 100, height: 100 },
  },
};
