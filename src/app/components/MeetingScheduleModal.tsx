import { nationalities } from "@/constants/CountriesList";
import { Select } from "antd";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetcher } from "../../lib/api";
import ButtonComponent from "./ButtonComponent";
import { useNotification } from "./NotificationToast";
import SkeletonLoader from "../(PrivateRoutes)/add-leads/[id]/skeletonLoader";
export default function MeetingScheduleModal(props: any) {
  const openNotification = useNotification();
  const params = useParams();
  const [scheduleList, setScheduleList] = useState([]);
  const [btnLoading, setBtnLoadong] = useState(false);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [message, setMessage]: any = useState({
    errorMessage: null,
    successMessage: null,
  });

  const [addEventValues, setAddEventValues]: any = useState({
    dateTime: "",
    status: "",
    nationality: "ARE",
    experience: "",
    broker: "",
    depositAmount: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (props.name === "Update") {
      const payload = {
        id: Cookies.get("userData"),
        record_id: props?.data?.id,
        lead_id: params?.id,
        event_id: addEventValues?.eventId,
        confirmed: addEventValues?.confirmed,
        status: addEventValues?.status,
        mobile: addEventValues?.clientMobile,
        delete: 0,
        country_code: addEventValues?.code,
      };
      try {
        setBtnLoadong(true);

        const data: any = await fetcher("/update_event_to_lead", {
          ...payload,
        });
        data && props?.setCallApi(true);
        setBtnLoadong(false);
        setMessage((prev: any) => {
          return { ...prev, successMessage: "Event addedd Successfully" };
        });
        data && props.onHide();
      } catch (error: any) {
        setBtnLoadong(false);
        setMessage((prev: any) => {
          return { ...prev, errorMessage: error?.response?.data?.message };
        });
        console.log(error);
      }
    } else {
      const payload = {
        id: Cookies.get("userData"),
        lead_id: params?.id,
        event_id: addEventValues?.eventId,
        confirmed: addEventValues?.confirmed,
        status: addEventValues?.status,
        mobile: addEventValues?.clientMobile,
        country_code: addEventValues?.code,
      };
      try {
        setBtnLoadong(true);

        const data: any = await fetcher("/add_event_to_lead", {
          ...payload,
        });
        setBtnLoadong(false);
        setMessage((prev: any) => {
          return { ...prev, successMessage: "Event Updated Successfully" };
        });
        data && props?.setCallApi(true);
        data && props.onHide();
      } catch (error: any) {
        setBtnLoadong(false);
        setMessage((prev: any) => {
          return { ...prev, errorMessage: error?.response?.data?.message };
        });

        console.log(error);
      }
    }
  };
  const fetchListScheduleOptions = async () => {
    try {
      setSkeletonLoader(true);
      const data: any = await fetcher("/list_schedule_options", {});
      setScheduleList(data?.data);
      setSkeletonLoader(false);
    } catch (error: any) {
      openNotification("topRight", "error", error?.response?.data?.message);
      setSkeletonLoader(false);
    }
  };
  useEffect(() => {
    fetchListScheduleOptions();
  }, []);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Schedule Meeting
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <h6>To be filled by Market Analysts</h6>
          <div className="row">
            <div className="col-md-6">
              {/* <label className="d-block">Select Event</label> */}
              <select
                value={addEventValues?.status}
                required
                className="form-select"
                aria-label="Default select example"
                onChange={(e) =>
                  setAddEventValues((prev: any) => {
                    return { ...prev, status: e.target.value };
                  })
                }
              >
                <option disabled selected value="">
                  {" "}
                  -- select an option --{" "}
                </option>
                <option value="1">Accept</option>
                <option value="0">Reject</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                onChange={(e) =>
                  setAddEventValues((prev: any) => {
                    return { ...prev, dateTime: e?.target?.value };
                  })
                }
                type="datetime-local"
                className="form-control navy_color"
                name="meeting"
                required
                value={addEventValues?.dateTime || ""}
              />
            </div>
          </div>
          <h6>To be filled by Sales</h6>

          <div className="row">
            <div className="col-md-6">
              <label className="d-block">Nationality</label>
              <Select
                value={addEventValues?.nationality}
                className="form-select"
                aria-label="Default select example"
                onChange={(e) =>
                  setAddEventValues((prev: any) => {
                    return { ...prev, nationality: e.target.value };
                  })
                }
                showSearch
              >
                <option disabled selected value="">
                  {" "}
                  -- select an option --{" "}
                </option>
                {nationalities?.map((data: any) => (
                  <option value={data?.alpha_3_code}>
                    {data?.nationality}
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-md-6">
              <label className="d-block">Experience</label>
              <select
                required
                className="form-select"
                aria-label="Default select example"
                value={addEventValues?.experience}
                onChange={(e) =>
                  setAddEventValues((prev: any) => {
                    return { ...prev, experience: e.target.value };
                  })
                }
              >
                <option disabled selected value="">
                  {" "}
                  -- select an option --{" "}
                </option>
                <option value={"1-2"}>1-2 years</option>
                <option value={"2-3"}>2-3 years</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="d-block">Current Broker</label>
              <input className="form-control" type="text" />
            </div>

            <div className="col-md-6 ">
              <label className="d-block">Deposit Amount</label>

              <select
                onChange={(value) =>
                  setAddEventValues((prev: any) => {
                    return { ...prev, depositAmount: value };
                  })
                }
                value={addEventValues?.depositAmount}
                required
                aria-label="Default select example"
                className="form-select selectphone selectholder"
              >
                <option disabled selected value="">
                  -- select an option --
                </option>
                <option selected value="1000">
                  1000
                </option>
                <option selected value="5000">
                  5000
                </option>
              </select>
            </div>
            <div className="mt-4">
              <h6>Please select meeting topic</h6>
            </div>
            {true ? (
              <SkeletonLoader />
            ) : (
              <div className="row">
                {scheduleList?.map((data: any) => (
                  <div className="col-md-6">
                    {" "}
                    <input
                      type="radio"
                      id={data?.id}
                      required
                      name="radio"
                      // checked={
                      //   formValues?.leadType !== "" &&
                      //   data?.id === formValues?.leadType &&
                      //   true
                      // }
                      // valuse={data?.id}
                      // onChange={(e: any) => {
                      //   setFormValues((prev: any) => {
                      //     return {
                      //       ...prev,
                      //       leadType: e?.target?.value,
                      //     };
                      //   });
                      // }}
                    />
                    <label>{data?.title}</label>
                  </div>
                ))}
              </div>
            )}
            {message.errorMessage && (
              <span className=" error-message">{message.errorMessage}</span>
            )}
            {message.successMessage && (
              <span className="success-message">{message.successMessage}</span>
            )}
            {/* <ButtonComponent loading={btnLoading} name={props.name} /> */}
            <div className="text-center pt-4">
              <Modal.Footer>
                <ButtonComponent
                  loading={btnLoading}
                  name={props.name}
                  classes="event-btn"
                />
                <Button onClick={props.onHide} className="btn btn-gray">
                  Close
                </Button>
              </Modal.Footer>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
