"use client";
import { fetcher } from "../../../../../lib/api";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../../../public/images/atfx logo.svg";

export default function Reject() {
  const param = useParams();
  const history = useRouter();
  const [eventDetails, setEventDetails]: any = useState({});
  const getQrEventDetails = async () => {
    try {
      const data: any = await fetcher("/qr_event_details", {
        event_id: param?.eventId,
        qr: param?.qrId,
      });
      setEventDetails(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQrEventDetails();
  }, []);
  const handleTicketDetails = () => {
    history.push(`/ticket/${param.eventId}/${param.qrId}/`);
  };
  return (
    <>
      <div className="wrapper full-width ">
        <div className="mb-4 text-center">
          <Image alt="img" src={logo} width={97} height={30}></Image>
        </div>

        <div className="form_text_details">
          <div className="form_details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path
                d="M24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28Z"
                fill="#7C7C7C"
              />
              <path
                d="M40 28C42.2091 28 44 26.2091 44 24C44 21.7909 42.2091 20 40 20C37.7909 20 36 21.7909 36 24C36 26.2091 37.7909 28 40 28Z"
                fill="#7C7C7C"
              />
              <path
                d="M32 60C16.56 60 4 47.44 4 32C4 16.56 16.56 4 32 4C47.44 4 60 16.56 60 32C60 47.44 47.44 60 32 60ZM32 8C18.76 8 8 18.76 8 32C8 45.24 18.76 56 32 56C45.24 56 56 45.24 56 32C56 18.76 45.24 8 32 8Z"
                fill="#7C7C7C"
              />
              <path
                d="M43.3199 46C42.4799 46 41.7199 45.48 41.4399 44.68C40.7519 42.7257 39.4743 41.0332 37.7834 39.8359C36.0925 38.6386 34.0718 37.9956 31.9999 37.9956C29.9281 37.9956 27.9073 38.6386 26.2164 39.8359C24.5256 41.0332 23.248 42.7257 22.5599 44.68C22.1999 45.72 21.0399 46.28 19.9999 45.88C19.7508 45.7938 19.5216 45.6585 19.3257 45.4822C19.1297 45.3059 18.9712 45.0921 18.8593 44.8534C18.7474 44.6148 18.6845 44.3561 18.6743 44.0927C18.6641 43.8293 18.7068 43.5666 18.7999 43.32C20.7599 37.72 26.0799 34 31.9999 34C37.9199 34 43.2399 37.76 45.1999 43.32C45.3091 43.622 45.344 43.9458 45.3016 44.264C45.2592 44.5823 45.1408 44.8857 44.9564 45.1486C44.772 45.4114 44.527 45.626 44.2422 45.7742C43.9573 45.9224 43.641 45.9999 43.3199 46Z"
                fill="#7C7C7C"
              />
            </svg>
            <p className="title d-block">
              We are sorry you were unable to attend.{" "}
            </p>

            <p>
              <b>
                Are you interested in participating in{" "}
                <span className="navy_color">Upcoming seminars?</span>
              </b>
            </p>
            <p>
              <a
                onClick={() =>
                  history.push(`/final/${param.eventId}/${param.qrId}`)
                }
                className="btn-confirm full-width text-center mt-20"
              >
                Yes
              </a>
            </p>
            <p>
              <a
                onClick={() =>
                  history.push(`/done/${param.eventId}/${param.qrId}`)
                }
                className="btn-reject full-width text-center mt-20"
              >
                No
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
