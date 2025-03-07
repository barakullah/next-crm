"use client";
import { useNotification } from "@/app/components/NotificationToast";
import { countriesList } from "@/constants/CountriesList";
import { fetcher } from "@/lib/api";
import { Select } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
export default function AddLeads() {
  const [dropdownData, setDropdownData]: any = useState({
    lang: [],
    type: [],
  });
  const openNotification = useNotification();
  const history = useRouter();
  const codeRef: any = useRef(null);
  const [leadDetailValues, setLeadDetailValues]: any = useState({
    firstName: "",
    lastName: "",
    leadType: "1",
    clientEmail: "",
    language: "1",
    clientMobile: "",
    clientCountry: "",
    leadOwner: Cookies.get("userData"),
    events: [],
    interestedInEvents: "",
    comments: "",
    code: "",
    placeholder: "501234567",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      id: Cookies.get("userData"),
      email: leadDetailValues?.clientEmail,
      first_name: leadDetailValues?.firstName,
      last_name: leadDetailValues?.lastName,
      mobile: leadDetailValues?.clientMobile,
      type: leadDetailValues?.leadType,
      language: leadDetailValues?.language,
      sales_id: leadDetailValues?.leadOwner,
      interested_in_upcoming_events: leadDetailValues?.interestedInEvents,
      comments: leadDetailValues?.comments,
      country_code: leadDetailValues?.code,
    };
    const code = parseInt(leadDetailValues?.code).toString();
    if (leadDetailValues?.clientMobile.startsWith(code)) {
      openNotification(
        "topRight",
        "error",
        "Please remove the duplicate country code"
      );
      return;
    }
    try {
      const data: any = await fetcher("/add_lead", {
        ...payload,
      });
      openNotification("topRight", "success", "Lead added successfully !");

      data && history.push(`/add-leads/${data?.data?.lead_id}`);
    } catch (error: any) {
      openNotification("topRight", "error", error?.response?.data?.message);

      console.log(error);
    }
  };
  const getLanguages = async () => {
    try {
      const data: any = await fetcher("/list_languages", {
        id: Cookies.get("userData"),
      });

      setDropdownData((prev: any) => {
        return { ...prev, lang: data?.data };
      });
    } catch (error) {}
  };
  const getLeadType = async () => {
    try {
      const data: any = await fetcher("/list_type", {
        id: Cookies.get("userData"),
        department: Cookies.get("department"),
      });

      setDropdownData((prev: any) => {
        return { ...prev, type: data?.data };
      });
    } catch (error) {}
  };
  const handleMobileValues = (e: any) => {
    const input = e?.target;
    const value = e?.target?.value;

    if (value?.length < leadDetailValues?.placeholder?.length) {
      input.setCustomValidity(
        `Mobile number should be in this format e.g. ${leadDetailValues?.placeholder}`
      );
    } else {
      input.setCustomValidity("");
    }
    // Trigger the browser's validation message
    input.reportValidity();
  };

  useEffect(() => {
    getLanguages();
    getLeadType();
  }, []);

  return (
    <>
      <div className="infoBar">
        <div className="col-md-10">
          <strong className="inforTitle">Add Lead </strong>
          {/* <ul className="infobarOptions">
            <li>
              <RightDrawer
                props={{ buttonText: "Logs", logs: leadDetails?.logs }}
              />
            </li>
          </ul> */}
        </div>
        {/* <div className="col-md-2 text-end">
                <a href="" className="refresh">
                  <Image src={refresh} alt="refresh" width={18} height={24} />
                  Reset Filter
                </a>
              </div> */}
      </div>
      <div className="FormArea">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-lg-4 mb-4 formBox">
              <label className="d-block">First Name</label>
              <input
                onChange={(e) =>
                  setLeadDetailValues((prev: any) => {
                    return { ...prev, firstName: e.target.value };
                  })
                }
                required
                value={leadDetailValues?.firstName}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-lg-4 mb-4 formBox">
              <label className="d-block">Last Name</label>
              <input
                onChange={(e) =>
                  setLeadDetailValues((prev: any) => {
                    return { ...prev, lastName: e.target.value };
                  })
                }
                required
                value={leadDetailValues?.lastName}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-lg-4 mb-4 formBox">
              <label className="d-block">Lead Type</label>
              <select
                onChange={(e) =>
                  setLeadDetailValues((prev: any) => {
                    return { ...prev, leadType: e.target.value };
                  })
                }
                required
                value={leadDetailValues?.leadType}
                className="form-select"
                aria-label="Default select example"
              >
                {dropdownData?.type?.map((data: any) => (
                  <option value={data?.id}>{data?.title}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-4 mb-4 formBox">
              <label className="d-block">Client E-mail</label>
              <input
                required
                onChange={(e) =>
                  setLeadDetailValues((prev: any) => {
                    return { ...prev, clientEmail: e.target.value };
                  })
                }
                value={leadDetailValues?.clientEmail}
                type="email"
                className="form-control"
              />
            </div>
            <div className="col-lg-4 mb-4 formBox">
              <label className="d-block">Language</label>
              <select
                required
                onChange={(e) => {
                  setLeadDetailValues((prev: any) => {
                    return { ...prev, language: e.target.value };
                  });
                }}
                value={leadDetailValues?.language}
                className="form-select"
                aria-label="Default select example"
              >
                {dropdownData?.lang?.map((data: any) => (
                  <option value={data?.id}>{data?.title}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-4 mb-4 formBox">
              <label className="d-block">Client Mobile Number</label>
              <div className="row phoneNumber">
                <div className="col-lg-4">
                  <Select
                    onChange={(value) => {
                      setLeadDetailValues((prev: any) => {
                        const code = value.split("-")[1];
                        const placeholder = countriesList.find(
                          (data) => data.dialCode === code
                        )?.exampleNumber;

                        return { ...prev, code, placeholder };
                      });
                    }}
                    value={leadDetailValues?.code}
                    showSearch
                    aria-label="Default select example"
                  >
                    <option disabled selected value="">
                      {" "}
                      select an option
                    </option>
                    {countriesList?.map((data: any) => {
                      return (
                        <option value={`${data?.countryName}-${data.dialCode}`}>
                          {data?.countryName}
                          {data?.dialCode}
                        </option>
                      );
                    })}
                  </Select>
                </div>
                <div className="col-lg-8 phLeft">
                  <input
                    required
                    pattern="^[0-9][0-9]*$"
                    title="+ sign is not allowed)"
                    onChange={(e) => {
                      setLeadDetailValues((prev: any) => {
                        return { ...prev, clientMobile: e.target.value };
                      });
                      // handleMobileValues(e);
                    }}
                    value={leadDetailValues?.clientMobile}
                    placeholder={leadDetailValues?.placeholder}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4 formBox">
              <label className="d-block">Lead Owner</label>
              <select
                required
                onChange={(e) =>
                  setLeadDetailValues((prev: any) => {
                    return { ...prev, leadOwner: e.target.value };
                  })
                }
                value={leadDetailValues?.leadOwner}
                className="form-select"
                aria-label="Default select example"
              >
                <option value={Cookies.get("userData")}>
                  {Cookies.get("username")}
                </option>
              </select>
            </div>

            <div className="col-lg-4 mb-4 formBox">
              <label className="d-block">Interested In Upcoming Events</label>
              <select
                required
                className="form-select"
                aria-label="Default select example"
                value={leadDetailValues?.interestedInEvents}
                onChange={(e) =>
                  setLeadDetailValues((prev: any) => {
                    return {
                      ...prev,
                      interestedInEvents: e.target.value,
                    };
                  })
                }
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
                <option value="">N/A</option>
              </select>
            </div>
            <div className="col-md-12 mb-4 formBox">
              <label className="d-block">Comments</label>
              <textarea
                onChange={(e) =>
                  setLeadDetailValues((prev: any) => {
                    return { ...prev, comments: e.target.value };
                  })
                }
                value={leadDetailValues?.comments}
                className="form-control"
              ></textarea>
            </div>
            <div className="col-md-12 btnHolder my-3 text-end">
              <Link href="/" className="btn btn-gray">
                Cancel
              </Link>
              <button className="btn btn-blue save" type="submit">
                Save & Close
              </button>

              {/* <a href="" className="btn btn-blue">
                Save & New
              </a> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
