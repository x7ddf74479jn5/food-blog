import { dateCommon } from "@mocks/data/utils";
import type { MicroCMSListContent } from "microcms-js-sdk";

import type { TWriter } from "@/types";

type TMockWriterKey = "pandashark";

type TWriterCollection = {
  [P in TMockWriterKey]: TWriter & MicroCMSListContent;
};

export const mockWriters: TWriterCollection = {
  pandashark: {
    ...dateCommon,
    avatar: { height: 100, url: "/pandashark_logo_180x180.png", width: 100 },
    description: "description",
    fullName: "pandashark",
    id: "1",
    name: "pandashark",
    twitterAccountName: "@pandashark",
  },
};
