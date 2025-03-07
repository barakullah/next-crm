import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
interface PropsType {
  props: {
    buttonText?: string;
    logs?: [];
  };
}
function RightDrawer({ props }: PropsType) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.buttonText}
      </Button>

      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Logs</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {props.logs?.map((data: any) => (
            <ul className="activityLogs">
              <li className="d-flex">
                <div className="leftSec">
                  <span className="d-block logtime">{data?.date}</span>
                </div>
                <div className="rightSec">
                  <p>
                    <span>
                      <strong>{data?.title}</strong> has been done by{" "}
                      <strong>{data?.by}</strong>
                    </span>
                    {data?.old_record !== "" && (
                      <span className="d-block">
                        <strong>Previous value:</strong> {data?.old_record}
                      </span>
                    )}
                    {data?.new_record !== "" && (
                      <span>
                        <strong>Updated value:</strong> {data?.new_record}
                      </span>
                    )}
                  </p>
                </div>
              </li>
            </ul>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default RightDrawer;
