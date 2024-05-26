"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useRef, useState } from "react";
import Loader from "@/components/common/Loader";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
persistStore(store);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
