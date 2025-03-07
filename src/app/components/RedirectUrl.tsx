// src/app/route-change-listener.tsx

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RedirectUrl() {
  const pathname = usePathname();
  const history = useRouter();
  const [check, setCheck] = useState(false);
  const redirectPath = () => {
    console.log("pathname is", pathname);
    if (pathname.includes("/en/")) {
      const newPath = pathname.replace("/en/", "/");
      history.replace(newPath);
    } else {
      setCheck(true);
    }
  };
  useEffect(() => {
    redirectPath();
  }, [pathname]);

  return <>{check && <h1>🚫 Page Not Found</h1>}</>;
}
