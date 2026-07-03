"use client";

import { useEffect } from "react";

interface Props {
  label: string;
  data: unknown;
}

export default function DebugLog({ label, data }: Props) {
  useEffect(() => {
    console.log(label, data);
  }, [label, data]);

  return null;
}
