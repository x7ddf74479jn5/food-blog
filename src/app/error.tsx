"use client";

import { Error } from "@/components/pages/Errorw";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const handleReset = reset;

  return <Error error={error} onReset={handleReset} />;
}
