import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
export default function AddNewModal(props: any) {
  const [showChoseEvent, setShowChoseEvent] = useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Check Email
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Enter Email Address</label>
        <div className="d-flex ">
          <input type="text" className="form-control" />{" "}
          <Button onClick={() => setShowChoseEvent(true)}> check email</Button>
        </div>
        {showChoseEvent && (
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">First event</option>
            <option value="2">Second event</option>
            <option value="3">Third event</option>
          </Form.Select>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
