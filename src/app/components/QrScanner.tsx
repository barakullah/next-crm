"use client";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

export default function QrScanner({ onScan }: any) {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const requestCameraAccess = async () => {
      try {
        // Request camera permission immediately
        await navigator.mediaDevices.getUserMedia({ video: true });

        // Initialize the QR scanner
        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        html5QrCode.start(
          { facingMode: "environment" }, // Use the back camera
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            onScan(decodedText);
            html5QrCode.stop().catch(console.error);
          },
          (errorMessage) => {
            console.log(errorMessage);
          }
        );
      } catch (error) {
        console.error("Camera permission denied:", error);
      }
    };

    requestCameraAccess();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [onScan]);

  return <div id="reader" style={{ width: "600px" }}></div>;
}
