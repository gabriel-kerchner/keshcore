declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbqQueue?: unknown[][];
  }
}

type StandardEvent =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase";

export function trackPixelEvent(
  event: StandardEvent,
  data?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    window.fbq("track", event, data);
    return;
  }

  // The pixel's base script (loaded via next/script) hasn't initialized yet —
  // queue the call and let MetaPixel flush it once fbq becomes available.
  window._fbqQueue = window._fbqQueue ?? [];
  window._fbqQueue.push(["track", event, data]);
}
