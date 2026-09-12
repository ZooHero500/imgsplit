"use client";

import { useEffect } from "react";

export function SWRegister() {
  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        if ("serviceWorker" in navigator) {
          await navigator.serviceWorker.register("/sw.js");
        }
      } catch (error) {
        // Offline support is optional; restricted browsers may block registration.
        console.warn("Service Worker registration failed; offline support is unavailable.", error);
      }
    };

    void registerServiceWorker();
  }, []);

  return null;
}
