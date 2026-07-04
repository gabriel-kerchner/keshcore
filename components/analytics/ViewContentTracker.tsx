"use client";

import { useEffect } from "react";
import { trackPixelEvent } from "@/lib/meta-pixel";

interface Props {
  contentId: string;
  contentName: string;
  value?: number;
  currency?: string;
  category?: string;
}

export default function ViewContentTracker({
  contentId,
  contentName,
  value,
  currency,
  category,
}: Props) {
  useEffect(() => {
    trackPixelEvent("ViewContent", {
      content_ids: [contentId],
      content_name: contentName,
      content_type: "product",
      content_category: category,
      value,
      currency,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId]);

  return null;
}
