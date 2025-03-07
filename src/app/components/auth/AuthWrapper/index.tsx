"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
    function checkAuth() {
      const token = Cookies.get("userData");
      const token1 = Cookies.get("verified");
      if (token && token1 === "true") {
        setIsAuthenticated(true);
      } else {
        router.push("/login");
      }
    }

    useEffect(() => {
      checkAuth();
    }, []);

    return isAuthenticated && <Component {...props} />;
  };
}
