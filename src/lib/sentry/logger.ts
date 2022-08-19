import * as Sentry from "@sentry/nextjs";

import { HttpError } from "@/utils/error/Http";

const isSentryEnabled = process.env.NODE_ENV === "production";

type CaptureOptions = { contexts?: Record<string, any>; tags?: Record<string, string> };

export const sentryLog = (err: Error | HttpError, options?: CaptureOptions) => {
  console.error(err);

  if (!isSentryEnabled) return;

  if (err instanceof HttpError) {
    const endpoint = err.url || "";
    const status = err.status;
    Sentry.withScope((scope) => {
      scope.setFingerprint(["{{ default }}", endpoint, String(status)]);
      Sentry.captureException(err, {
        ...options,
      });
    });
  } else {
    Sentry.captureException(err, { ...options });
  }
};

export const sentryLogServer = async (err: Error | HttpError, options?: CaptureOptions) => {
  sentryLog(err, options);
  await Sentry.flush(2000);
};
