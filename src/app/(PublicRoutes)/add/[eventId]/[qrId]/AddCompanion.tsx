"use client";
import ButtonComponent from "@/app/components/ButtonComponent";
import CountryList from "country-list-with-dial-code-and-flag";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import logo from "../../../../../../public/images/atfx logo.svg";
import { fetcher } from "../../../../../lib/api";

import axios from "axios";
import { Select } from "antd";
import { countriesList } from "@/constants/CountriesList";
import { Placeholder } from "react-bootstrap";
export default function AddCompanion() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const param = useParams();
  const history = useRouter();
  const [eventDetails, setEventDetails]: any = useState({});
  const [btnLoading, setBtnLoading]: any = useState(false);
  const [errorMessage, setErrorMessage]: any = useState(false);

  const [formValues, setFormValues]: any = useState({
    firstName: null,
    lastName: null,
    code: "+971",
    mobile: null,
    email: null,
    experience: null,
    placeholder: "501234567",
  });
  const getQrEventDetails = async () => {
    try {
      const data: any = await fetcher("/qr_event_details", {
        event_id: param?.eventId,
        qr: param?.qrId,
      });
      setEventDetails(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.error("ReCAPTCHA not yet loaded");
      return;
    }
    const res = await axios.get("https://api.ipify.org/?format=json");
    const token = await executeRecaptcha("submit");
    const payload = {
      event_id: param?.eventId,
      first_name: formValues?.firstName,
      last_name: formValues?.lastName,
      mobile: formValues?.mobile,
      country_code: formValues?.code,
      email: formValues?.email,
      experience: formValues?.experience,
      lead_id: eventDetails?.id,
      captcha: token,
      ip: res?.data?.ip,
    };
    try {
      setBtnLoading(true);

      console.log("ReCAPTCHA token:", token);
      const data: any = await fetcher("/add_by_referer", {
        ...payload,
      });
      setBtnLoading(false);

      data &&
        history.push(`/companion-thankyou/${param.eventId}/${param.qrId}`);
    } catch (error: any) {
      // setRefreshReCaptcha(!refreshReCaptcha);

      setBtnLoading(false);
      setErrorMessage(error?.response?.data?.message);
      console.log(error);
    }
  };
  const handleMobileValues = (e: any) => {
    const input = e?.target;
    const value = e?.target?.value;

    if (value?.length < formValues?.placeholder?.length) {
      input.setCustomValidity(
        `Mobile number should be in this format e.g. ${formValues?.placeholder}`
      );
    } else {
      input.setCustomValidity("");
    }
    // Trigger the browser's validation message
    input.reportValidity();
  };

  useEffect(() => {
    getQrEventDetails();
  }, []);

  return (
    <>
      <div className="wrapper full-width addticket">
        <div className="mb-4 text-center">
          <Image alt="img" src={logo} width={97} height={30}></Image>
        </div>

        <div className="form_details ">
          <span className="title full-width tpm navy_color text-center mt-20">
            Add
            <span className="navy_color">Ticket </span>
          </span>

          <form className="full-width mb-50" onSubmit={handleSubmit}>
            <div className="full-width  form_holder">
              <div className="form_text_details">
                <div className="full-width box_shadow form_style">
                  <div className="row">
                    <div className="col-md-6 pr-md-10">
                      <div className="form-group">
                        <input
                          onChange={(e) =>
                            setFormValues((prev: any) => {
                              return { ...prev, firstName: e?.target?.value };
                            })
                          }
                          type="text"
                          className="form-control pr-md-10"
                          data-validation="length alphanumeric"
                          data-validation-length="3-12"
                          name="firstName"
                          required
                          placeholder="First name"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 pl-md-10">
                      <div className="form-group">
                        <input
                          onChange={(e) =>
                            setFormValues((prev: any) => {
                              return { ...prev, lastName: e?.target?.value };
                            })
                          }
                          type="text"
                          className="form-control"
                          placeholder="Last name"
                          data-validation="length alphanumeric"
                          data-validation-length="3-12"
                          required
                          name="lastName"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row phoneNumber">
                    <div className="col-4 pr-10">
                      <div className="form-group">
                        <Select
                          onChange={(value) =>
                            setFormValues((prev: any) => {
                              const code = value.split("-")[1];
                              const placeholder = countriesList.find(
                                (data) => data.dialCode === code
                              )?.exampleNumber;
                              return { ...prev, code, placeholder };
                            })
                          }
                          value={formValues?.code}
                          showSearch
                          aria-label="Default select example"
                          className="form-select selectphone selectholder"
                        >
                          {countriesList?.map((data: any) => {
                            return (
                              <option
                                value={`${data?.countryName}-${data.dialCode}`}
                              >
                                {data?.countryName}
                                {data?.dialCode}
                              </option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                    <div className="col-8 pl-10">
                      <div className="form-group">
                        <input
                          placeholder={formValues?.placeholder}
                          pattern="^[0-9][0-9]*$"
                          title="+ sign is not allowed)"
                          onChange={(e) => {
                            setFormValues((prev: any) => {
                              return { ...prev, mobile: e.target.value };
                            });
                            handleMobileValues(e);
                          }}
                          // onBlur={handleMobileValues}
                          value={formValues?.mobile}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <input
                        onChange={(e) =>
                          setFormValues((prev: any) => {
                            return { ...prev, email: e?.target?.value };
                          })
                        }
                        type="text"
                        className="form-control navy_color"
                        data-validation="email"
                        name="email"
                        id="email"
                        required
                        placeholder="E-mail "
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <select
                        onChange={(e) =>
                          setFormValues((prev: any) => {
                            return { ...prev, experience: e.target.value };
                          })
                        }
                        required
                        value={formValues?.experience || ""}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option disabled selected value="">
                          {" "}
                          Trading Experience
                        </option>
                        <option value="No Experiance">No Experiance</option>

                        <option value="0-6 months (Beginner)">
                          0-6 months (Beginner)
                        </option>

                        <option value="6-12 months (Intermediate)">
                          6-12 months (Intermediate)
                        </option>

                        <option value="1+ year (Advanced)">
                          1+ year (Advanced)
                        </option>
                      </select>
                    </div>
                  </div>

                  {errorMessage && (
                    <span className="error-message">{errorMessage}</span>
                  )}
                  {/* <button
                      className="btn btn-blue mb-3 col-md-12"
                      type="submit"
                    >
                      Add
                    </button> */}

                  <ButtonComponent
                    loading={btnLoading}
                    type="submit"
                    name="add"
                    classes="mb-3 col-md-12"
                  />
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/ticket/${param?.eventId}/${param?.qrId}`}
                    className="text-center"
                  >
                    Cancel
                  </a>
                  <div className="col-field col-sm-12 FormResult full-width status  text-left"></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
