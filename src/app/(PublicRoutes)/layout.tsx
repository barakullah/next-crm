// Importing the Bootstrap CSS
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import AuthWrapper from "../components/auth/AuthWrapper";
import "../globals.css";
import { NotificationProvider } from "../components/NotificationToast";
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_SITE_KEY || ""}
    >
      <NotificationProvider>{children}</NotificationProvider>
    </GoogleReCaptchaProvider>
  );
}
export default RootLayout;
