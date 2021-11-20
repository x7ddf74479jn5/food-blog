import type { MicroCMSQueries } from "microcms-js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchArticles } from "@/utils/fetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit, offset } = req.query;
  let queries: MicroCMSQueries = { limit: Number(limit), offset: Number(offset), orders: "-publishedAt" };

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
