"use client";
import { useEffect, useState } from "react";
import QrScanner from "@/app/components/QrScanner";
import { fetcher } from "@/lib/api";
import Cookies from "js-cookie";

export default function Page() {
  const [result, setResult] = useState("");
  const [qrData, setQrData]: any = useState(null);
  const apiCall = async () => {
    try {
      const data: any = await fetcher("/scan_qr", {
        id: Cookies.get("userData"),
        code: result,
      });
      setQrData(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    result !== "" && apiCall();
  }, [result]);
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">QR Code Scanner</h1>
      <QrScanner onScan={setResult} />
      {qrData && (
        <>
          <p className="mt-4">Event: {qrData?.event}</p>
          <p className="mt-4">Name: {qrData?.name}</p>
          <p className="mt-4">Sales: {qrData?.sales}</p>
          <p className="mt-4">Total Attendees: {qrData?.total_attendees}</p>
        </>
      )}
    </div>
  );
}
