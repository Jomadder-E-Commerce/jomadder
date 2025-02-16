"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import SpeedDial from "@/components/pages/homePage/SpeedDial";

export default function SpeedDialPortal() {
  // Because Next.js does server-side rendering, we check
  // if the component is mounted in the browser before using createPortal.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, don't render anything
  if (!mounted) return null;

  // If mounted in the browser, render SpeedDial into document.body
  return createPortal(
    <SpeedDial />,
    document.body
  );
}
