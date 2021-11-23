import type { MicroCMSQueries } from "microcms-js-sdk";

export type TQueryOptions = Pick<MicroCMSQueries, "q" | "limit" | "filters">;
