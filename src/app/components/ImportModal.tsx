import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
export default function ImportModal(props: any) {
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
          Upload Leads
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <span>Template CSV</span> <a>Download</a>
        </div>
        <div>
          <span>Example CSV</span> <a>Download</a>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
