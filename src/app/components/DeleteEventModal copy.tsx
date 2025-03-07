import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetcher } from "../../lib/api";
import ButtonComponent from "./ButtonComponent";
export default function DeleteEventModal(props: any) {
  const params = useParams();
  const [btnLoading, setBtnLoadong] = useState(false);
  const [message, setMessage]: any = useState({
    errorMessage: null,
    successMessage: null,
  });

  const handleDelete = async () => {
    const payload = {
      id: Cookies.get("userData"),
      record_id: props?.data?.id,
      lead_id: params?.id,
      event_id: props?.data?.event_id,
    };
    try {
      setBtnLoadong(true);

      const data: any = await fetcher("/delete_event_to_lead", {
        ...payload,
      });
      data && props?.setCallApi(true);
      setBtnLoadong(false);
      setMessage((prev: any) => {
        return { ...prev, successMessage: "Event Deleted Successfully" };
      });
      data && props.onHide();
    } catch (error: any) {
      setBtnLoadong(false);
      setMessage((prev: any) => {
        return { ...prev, errorMessage: error?.response?.data?.message };
      });
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Are you sure you want to delete event ?</span>
      </Modal.Body>
      <Modal.Footer>
        <ButtonComponent
          action={handleDelete}
          loading={btnLoading}
          name={"Yes"}
        />

        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}
