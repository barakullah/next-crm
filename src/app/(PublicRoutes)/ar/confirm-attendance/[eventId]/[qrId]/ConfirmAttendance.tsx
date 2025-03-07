"use client";
import { fetcher } from "../../../../../../lib/api";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../../../../public/images/atfx logo.svg";

export default function ConfirmAttendance() {
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
  const handleConfirmByWa = async (confirm: number) => {
    try {
      const data: any = await fetcher(
        "/update_event_lead_confirmation_by_link",
        {
          event_id: param?.eventId,
          lead_id: eventDetails?.id,
          confirmed: confirm,
        }
      );

      history.push(`/ar/${data?.data?.redirect}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {Object.keys(eventDetails).length !== 0 && (
        <div className="wrapper full-width ">
          <div className="mb-4 text-center">
            <Image alt="img" src={logo} width={97} height={30}></Image>
          </div>

          <div className="form_details">
            <p>
              {" "}
              شكرا لك للتسجيل في
              <b className="d-block">
                {eventDetails?.events[0]?.name}

                <span className="navy_color"> </span>
              </b>
              التي ستنعقد يوم {eventDetails?.events[0]?.time_date}
            </p>

            <p>
              <b>يرجى تأكيد حضور الندوة</b>
            </p>
            <p>
              <a
                onClick={() => handleConfirmByWa(1)}
                // href="https://lp.atpremier.com/p/confirm_thank_you/TKpvkw"
                className="btn-confirm full-width text-center mt-20"
              >
                <span>&#10003;</span> تأكيد حضوري
              </a>
            </p>
            <p>
              <a
                onClick={() => handleConfirmByWa(0)}
                // href="https://lp.atpremier.com/p/reject/TKpvkw"
                className="btn-reject full-width text-center mt-20"
              >
                <span>&#215;</span>لا أستطيع الحضور
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
