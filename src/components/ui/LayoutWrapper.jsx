// components/LayoutWrapper.jsx
'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";

export default function LayoutWrapper({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <Loader text="Please wait..." />}
      {children}
    </>
  );
}
