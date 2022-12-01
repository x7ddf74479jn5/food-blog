import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

import { toIdleTask } from "@/utils";

type ClickEvent = {
  action: "click";
  category: "Other";
  label: string;
  value?: string;
};

type SearchEvent = {
  term: string;
};

type Event = ClickEvent;

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const isExistsGaId = GA_ID !== "";

const pageview = (path: string) => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

export const event = ({ action, category, label, value = "" }: Event) => {
  if (!isExistsGaId) {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : "",
    value,
  });
};

export const search = ({ term }: SearchEvent) => {
  window.gtag("event", "search", {
    search_term: term,
  });
};

export const usePageView = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isExistsGaId) {
      return;
    }

    const handleRouteChange = (path: string) => {
      toIdleTask(() => pageview(path));
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

export const GoogleAnalytics = () => (
  <>
    {isExistsGaId && (
      <>
        <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="worker" />
        <Script
          id="gtag"
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}', {'debug_mode': ${process.env.NODE_ENV === "development"}});
            `,
          }}
          strategy="worker"
        />
      </>
    )}
  </>
);
