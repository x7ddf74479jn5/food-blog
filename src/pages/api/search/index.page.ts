import type { NextApiRequest, NextApiResponse } from "next";

import { fetchArticles } from "@/utils/fetcher";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const { q, offset, limit } = req.query;
  if (typeof q !== "string") {
    res.status(404).end();
    return;
  }

  const data = await fetchArticles({
    q: q,
    limit: Number(limit) || 5,
    offset: Number(offset) || 0,
    orders: "-publishedAt",
  });

  res.status(200).json(data);
};

export default search;
