import type { NextApiRequest, NextApiResponse } from "next";

import { fetchArticle } from "@/utils/fetcher/fetchArticles";
import { urlTable } from "@/utils/paths/url";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(404).end();
  }

  if (typeof req.query.id !== "string" || typeof req.query.draftKey !== "string") {
    return res.status(400).end();
  }

  const content = await fetchArticle(req.query.id, { draftKey: req.query.draftKey });

  if (!content) {
    return res.status(401).json({ message: "Invalid id" });
  }

  res.setPreviewData({
    id: content.id,
    draftKey: req.query.draftKey,
  });
  // eslint-disable-next-line @typescript-eslint/naming-convention
  res.writeHead(307, { Location: `${urlTable.preview}/${content.id}` });
  res.end("Preview mode enabled");
};

export default handler;
