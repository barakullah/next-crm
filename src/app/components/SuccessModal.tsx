import Modal from "react-bootstrap/Modal";
export default function SuccessModal(props: any) {
  console.log("props are", props);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="text-center">
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="21.5" cy="21.5" r="21" fill="#40C7A3" />
              <path
                d="M12 21.5L18.5 28L33 13.5"
                stroke="white"
                stroke-width="2"
              />
            </svg>
          </div>
          {/* {props?.name} Event */}

          <h1>Sent Successfully!</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="wrapper">
          <div className="row userData">
            <div className="col-md-6">Account Manager</div>
            <div className="col-md-6">{props?.accountManager?.title}</div>{" "}
            <div className="col-md-6">First Name:</div>
            <div className="col-md-6">{props?.data?.first_name}</div>{" "}
            <div className="col-md-6">Last Name:</div>
            <div className="col-md-6">{props?.data?.last_name}</div>
            <div className="col-md-6">E-mail Address:</div>
            <div className="col-md-6">{props?.data?.email}</div>
            <div className="col-md-6">Company Name:</div>
            <div className="col-md-6">{props?.data?.company}</div>
            <div className="col-md-6">Designation:</div>
            <div className="col-md-6">{props?.data?.designation}</div>
            <div className="col-md-6">Details:</div>
            <div className="col-md-6">
              {props?.data?.comments !== "" ? props?.data?.comments : "N/A"}
            </div>
          </div>
          <button
            className="btn btn-blue mt-3 col-md-12 registernewbtn"
            type="submit"
            onClick={props?.onHide}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 12.5C12.381 12.5 13.631 11.94 14.536 11.035C15.44 10.131 16 8.881 16 7.5C16 6.119 15.44 4.869 14.536 3.965C13.631 3.06 12.381 2.5 11 2.5C9.619 2.5 8.369 3.06 7.464 3.965C6.56 4.869 6 6.119 6 7.5C6 8.881 6.56 10.131 7.464 11.035C7.9283 11.4994 8.47956 11.8679 9.08627 12.1192C9.69298 12.3706 10.3433 12.5 11 12.5ZM11 19.5C14.518 19.5 17 18.5 17 17.5C17 15.5 14.646 13.5 11 13.5C7.25 13.5 5 15.5 5 17.5C5 18.5 7.25 19.5 11 19.5ZM23 10.5H21V8.5C21 8.23478 20.8946 7.98043 20.7071 7.79289C20.5196 7.60536 20.2652 7.5 20 7.5C19.7348 7.5 19.4804 7.60536 19.2929 7.79289C19.1054 7.98043 19 8.23478 19 8.5V10.5H17C16.7348 10.5 16.4804 10.6054 16.2929 10.7929C16.1054 10.9804 16 11.2348 16 11.5C16 11.7652 16.1054 12.0196 16.2929 12.2071C16.4804 12.3946 16.7348 12.5 17 12.5H19V14.5C19 14.7652 19.1054 15.0196 19.2929 15.2071C19.4804 15.3946 19.7348 15.5 20 15.5C20.2652 15.5 20.5196 15.3946 20.7071 15.2071C20.8946 15.0196 21 14.7652 21 14.5V12.5H23C23.2652 12.5 23.5196 12.3946 23.7071 12.2071C23.8946 12.0196 24 11.7652 24 11.5C24 11.2348 23.8946 10.9804 23.7071 10.7929C23.5196 10.6054 23.2652 10.5 23 10.5Z"
                fill="white"
              />
            </svg>
            Register New
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
