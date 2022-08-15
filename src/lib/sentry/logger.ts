import * as Sentry from "@sentry/nextjs";

import { HttpError } from "@/utils/error/Http";

export const sentryLog = (err: Error | HttpError) => {
  console.error(err);

  if (err instanceof HttpError) {
    let contexts = {};
    const endpoint = err.url || "";
    const status = err.status;

    contexts = { ...err };

    Sentry.withScope((scope) => {
      scope.setFingerprint(["{{ default }}", endpoint, String(status)]);
      Sentry.captureException(err, {
        contexts,
      });
    });
  } else {
    Sentry.captureException(err);
  }
};
