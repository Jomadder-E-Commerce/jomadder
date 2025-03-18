"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ProtectedPageWrapper = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { user, token } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && (!user || !token)) {
      localStorage.setItem("redirect", pathname);
      router.push("/login");
    }
  }, [isClient, user, token, pathname, router]);

  if (!isClient) return null; // Prevent rendering on the server

  return <>{children}</>;
};

export default ProtectedPageWrapper;
