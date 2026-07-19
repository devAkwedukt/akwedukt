"use client";

import { useEffect } from "react";
import { klaroConfig } from "@/lib/klaro-config";
import "klaro/dist/klaro.css";

export default function KlaroConsent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set config globally
      (window as any).klaroConfig = klaroConfig;

      // Create script tag for Klaro
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://cdn.kiprotect.com/klaro/latest/klaro.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
