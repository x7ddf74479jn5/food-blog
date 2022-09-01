import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchArticle } from "@/api/fetchArticles";
import { urlTable } from "@/utils/paths/url";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!req.query.id) {
    return res.status(404).json({ message: "Bad Request" });
  }

  if (typeof req.query.id !== "string" || typeof req.query.draftKey !== "string") {
    return res.status(400).json({ message: "Bad Request" });
  }

  const content = await fetchArticle(req.query.id, { draftKey: req.query.draftKey });

  if (!content) {
    return res.status(401).json({ message: "Invalid id" });
  }

  res.setPreviewData({
    content,
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  res.writeHead(307, { Location: `${urlTable.preview}/${content.id}` });
  res.end("Preview mode enabled");
};

export default withSentry(handler);
