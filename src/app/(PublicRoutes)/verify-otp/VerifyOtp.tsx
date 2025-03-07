"use client";
import { fetcher } from "../../../lib/api";
import { useState } from "react";
import { Button } from "react-bootstrap";
import OtpInput from "react-otp-input";
import Cookies from "js-cookie";

export default function Register() {
  const [otp, setOtp] = useState("");
  const handleVerifyOtp = async () => {
    const data: any = await fetcher("/check_otp", {
      id: Cookies.get("userData"),
      otp,
    });
  };
  return (
    <div className="wrapper">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span> </span>}
        renderInput={(props) => <input {...props} />}
      />
      <Button onClick={handleVerifyOtp}>Verify</Button>
    </div>
  );
}
