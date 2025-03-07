"use client";
import ButtonComponent from "@/app/components/ButtonComponent";
import DeleteEventModal from "@/app/components/DeleteEventModal copy";
import { useNotification } from "@/app/components/NotificationToast";
import { countriesList } from "@/constants/CountriesList";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Select } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fetcher } from "../../../../lib/api";
import AddEventModal from "../../../components/AddEventModal";
import RightDrawer from "../../../components/RightDrawer";
import MeetingScheduleModal from "@/app/components/MeetingScheduleModal";
import { checkLeadOwenerInLeadDetails } from "@/utils/generalUtilities";
import SkeletonLoader from "./skeletonLoader";

export default function AddLeads() {
  // const leadDetailsRedux = useSelector(
  //   (state: RootState) => state.leadsDetails.leadDetailsRedux
  // );
  const formRef = useRef<HTMLFormElement>(null);
  const previousPathname = useRef<string | null>(
    localStorage.getItem("previousPath") // Initialize with the stored path if available
  );
  const openNotification = useNotification();

  const params = useParams();
  const history = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const newSearchParams = new URLSearchParams(searchParams);
  const [leadDetails, setLeadDetails]: any = useState({});
  const [showEventModal, setShowEventModal]: any = useState(false);
  const [checkUserAccess, setCheckUserAccess]: any = useState(true);
  const [showMeetingModal, setShowMeetingModal]: any = useState(false);
  const [showDeleteModal, setShowDeleteModal]: any = useState(false);
  const [showEditEventModal, setShowEditEventModal]: any = useState(false);
  const [selectedEvent, setSelectedEvent]: any = useState(false);
  const [callApi, setCallApi]: any = useState(false);
  const [saveLoading, setSaveLoading]: any = useState(false);
  const [leadDetailValues, setLeadDetailValues]: any = useState({
    firstName: "",
    lastName: "",
    leadType: "",
    clientEmail: "",
    language: "",
    clientMobile: "",
    clientCountry: "",
    leadOwner: "",
    events: [],
    interestedInEvents: "",
    comments: "",
    code: "+971",
    countryCode: "",
    placeholder: "501234567",
  });
  const [dropdownData, setDropdownData]: any = useState({
    lang: [],
    type: [],
  });
  const handleEditEvent = (id: number) => {
    const selectedEvent = leadDetailValues?.events.filter(
      (data: any) => data?.id === id
    );
    setSelectedEvent(selectedEvent[0]);
    setShowEditEventModal(true);
  };
  const handleAddEvent = (e: any) => {
    e.preventDefault();
    setShowEventModal(true);
  };
  const handleScheduleMeeting = (e: any) => {
    e.preventDefault();
    setShowMeetingModal(true);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      lead_id: params?.id,
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
      code: leadDetailValues?.code,
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
      const data: any = await fetcher("/update_lead", {
        ...payload,
      });

      data && history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async (e: React.FormEvent) => {
    if (formRef.current !== null) {
      if (formRef.current.checkValidity()) {
        e.preventDefault();
        const payload: any = {
          lead_id: params?.id,
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
        try {
          setSaveLoading(true);

          await fetcher("/update_lead", {
            ...payload,
          });
          openNotification(
            "topRight",
            "success",
            "Lead updated successfully !"
          );
          setCallApi(true);
          setSaveLoading(false);
        } catch (error: any) {
          setSaveLoading(false);
          openNotification("topRight", "error", error?.response?.data?.message);

          console.log(error);
        }
      } else {
        formRef.current.reportValidity(); // Display validation messages
      }
    }
  };
  const handleDeleteEvent = async (id: number) => {
    const selectedEvent = leadDetailValues?.events.filter(
      (data: any) => data?.id === id
    );
    setSelectedEvent(selectedEvent[0]);
    setShowDeleteModal(true);
  };
  const getLeadDetails = async () => {
    // leadDetailsRedux.length===0?
    try {
      const data: any = await fetcher("/lead_details", {
        id: Cookies.get("userData"),
        lead_id: params?.id,
      });
      const checkUser = data?.data[0]?.sales.find(
        (val: any) => val.id === Cookies.get("userData") && val.selected === 1
      );
      const selectedUser = data?.data[0]?.sales.find(
        (val: any) => val.selected === 1
      );

      const accessEdit = checkLeadOwenerInLeadDetails(
        parseInt(selectedUser?.id)
      );

      if (
        selectedUser &&
        Cookies.get("manager") === "false" &&
        Cookies.get("showAllLeads") === "false"
      ) {
        setCheckUserAccess(accessEdit);
      } else {
        setCheckUserAccess(true);
      }

      getLeadType(selectedUser?.department);
      if (
        checkUser ||
        Cookies.get("manager") === "true" ||
        Cookies.get("showAllLeads") === "true" ||
        newSearchParams.has("search")
      ) {
        setLeadDetails(data?.data[0]);
        setLeadDetailValues((prev: any) => {
          return {
            ...prev,
            firstName: data?.data[0]?.first_name,
            lastName: data?.data[0]?.last_name,
            leadType: data?.data[0]?.lead_type_table,
            clientEmail: data?.data[0]?.email,
            language: data?.data[0]?.language,
            clientMobile: data?.data[0]?.mobile,
            leadOwner: data?.data[0]?.sales?.find(
              (val: any) => val.selected === 1
            )?.id,
            events: data?.data[0]?.events,
            interestedInEvents: data?.data[0]?.interested_in_upcoming_events,
            comments: data?.data[0]?.comments,
            code: data?.data[0]?.country_code,
          };
        });
        if (newSearchParams.has("search")) {
          assignSalesToLeadByDefault(data?.data[0]);
        }
        callApi && setCallApi(false);
      } else {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e: any) => {
    const result = leadDetails?.events?.filter((data: any) =>
      data[e.target.accessKey]
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    e.target.value === ""
      ? setLeadDetailValues((prev: any) => {
          return { ...prev, events: leadDetails.events };
        })
      : setLeadDetailValues((prev: any) => {
          return { ...prev, events: result };
        });
  };
  const getDropdownData = async () => {
    try {
      const data: any = await fetcher("/list_languages", {
        id: Cookies.get("userData"),
      });
      setDropdownData((prev: any) => {
        return { ...prev, lang: data?.data };
      });
    } catch (error) {}
  };
  const getLeadType = async (val: string) => {
    if (val) {
      var payload: any = { id: Cookies.get("userData"), department: val };
    } else {
      payload = { id: Cookies.get("userData") };
    }
    try {
      const data: any = await fetcher("/list_type", {
        ...payload,
      });

      setDropdownData((prev: any) => {
        return { ...prev, type: data?.data };
      });
    } catch (error) {}
  };
  const findSelectedSales = (payload: any) => {
    const selectedUser: any = payload?.sales.find(
      (val: any) => val.selected === 1
    )?.id;

    return selectedUser ? true : false;
  };
  const assignSalesToLeadByDefault = async (payloadVal: any) => {
    const checkSale = findSelectedSales(payloadVal);
    if (!checkSale) {
      const payload: any = {
        lead_id: params?.id,
        id: Cookies.get("userData"),
        email: payloadVal?.email,
        first_name: payloadVal?.first_name,
        last_name: payloadVal?.last_name,
        mobile: payloadVal?.mobile,
        type: payloadVal?.lead_type_table,
        language: payloadVal?.language,
        sales_id: Cookies.get("userData"),
        interested_in_upcoming_events:
          payloadVal?.interested_in_upcoming_events,
        comments: payloadVal?.comments,
        country_code: payloadVal?.country_code,
      };
      try {
        setSaveLoading(true);

        await fetcher("/update_lead", {
          ...payload,
        });
        // openNotification("topRight", "success", "Lead updated successfully !");
        setCallApi(true);
        setSaveLoading(false);
      } catch (error: any) {
        setSaveLoading(false);
        openNotification("topRight", "error", error?.response?.data?.message);

        console.log(error);
      }
    }
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
    getLeadDetails();
    getDropdownData();
    // getLeadType();
  }, [callApi]);

  // useEffect(() => {
  //   if (previousPathname.current && previousPathname.current !== path) {
  //     // Logic to run when the URL changes
  //     newSearchParams.delete("search");
  //     history.replace(
  //       `${window.location.pathname}?${newSearchParams.toString()}`
  //     );
  //     previousPathname.current = null;
  //     localStorage.setItem("previousPath", "");
  //     history.push("/");
  //   }

  //   // Update the previousPathname ref to the current path
  //   // Update the previous path in the ref and localStorage
  //   previousPathname.current = path;
  //   localStorage.setItem("previousPath", path); // Persist the path
  // }, [path]);
  return (
    <>
      {Object.entries(leadDetails).length !== 0 && (
        <div>
          <div className="infoBar">
            <div className="col-md-10">
              <strong className="inforTitle">Add Lead </strong>
              <ul className="infobarOptions">
                <li>
                  <RightDrawer
                    props={{ buttonText: "Logs", logs: leadDetails?.logs }}
                  />
                </li>
              </ul>
            </div>
            {/* <div className="col-md-2 text-end">
              <a href="" className="refresh">
                <Image src={refresh} alt="refresh" width={18} height={24} />
                Reset Filter
              </a>
            </div> */}
          </div>
          <div className="FormArea">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-lg-6 col-xl-4 mb-4 formBox">
                  <label className="d-block">First Name</label>
                  <input
                    onChange={(e) =>
                      setLeadDetailValues((prev: any) => {
                        return { ...prev, firstName: e.target.value };
                      })
                    }
                    value={leadDetailValues?.firstName}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6 col-xl-4 mb-4 formBox">
                  <label className="d-block">Last Name</label>
                  <input
                    onChange={(e) =>
                      setLeadDetailValues((prev: any) => {
                        return { ...prev, lastName: e.target.value };
                      })
                    }
                    value={leadDetailValues?.lastName}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6 col-xl-4 mb-4 formBox">
                  <label className="d-block">Lead Type</label>
                  <select
                    onChange={(e) =>
                      setLeadDetailValues((prev: any) => {
                        return { ...prev, leadType: e.target.value };
                      })
                    }
                    required
                    value={leadDetailValues?.leadType || ""}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option disabled selected value="">
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {dropdownData?.type?.map((data: any) => (
                      <option value={data?.id}>{data?.title}</option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-6 col-xl-4 mb-4 formBox">
                  <label className="d-block">Client E-mail</label>
                  <input
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
                <div className="col-lg-6 col-xl-4 mb-4 formBox">
                  <label className="d-block">Language</label>
                  <select
                    onChange={(e) => {
                      setLeadDetailValues((prev: any) => {
                        return { ...prev, language: e.target.value };
                      });
                    }}
                    required
                    value={leadDetailValues?.language || ""}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option disabled selected value="">
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {dropdownData?.lang?.map((data: any) => (
                      <option value={data?.id}>{data?.title}</option>
                    ))}
                  </select>
                </div>

                <div className="col-lg-6 col-xl-4 mb-4 formBox">
                  <label className="d-block">Client Mobile Number</label>
                  <div className="row phoneNumber">
                    <div className="col-md-4">
                      <Select
                        onChange={(value) => {
                          const code = value?.split("-")[1];
                          const countryCode = value?.split("-")[0];
                          const placeholder = countriesList.find(
                            (data) => data.dialCode === code
                          )?.exampleNumber;
                          setLeadDetailValues((prev: any) => {
                            return {
                              ...prev,
                              code,
                              countryCode,
                              placeholder,
                            };
                          });
                        }}
                        value={leadDetailValues?.code}
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
                    <div className="col-md-8 phLeft">
                      <input
                        required
                        pattern="^[0-9][0-9]*$"
                        title="+ sign is not allowed"
                        onChange={(e) => {
                          setLeadDetailValues((prev: any) => {
                            return { ...prev, clientMobile: e.target.value };
                          });
                          // handleMobileValues(e);
                        }}
                        placeholder={leadDetailValues?.placeholder}
                        value={leadDetailValues?.clientMobile}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-6 col-xl-4 mb-4 formBox">
                  <label className="d-block">Country</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    {leadDetails?.sales?.map((data: any) => (
                      <option value={data?.name}>{data?.name}</option>
                    ))}
                  </select>
                </div> */}
                <div className="col-lg-6 col-xl-4 mb-4 formBox">
                  <label className="d-block">Lead Owner</label>
                  <select
                    onChange={(e) =>
                      setLeadDetailValues((prev: any) => {
                        return { ...prev, leadOwner: e.target.value };
                      })
                    }
                    value={leadDetailValues?.leadOwner}
                    className="form-select"
                    aria-label="Default select example"
                    required
                  >
                    <option disabled selected value="">
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {leadDetails?.sales?.map((data: any) => (
                      <option value={data?.id}>{data?.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-lg-6 col-xl-4 mb-4 formBox">
                  <label className="d-block">
                    Interested In Upcoming Events
                  </label>
                  <select
                    className="form-select"
                    required
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
                    <option disabled selected value="">
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
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
                <div className="text-right">
                  {" "}
                  {!checkUserAccess && (
                    <span className="error-message ">
                      {" "}
                      Please Change lead owner to yourself first to add or edit
                      events.
                    </span>
                  )}
                </div>
                <div className="col-md-12 btnHolder my-3 text-end">
                  <Link href="/" className="btn btn-gray">
                    Cancel
                  </Link>
                  <button
                    className="btn btn-blue mx-2"
                    disabled={!checkUserAccess}
                    onClick={(e) => {
                      handleAddEvent(e);
                    }}
                  >
                    Add new Event
                  </button>
                  <ButtonComponent
                    loading={saveLoading}
                    name="Save"
                    type="submit"
                    action={handleSave}
                  />
                  <button className="btn btn-blue mx-2" type="submit">
                    Save & close
                  </button>
                  {/* <button
                    className="btn btn-blue mx-2"
                    onClick={(e) => {
                      handleScheduleMeeting(e);
                    }}
                  >
                    Schedule Meeting
                  </button> */}
                </div>
              </div>
            </form>
            {/* Row Two */}
            {leadDetails?.events?.length !== 0 && (
              <div className="importData table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      {/* <th scope="col">Id</th> */}
                      <th scope="col">Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Time & Date</th>
                      <th scope="col">Confirmed</th>
                      <th scope="col">Status</th>
                      <th scope="col">Attended</th>
                      <th scope="col">Lead Mobile</th>
                      <th scope="col">QR Scanned</th>
                      {/* <th scope="col">Confirmed</th> */}
                      {/* <th scope="col">QR Image</th> */}
                      {/* <th scope="col">Status</th> */}
                      <th scope="col">Actions</th>
                    </tr>
                    <tr>
                      {leadDetails?.events.length !== 0 &&
                        Object.keys(leadDetails?.events[0])
                          .slice(3)
                          .map((oneKey, i) => {
                            if (
                              i <
                              Object.keys(leadDetails?.events[0]).length - 1
                            ) {
                              return (
                                <th key={i} scope="col">
                                  <input
                                    disabled={
                                      (leadDetails?.events[0][oneKey] === 0 ||
                                        leadDetails?.events[0][oneKey] === 1) &&
                                      true
                                    }
                                    accessKey={oneKey}
                                    onChange={(e) => {
                                      handleSearch(e);
                                    }}
                                    type="text"
                                  />
                                </th>
                              );
                            }
                          })}
                    </tr>
                  </thead>
                  <tbody>
                    {leadDetailValues?.events?.map((data: any, key: number) => {
                      return (
                        <tr key={key}>
                          <td>{data?.name}</td>
                          <td>{data?.type}</td>
                          <td>{data?.time_date}</td>
                          <td>{data?.confirmed === 1 ? "Yes" : "No"}</td>
                          <td>
                            {data?.status == 1
                              ? "Valid"
                              : data?.status == 2
                              ? "InValid"
                              : data?.status == 3 && "No Answer"}
                          </td>
                          <td>{data?.attended === 1 ? "Yes" : "No"}</td>
                          <td>{data?.mobile}</td>
                          {/* <td>{data?.events?.[0]?.type}</td> */}

                          <td>{data?.qr_scanned === 1 ? "Yes" : "No"}</td>

                          <td>
                            <ul className="actions-style">
                              <li>
                                <span
                                  title="view & edit"
                                  className="pointer"
                                  onClick={() => handleEditEvent(data?.id)}
                                >
                                  {checkUserAccess && <EditOutlined />}
                                </span>
                              </li>
                              <li>
                                <span
                                  title="delete"
                                  className="pointer trash"
                                  onClick={() => handleDeleteEvent(data?.id)}
                                >
                                  {checkUserAccess && <DeleteOutlined />}
                                </span>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
      {showEventModal && (
        <AddEventModal
          setCallApi={setCallApi}
          name={"Add"}
          show={showEventModal}
          onHide={() => setShowEventModal(false)}
          // data={{
          //   mobile: leadDetails?.mobile,
          //   code: `${leadDetails?.countryCode}-${leadDetails.dialCode}`,
          // }}
          data={{
            mobile: leadDetailValues?.clientMobile,
            code: leadDetailValues?.code,
          }}
        />
      )}
      {showEditEventModal && (
        <AddEventModal
          setCallApi={setCallApi}
          name={"Update"}
          show={showEditEventModal}
          onHide={() => setShowEditEventModal(false)}
          data={selectedEvent}
        />
      )}
      {showMeetingModal && (
        <MeetingScheduleModal
          setCallApi={setCallApi}
          name={"Update"}
          show={showMeetingModal}
          onHide={() => setShowMeetingModal(false)}
          data={selectedEvent}
        />
      )}
      {showDeleteModal && (
        <DeleteEventModal
          setCallApi={setCallApi}
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          data={selectedEvent}
        />
      )}
    </>
  );
}
