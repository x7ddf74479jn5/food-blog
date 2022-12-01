"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

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
  if (!isExistsGaId) return;

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

const usePageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathRef = useRef(pathname);
  const url = pathname + searchParams.toString();

  useEffect(() => {
    if (!isExistsGaId || prevPathRef.current === url) return;

    toIdleTask(() => pageview(url));
    prevPathRef.current = url;
  }, [url]);
};

export const GoogleAnalytics = () => {
  usePageView();

  return (
    <>
      {isExistsGaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script
            id="gtag"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}', {'debug_mode': ${process.env.NODE_ENV === "development"}});
            `,
            }}
            strategy="afterInteractive"
          />
        </>
      )}
    </>
  );
};
