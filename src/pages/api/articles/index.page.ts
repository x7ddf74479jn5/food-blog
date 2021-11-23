import type { MicroCMSQueries } from "microcms-js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchArticles } from "@/utils/fetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit, offset, filters } = req.query;
  let queries: MicroCMSQueries = {
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
    orders: "-publishedAt",
    filters: String(filters),
  };

  if ("q" in req.query) {
    const { q } = req.query;
    if (typeof q !== "string") {
      res.status(404).end();
      return;
    }

    queries = { q, ...queries };
  }

  const data = await fetchArticles(queries);

  res.status(200).json(data);
};

export default handler;
