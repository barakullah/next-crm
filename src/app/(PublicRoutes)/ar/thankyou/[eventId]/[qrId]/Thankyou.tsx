"use client";
import { fetcher } from "../../../../../../lib/api";
import Image from "next/image";
import logo from "../../../../../../../public/images/atfx logo.svg";
import brandqar from "../../../../../../../public/images/brand_TKpvkw.png";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Thankyou() {
  const param = useParams();
  const history = useRouter();
  const [eventDetails, setEventDetails]: any = useState({});
  const getQrEventDetails = async () => {
    try {
      const data: any = await fetcher("/qr_event_details", {
        event_id: param?.eventId,
        qr: param?.qrId,
      });
      const data1: any = await fetcher("/wa_dnt_call_back", {
        lead_id: data?.data[0]?.id,
        event_id: param?.eventId,
      });
      setEventDetails(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQrEventDetails();
  }, []);

  return (
    <>
      {Object.keys(eventDetails).length !== 0 && (
        <div className="ticketWrapper1">
          <div className="form_holder">
            <div className="form_text_details">
              <div className="full-width mt-0">
                <div className="text-center">
                  <div className="mb-4 text-center">
                    <Image alt="img" src={logo} width={97} height={30}></Image>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="104"
                    height="104"
                    viewBox="0 0 104 104"
                    fill="none"
                  >
                    <path
                      d="M27.7335 52L48.5335 69.3333L76.2668 34.6667M52.0001 100.533C45.6266 100.533 39.3156 99.278 33.4272 96.839C27.5389 94.3999 22.1886 90.825 17.6819 86.3183C13.1751 81.8115 9.60021 76.4612 7.16118 70.5729C4.72215 64.6846 3.4668 58.3735 3.4668 52C3.4668 45.6265 4.72215 39.3154 7.16118 33.4271C9.60021 27.5388 13.1751 22.1885 17.6819 17.6818C22.1886 13.175 27.5389 9.60008 33.4272 7.16105C39.3156 4.72203 45.6266 3.46667 52.0001 3.46667C64.872 3.46667 77.2166 8.57999 86.3184 17.6818C95.4201 26.7835 100.533 39.1282 100.533 52C100.533 64.8718 95.4201 77.2165 86.3184 86.3183C77.2166 95.42 64.872 100.533 52.0001 100.533Z"
                      stroke="#37EC34"
                      stroke-width="4"
                    />
                  </svg>
                  <h3 className="navyColor my-3">شكرا لك </h3>
                  <p>
                    على التسجيل {eventDetails?.events[0]?.name}
                    {eventDetails?.events[0]?.time_date} <br />
                    نحن متحمسون لانضمامك إلينا
                  </p>
                  <p>
                    <strong className="navyColor">
                      أضف هذا إلى التقويم لتلقي تذكير بتفاصيل الحدث عند اقتراب
                      تاريخ الحدث
                    </strong>
                  </p>
                  {eventDetails?.events[0]?.add_event_id !== "" && (
                    <div className="brands mb-3">
                      <a
                        href={`https://www.addevent.com/event/${eventDetails?.events[0]?.add_event_id}+apple`}
                        title="Apple"
                        target="_blank"
                      >
                        <Image
                          src="https://cdn.addevent.com/libs/imgs/icon-emd-share-apple-t1.png"
                          id="Apple"
                          alt="Apple"
                          width="45"
                          height="48"
                        />
                      </a>
                      <a
                        href={`https://www.addevent.com/event/${eventDetails?.events[0]?.add_event_id}+google`}
                        title="Google"
                        target="_blank"
                      >
                        <Image
                          src="https://cdn.addevent.com/libs/imgs/icon-emd-share-google-t1.png"
                          id="google"
                          alt="Google"
                          width="45"
                          height="48"
                        />
                      </a>
                      <a
                        href={`https://www.addevent.com/event/${eventDetails?.events[0]?.add_event_id}+office365`}
                        title="Office 365"
                        target="_blank"
                      >
                        <Image
                          src="https://cdn.addevent.com/libs/imgs/icon-emd-share-office365-t1.png"
                          id="office365"
                          alt="Office 365"
                          width="45"
                          height="48"
                        />
                      </a>
                      <a
                        href={`https://www.addevent.com/event/${eventDetails?.events[0]?.add_event_id}+outlook`}
                        title="Outlook"
                        target="_blank"
                      >
                        <Image
                          src="https://cdn.addevent.com/libs/imgs/icon-emd-share-outlook-t1.png"
                          id="Outlook"
                          alt="Outlook"
                          width="45"
                          height="48"
                        />
                      </a>
                      <a
                        href={`https://www.addevent.com/event/${eventDetails?.events[0]?.add_event_id}+outlookcom`}
                        title="Outlook.com"
                        target="_blank"
                      >
                        <Image
                          src="https://cdn.addevent.com/libs/imgs/icon-emd-share-outlookcom-t1.png"
                          id="OutlookCom"
                          alt="Outlook.com"
                          width="45"
                          height="48"
                        />
                      </a>
                      <a
                        href={`https://www.addevent.com/event/${eventDetails?.events[0]?.add_event_id}+yahoo`}
                        title="Yahoo"
                        target="_blank"
                      >
                        <Image
                          alt="caption"
                          src="https://cdn.addevent.com/libs/imgs/icon-emd-share-yahoo-t1.png"
                          id="Yahoo"
                          width="45"
                          height="48"
                        />
                      </a>
                    </div>
                  )}
                  <p>
                    يمكنك حاليًا التعرف أكثر على الشركة وخدماتها من خلال هذا
                    الرابط
                  </p>
                  <span className="full-width text-center pb-5">
                    <a
                      className="btn btn-blue visitSite"
                      href="https://www.atfxmena.com/ar"
                      target="_blank"
                    >
                      ATFX{" "}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
