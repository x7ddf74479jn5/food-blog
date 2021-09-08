import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || "",
  apiKey: process.env.X_API_KEY || "",
  globalDraftKey: process.env.X_GLOBAL_DRAFT_KEY || "",
});
