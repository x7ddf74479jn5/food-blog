import { withSentry } from "@sentry/nextjs";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchArticles } from "@/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { limit, offset, filters } = req.query;

  if (typeof limit !== "string" || typeof offset !== "string" || typeof filters !== "string") {
    return res.status(400).json({ message: "Bad Request" });
  }

  let queries: MicroCMSQueries = {
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
    orders: "-publishedAt",
    filters: filters ? String(filters) : undefined,
  };

  if ("q" in req.query) {
    const { q } = req.query;
    if (typeof q !== "string") {
      return res.status(400).json({ message: "Bad Request" });
    }

    queries = { q, ...queries };
  }

  const data = await fetchArticles(queries);

  if (!data) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.status(200).json(data);
};

export default withSentry(handler);
