import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetcher } from "../../lib/api";
import ButtonComponent from "./ButtonComponent";
import { Select } from "antd";
import CountryList from "country-list-with-dial-code-and-flag";
import { countriesList } from "@/constants/CountriesList";
export default function AddEventModal(props: any) {
  const params = useParams();
  const countrieslisting = CountryList.getAll();

  const [eventsList, setEventsList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [btnLoading, setBtnLoadong] = useState(false);
  const [message, setMessage]: any = useState({
    errorMessage: null,
    successMessage: null,
  });

  const [addEventValues, setAddEventValues]: any = useState({
    eventId: "",
    confirmed: 1,
    status: "",
    clientMobile: "",
    code: "+971",
  });
  const getEventsList = async () => {
    try {
      const data: any = await fetcher("/list_events", {
        id: Cookies.get("userData"),
      });

      setEventsList(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getListStatus = async () => {
    try {
      const data: any = await fetcher("/list_status", {
        id: Cookies.get("userData"),
      });

      setStatusList(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
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
  const setSelectedEventValues = () => {
    setAddEventValues((prev: any) => {
      return {
        ...prev,
        eventId: props?.data?.event_id,
        confirmed: props?.data?.confirmed,
        status: props?.data?.status,
        clientMobile: props?.data?.mobile,
        code: props?.data?.country_code,
      };
    });
  };
  useEffect(() => {
    getEventsList();
    getListStatus();
    props.name === "Update"
      ? setSelectedEventValues()
      : setAddEventValues((prev: any) => {
          return {
            ...prev,
            clientMobile: props?.data?.mobile,
            code: props?.data?.code,
          };
        });
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
          {props?.name} Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label className="d-block">Select Event</label>
              <select
                value={addEventValues?.eventId}
                required
                className="form-select"
                aria-label="Default select example"
                onChange={(e) =>
                  setAddEventValues((prev: any) => {
                    return { ...prev, eventId: e.target.value };
                  })
                }
              >
                <option disabled selected value="">
                  {" "}
                  -- select an option --{" "}
                </option>
                {eventsList?.map((data: any) => (
                  <option value={data?.id}>{data?.title}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="d-block">Confirmed</label>
              <select
                required
                className="form-select"
                aria-label="Default select example"
                value={addEventValues?.confirmed}
                onChange={(e) =>
                  setAddEventValues((prev: any) => {
                    return { ...prev, confirmed: e.target.value };
                  })
                }
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="d-block">Select Status</label>
              <select
                required
                className="form-select"
                aria-label="Default select example"
                value={addEventValues?.status}
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
                {statusList?.map((data: any) => (
                  <option value={data?.id}>{data?.title}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-2 formBox">
              <label className="d-block">Client Mobile Number</label>
              <div className="row phoneNumber">
                <div className="col-md-4">
                  <Select
                    onChange={(value) => {
                      const code = value?.split("-")[1];
                      setAddEventValues((prev: any) => {
                        return { ...prev, code };
                      });
                    }}
                    value={addEventValues?.code}
                    showSearch
                    aria-label="Default select example"
                    className="form-select selectphone selectholder"
                  >
                    {countriesList?.map((data: any) => {
                      return (
                        // <option value={`${data?.countryName}-${data.dialCode}`}>
                        <option value={`${data?.countryName}-${data.dialCode}`}>
                          {data?.dialCode} {data?.countryName}
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
                    onChange={(e) =>
                      setAddEventValues((prev: any) => {
                        return { ...prev, clientMobile: e.target.value };
                      })
                    }
                    value={addEventValues?.clientMobile}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
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
