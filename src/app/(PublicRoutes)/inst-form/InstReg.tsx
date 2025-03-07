"use client";
import ButtonComponent from "@/app/components/ButtonComponent";
import SuccessModal from "@/app/components/SuccessModal";
import { Select } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/images/atfxLogo2.svg";
import { fetcher } from "../../../lib/api";
import { countriesList } from "./CountriesList";
export default function InstReg() {
  // const { executeRecaptcha } = useGoogleReCaptcha();
  const param = useParams();
  const history = useRouter();
  const [formData, setFormData]: any = useState({
    listTypes: [],
    salesList: [],
  });
  const [btnLoading, setBtnLoading]: any = useState(false);
  const [errorMessage, setErrorMessage]: any = useState(false);
  const [openSuccessModal, setOpenSuccessModal]: any = useState(false);
  const [apiResponse, setApiResponse]: any = useState({});

  const [formValues, setFormValues]: any = useState({
    firstName: null,
    lastName: null,
    code: "+971",
    mobile: null,
    email: null,
    placeholder: "543213213",
    accountManager: {},
    leadType: "",
    comments: "",
    designation: "",
    companyName: "",
    othersValue: "",
    dateTime: "",
  });
  const getLeadTypes = async (val: string) => {
    try {
      const data1: any = await fetcher("/list_type", {
        department: val,
      });
      setFormData((prev: any) => {
        return { ...prev, listTypes: data1?.data };
      });
    } catch (error) {}
  };
  const getSalesList = async () => {
    try {
      const data: any = await fetcher("/list_sales", {
        department: 3,
      });
      if (data) {
        let data1: any = await fetcher("/list_type", {
          department: data?.data[0]?.department,
          id: Cookies.get("userData"),
        });
        data1 = data1?.data.sort(
          (a: any, b: any) => parseInt(a.order) - parseInt(b.order)
        );
        setFormData((prev: any) => {
          return { ...prev, listTypes: data1 };
        });
        setFormValues((prev: any) => {
          return { ...prev, leadType: data1[0]?.id };
        });
      }
      setFormValues((prev: any) => {
        return { ...prev, accountManager: data?.data[0] };
      });

      setFormData((prev: any) => {
        return { ...prev, salesList: data?.data };
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!executeRecaptcha) {
    //   console.error("ReCAPTCHA not yet loaded");
    //   return;
    // }
    // const res = await axios.get("https://api.ipify.org/?format=json");
    // const token = await executeRecaptcha("submit");
    const customString: string =
      formValues?.dateTime !== "" ? `dateTime: ${formValues?.dateTime} \n` : "";
    const customString1 =
      formValues?.comments !== "" ? `comments: ${formValues?.comments} \n` : "";
    const customString2 =
      formValues?.othersValue !== ""
        ? `others value: ${formValues?.othersValue}`
        : "";
    const finalString =
      (customString ?? customString) +
      (customString1 ?? customString1) +
      (customString2 ?? customString2);
    const payload = {
      first_name: formValues?.firstName,
      last_name: formValues?.lastName,
      mobile: formValues?.mobile,
      country_code: formValues?.code,
      email: formValues?.email,
      type: formValues?.leadType,
      // captcha: token,
      // ip: res?.data?.ip,
      language: "2",
      sales_id: formValues?.accountManager.id,
      comments: finalString,
      designation: formValues?.designation,
      company_name: formValues?.companyName,
    };
    try {
      setBtnLoading(true);

      // console.log("ReCAPTCHA token:", token);
      const data: any = await fetcher("/add_lead_all_sales", {
        ...payload,
      });
      setErrorMessage(false);
      setApiResponse(data?.data);
      setBtnLoading(false);
      setOpenSuccessModal(true);
    } catch (error: any) {
      setBtnLoading(false);
      setErrorMessage(error?.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getSalesList();
  }, []);

  useEffect(() => {
    setFormValues((prev: any) => {
      return {
        ...prev,
        firstName: "",
        lastName: "",
        code: "+971",
        mobile: "",
        email: "",
        placeholder: "543213213",
        // leadType: null,
        comments: "",
        designation: "",
        companyName: "",
        othersValue: "",
        dateTime: "",
      };
    });
  }, [openSuccessModal]);

  return (
    <>
      <div className="wrapper full-width addticket">
        <div className="mb-4 text-center">
          <div className="logoHolder text-left">
            <Image alt="img" src={logo} width={184} height={24}></Image>
          </div>
        </div>

        <div className="form_details connectRegister">
          {/* <span className="title full-width tpm navy_color text-center mt-20">
            Add
            <span className="navy_color">Ticket </span>
          </span> */}

          <form className="full-width mb-50" onSubmit={handleSubmit}>
            <div className="full-width  form_holder">
              <div className="form_text_details">
                <div className="full-width box_shadow form_style">
                  <div className="row">
                    <div className="col-md-12 mb-4 formBox">
                      <h2>ATFX Connect Registration</h2>
                      <select
                        onChange={(e: any) => {
                          const id = e.target.value.split("-")[0];
                          const department = e.target.value.split("-")[1];
                          const title = e.target.value.split("-")[2];
                          setFormValues((prev: any) => {
                            return {
                              ...prev,
                              accountManager: { id, department, title },
                            };
                          });
                          // getLeadTypes(department);
                        }}
                        aria-placeholder="Account Manager"
                        className="form-select"
                        aria-label="Default select example"
                        value={`${formValues.accountManager?.id}-${formValues.accountManager?.department}-${formValues.accountManager?.title}`}
                        required
                      >
                        <option>Select </option>
                        {formData.salesList.length !== 0 &&
                          formData.salesList.map((data: any) => (
                            <option
                              value={`${data?.id}-${data?.department}-${data?.title}`}
                            >
                              {data?.title}
                            </option>
                          ))}
                      </select>
                    </div>
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
                          value={formValues?.firstName}
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
                          value={formValues?.lastName}
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
                  <div className="row">
                    <div className="col-4 pr-10">
                      <div className="form-group">
                        <Select
                          onChange={(value) => {
                            setFormValues((prev: any) => {
                              const code = value.split("-")[1];
                              const placeholder = countriesList.find(
                                (data) => data.dialCode === code
                              )?.exampleNumber;
                              return { ...prev, code, placeholder };
                            });
                          }}
                          value={formValues?.code}
                          showSearch
                          className="form-select selectphone selectholder"
                          aria-label="Default select example"
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
                          pattern="^[0-9][0-9]*$"
                          title="+ sign is not allowed)"
                          onChange={(e) =>
                            setFormValues((prev: any) => {
                              return { ...prev, mobile: e.target.value };
                            })
                          }
                          placeholder={formValues?.placeholder}
                          value={formValues?.mobile}
                          type="tel"
                          inputMode="numeric"
                          className="form-control"
                          required
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
                        type="email"
                        className="form-control navy_color"
                        data-validation="email"
                        name="email"
                        id="email"
                        placeholder="E-mail "
                        value={formValues?.email}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <input
                        onChange={(e) =>
                          setFormValues((prev: any) => {
                            return { ...prev, companyName: e?.target?.value };
                          })
                        }
                        type="text"
                        className="form-control navy_color"
                        name="companyName"
                        placeholder="Company Name"
                        value={formValues?.companyName}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <input
                        onChange={(e) =>
                          setFormValues((prev: any) => {
                            return { ...prev, designation: e?.target?.value };
                          })
                        }
                        type="text"
                        className="form-control navy_color"
                        name="designation"
                        placeholder="Designation"
                        value={formValues?.designation}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="form-group radioGroup">
                      {formData?.listTypes?.map((data: any) => {
                        return (
                          data?.show === "1" && (
                            <label className="radioholder">
                              <input
                                type="radio"
                                id={data?.id}
                                required
                                name="radio"
                                checked={
                                  formValues?.leadType !== "" &&
                                  data?.id === formValues?.leadType &&
                                  true
                                }
                                value={data?.id}
                                onChange={(e: any) => {
                                  setFormValues((prev: any) => {
                                    return {
                                      ...prev,
                                      leadType: e?.target?.value,
                                    };
                                  });
                                }}
                              />
                              <span className="checkedradio">
                                {" "}
                                {data?.title}
                              </span>
                            </label>
                          )
                        );
                      })}
                    </div>
                  </div>
                  {(formValues?.leadType == 8 || formValues?.leadType == 9) && (
                    <div className="col-md-12 mb-2">
                      <div className="form-group">
                        <input
                          onChange={(e) =>
                            setFormValues((prev: any) => {
                              return { ...prev, othersValue: e?.target?.value };
                            })
                          }
                          type="text"
                          className="form-control navy_color"
                          name="others-value"
                          placeholder="Please Specify"
                          value={formValues?.othersValue}
                          required
                        />
                      </div>
                    </div>
                  )}
                  <div className="col-md-12 mb-2">
                    <div className="form-group selectholder">
                      {/* <input
                        onChange={(e) =>
                          setFormValues((prev: any) => {
                            return { ...prev, dateTime: e?.target?.value };
                          })
                        }
                        type="datetime-local"
                        className="form-control navy_color"
                        name="meeting"
                        placeholder="Schedule Meeting (Date & Time)"
                        value={formValues?.dateTime}
                        required
                      /> */}
                      <div
                        className={`custom-placeholder-wrapper ${
                          formValues?.dateTime ? "selecteddate" : ""
                        }`}
                      >
                        {!formValues?.dateTime && (
                          <span className="custom-placeholder">
                            Schedule Meeting (Date & Time)
                          </span>
                        )}
                        <input
                          onChange={(e) =>
                            setFormValues((prev: any) => {
                              return { ...prev, dateTime: e?.target?.value };
                            })
                          }
                          type="datetime-local"
                          className="form-control navy_color"
                          name="meeting"
                          value={formValues?.dateTime || ""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="form-group">
                      <input
                        onChange={(e) =>
                          setFormValues((prev: any) => {
                            return { ...prev, comments: e?.target?.value };
                          })
                        }
                        type="text"
                        className="form-control navy_color"
                        name="comments"
                        value={formValues?.comments}
                        placeholder="Comments"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <span className="error-message">{errorMessage}</span>
                  )}
                  <ButtonComponent
                    loading={btnLoading}
                    type="submit"
                    name="Register Now"
                    classes="mb-3 col-md-12"
                  />

                  <div className="col-field col-sm-12 FormResult full-width status  text-left"></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {openSuccessModal && (
        <SuccessModal
          // setCallApi={setCallApi}
          data={apiResponse}
          accountManager={formValues?.accountManager}
          name={"Success"}
          className="successmodel"
          show={openSuccessModal}
          onHide={() => setOpenSuccessModal(false)}
          // data={details}
        />
      )}
    </>
  );
}
