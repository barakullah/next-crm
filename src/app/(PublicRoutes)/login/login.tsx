"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import OtpInput from "react-otp-input";
import logo from "../../../../public/images/atfx logo.svg";
import { fetcher } from "../../../lib/api";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "axios";

function AutoLayoutExample() {
  const history = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formFields, setFormFields]: any = useState({ email: null });
  const [message, setMessage]: any = useState({
    errorMessage: null,
    successMessage: null,
  });
  const [otp, setOtp] = useState("");
  const [enableBtn, setEnableBtn] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      setMessage((prev: any) => {
        return { ...prev, errorMessage: "Please enter Otp" };
      });
      setMessage((prev: any) => {
        return { ...prev, successMessage: null };
      });
    } else {
      try {
        setVerifyLoading(true);
        const data: any = await fetcher("/check_otp", {
          id: Cookies.get("userData"),
          otp,
        });
        Cookies.set("verified", "true", { expires: 30, path: "/" });

        history.push("/");
        setMessage((prev: any) => {
          return { ...prev, errorMessage: null };
        });
        setMessage((prev: any) => {
          return { ...prev, successMessage: "Login success" };
        });
        setVerifyLoading(false);
      } catch (error: any) {
        setVerifyLoading(false);
        setMessage((prev: any) => {
          return { ...prev, successMessage: null };
        });
        setMessage((prev: any) => {
          return { ...prev, errorMessage: error?.response?.data?.message };
        });
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setOtpLoading(true);
      const token: any = await executeRecaptcha?.("submit");
      const res = await axios.get("https://api.ipify.org/?format=json");
      const body = {
        email: formFields.email,
        captcha: token,
        ip: res?.data?.ip,
      };

      const data: any = await fetcher("/sale_send_otp", body);

      Cookies.set("userData", data?.data?.id, { expires: 30, path: "/" });
      Cookies.set("username", data?.data?.name, { expires: 30, path: "/" });
      Cookies.set("department", data?.data?.department, {
        expires: 30,
        path: "/",
      });
      Cookies.set("verified", "false", { expires: 30, path: "/" });
      Cookies.set("manager", data?.data?.manager, { expires: 30, path: "/" });
      Cookies.set("showAllLeads", data?.data?.show_all_leads, {
        expires: 30,
        path: "/",
      });
      Cookies.set("export", data?.data?.export, {
        expires: 30,
        path: "/",
      });
      data?.data?.id
        ? setMessage((prev: any) => {
            return { ...prev, successMessage: "Otp Sent Successfully" };
          })
        : setMessage((prev: any) => {
            return { ...prev, errorMessage: "Api Error !" };
          });
      setMessage((prev: any) => {
        return { ...prev, errorMessage: null };
      });
      setEnableBtn(true);
      setOtpLoading(false);
    } catch (error: any) {
      setOtpLoading(false);
      setMessage((prev: any) => {
        return { ...prev, errorMessage: error?.response?.data?.message };
      });
      setMessage((prev: any) => {
        return { ...prev, successMessage: null };
      });
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        {/* <Col>1 of 2</Col> */}
        <Col className="userDatailbox">
          <div className="mb-4 text-center">
            <Image alt="img" src={logo} width={97} height={30}></Image>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="col-md-12 col-xl-12 mb-3">
                <label className="d-block">Email Address</label>
                <input
                  onChange={(event) => {
                    event.target.value !== undefined &&
                      setFormFields((prev: any) => {
                        return { ...prev, email: event.target.value };
                      });
                  }}
                  required
                  value={formFields?.email}
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                />
              </div>
              <div className="otpBox">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={<span> </span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              {message.successMessage && (
                <span className="success-message">
                  {message.successMessage}
                </span>
              )}
              {message.errorMessage && (
                <span className="error-message">{message.errorMessage}</span>
              )}
              <div className="btnholder">
                {!enableBtn && (
                  <ButtonComponent
                    type="submit"
                    loading={otpLoading}
                    name="Send OTP"
                  />
                )}
                <Col>
                  {enableBtn && (
                    <ButtonComponent
                      type="button"
                      action={handleVerifyOtp}
                      loading={verifyLoading}
                      name="Login"
                    />
                  )}
                </Col>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;
