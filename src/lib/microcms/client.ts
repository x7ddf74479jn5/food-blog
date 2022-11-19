import "server-only";

import { createClient } from "microcms-js-sdk";

export const client = createClient({
  apiKey: process.env.X_MICROCMS_API_KEY,
  serviceDomain: process.env.SERVICE_DOMAIN,
});
