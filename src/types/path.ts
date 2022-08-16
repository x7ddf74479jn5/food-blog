import type { apiRoute, urlTable } from "@/utils/paths/url";

import type { ValueOf } from "./models/utils";

export type TAppUrl = ValueOf<typeof urlTable>;
export type TApiRoute = ValueOf<typeof apiRoute>;
