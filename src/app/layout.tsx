"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useRef, useState } from "react";
import Loader from "@/components/common/Loader";
import { AppStore, userStore } from "@/lib/store";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = userStore();
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={storeRef.current}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
