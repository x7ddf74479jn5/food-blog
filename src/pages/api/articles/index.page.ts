import { withSentry } from "@sentry/nextjs";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchArticles } from "@/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { limit, offset, filters, q } = req.query;

  const queries: MicroCMSQueries = {
    limit: limit ? Number(limit) : 10,
    offset: offset ? Number(offset) : 0,
    orders: "-publishedAt",
    filters: filters ? String(filters) : undefined,
    q: q ? String(q) : undefined,
  };

  const data = await fetchArticles(queries);

  res.status(200).json(data);
};

export default withSentry(handler);
