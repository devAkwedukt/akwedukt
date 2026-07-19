"use client";

import { useEffect } from "react";
import * as klaro from "klaro";
import { klaroConfig } from "@/lib/klaro-config";
import "klaro/dist/klaro.css";

export default function KlaroConsent() {
  useEffect(() => {
    klaro.show(klaroConfig);
  }, []);

  return null;
}
