"use client";

import { useReportWebVitals } from "next/web-vitals";

declare global {
  interface Window {
    umami?: {
      track: (
        eventName: string,
        eventData?: Record<string, string | number | boolean>,
      ) => void;
    };
  }
}

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (typeof window === "undefined" || !window.umami) return;
    window.umami.track("web-vital", {
      name: metric.name,
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ),
      id: metric.id,
      rating: metric.rating ?? "unknown",
    });
  });
  return null;
}
