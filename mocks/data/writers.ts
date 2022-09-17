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
    id: "1",
    name: "pandashark",
    fullName: "pandashark",
    description: "description",
    twitterAccountName: "@pandashark",
    avatar: { url: "pandashark_logo_180x180.png", width: 100, height: 100 },
  },
};
