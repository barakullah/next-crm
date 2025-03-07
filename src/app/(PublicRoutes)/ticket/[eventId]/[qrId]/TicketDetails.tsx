"use client";
import { fetcher } from "../../../../../lib/api";
import Image from "next/image";
import logo from "../../../../../../public/images/atfx logo.svg";
import brandqar from "../../../../../../public/images/brand_TKpvkw.png";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TicketDetails() {
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

  return (
    <>
      {Object.keys(eventDetails).length !== 0 && (
        <div className="ticketWrapper ">
          <div className="logo-holder-inner">
            <div className="mb-4 text-center">
              <Image alt="img" src={logo} width={97} height={30}></Image>
            </div>
            <div className="addcomanion">
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/add/${param?.eventId}/${param?.qrId}`}
              >
                <span className=" text-left addcomp  floatRight">
                  Add Companion
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="30"
                    viewBox="0 0 29 30"
                    fill="none"
                  >
                    <path
                      d="M3.55078 24.4679V22.1009C3.55078 20.8454 4.04953 19.6413 4.93732 18.7535C5.82511 17.8658 7.02921 17.367 8.28473 17.367H12.4269M5.91775 7.89911C5.91775 9.15463 6.41651 10.3587 7.3043 11.2465C8.19208 12.1343 9.39618 12.6331 10.6517 12.6331C11.9072 12.6331 13.1113 12.1343 13.9991 11.2465C14.8869 10.3587 15.3856 9.15463 15.3856 7.89911C15.3856 6.64359 14.8869 5.43949 13.9991 4.5517C13.1113 3.66391 11.9072 3.16516 10.6517 3.16516C9.39618 3.16516 8.19208 3.66391 7.3043 4.5517C6.41651 5.43949 5.91775 6.64359 5.91775 7.89911Z"
                      stroke="#102D53"
                      stroke-width="2.62997"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19.5283 26.8769V18.5084M15.3441 22.6927H23.7126"
                      stroke="#102D53"
                      stroke-width="2.62997"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="form_holder">
            <div className="form_text_details">
              <div className="full-width text-center">
                <span className="tickettitle d-block">
                  <b>Ticket </b>
                </span>

                <span className="title navy_color d-block">
                  <b>
                    {" "}
                    {eventDetails?.events[0]?.name}{" "}
                    <span className="navy_color"></span>
                  </b>
                </span>
              </div>
              <div className="text-center">
                <span className="subtitle mb-10 navy_color full-width tpm text-center">
                  {`${eventDetails?.first_name}  ${eventDetails?.last_name}`}
                </span>
                {eventDetails?.events[0]?.qr_brand_image && (
                  <span className="text-center d-block">
                    <a
                      href={eventDetails?.events[0]?.qr_brand_image}
                      download=""
                    >
                      <Image
                        width={259}
                        height={342}
                        alt="caption"
                        src={eventDetails?.events[0]?.qr_brand_image}
                      />
                    </a>
                  </span>
                )}
              </div>
            </div>
            <div className="full-width mt-0">
              <div className="time">
                <span className="ctitle details_title navy_color half_width">
                  {/* <Image alt="caption" src="assets/images/1.svg" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                  >
                    <path
                      d="M38.4 20.4H36V19.2C36 18.8817 35.8736 18.5765 35.6485 18.3515C35.4235 18.1264 35.1183 18 34.8 18C34.4817 18 34.1765 18.1264 33.9515 18.3515C33.7264 18.5765 33.6 18.8817 33.6 19.2V20.4H26.4V19.2C26.4 18.8817 26.2736 18.5765 26.0485 18.3515C25.8235 18.1264 25.5183 18 25.2 18C24.8817 18 24.5765 18.1264 24.3515 18.3515C24.1264 18.5765 24 18.8817 24 19.2V20.4H21.6C20.6452 20.4 19.7295 20.7793 19.0544 21.4544C18.3793 22.1295 18 23.0452 18 24V38.4C18 39.3548 18.3793 40.2705 19.0544 40.9456C19.7295 41.6207 20.6452 42 21.6 42H38.4C39.3548 42 40.2705 41.6207 40.9456 40.9456C41.6207 40.2705 42 39.3548 42 38.4V24C42 23.0452 41.6207 22.1295 40.9456 21.4544C40.2705 20.7793 39.3548 20.4 38.4 20.4ZM39.6 38.4C39.6 38.7183 39.4736 39.0235 39.2485 39.2485C39.0235 39.4736 38.7183 39.6 38.4 39.6H21.6C21.2817 39.6 20.9765 39.4736 20.7515 39.2485C20.5264 39.0235 20.4 38.7183 20.4 38.4V30H39.6V38.4ZM39.6 27.6H20.4V24C20.4 23.6817 20.5264 23.3765 20.7515 23.1515C20.9765 22.9264 21.2817 22.8 21.6 22.8H24V24C24 24.3183 24.1264 24.6235 24.3515 24.8485C24.5765 25.0736 24.8817 25.2 25.2 25.2C25.5183 25.2 25.8235 25.0736 26.0485 24.8485C26.2736 24.6235 26.4 24.3183 26.4 24V22.8H33.6V24C33.6 24.3183 33.7264 24.6235 33.9515 24.8485C34.1765 25.0736 34.4817 25.2 34.8 25.2C35.1183 25.2 35.4235 25.0736 35.6485 24.8485C35.8736 24.6235 36 24.3183 36 24V22.8H38.4C38.7183 22.8 39.0235 22.9264 39.2485 23.1515C39.4736 23.3765 39.6 23.6817 39.6 24V27.6Z"
                      fill="#7C7C7C"
                    />
                  </svg>
                  {eventDetails?.events[0]?.date}
                </span>
                <span className=" ctitle details_title navy_color half_width">
                  {/* <Image alt="caption" src="assets/images/2.svg" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                  >
                    <path
                      d="M30 18C36.6276 18 42 23.3724 42 30C42 36.6276 36.6276 42 30 42C23.3724 42 18 36.6276 18 30C18 23.3724 23.3724 18 30 18ZM30 20.4C27.4539 20.4 25.0121 21.4114 23.2118 23.2118C21.4114 25.0121 20.4 27.4539 20.4 30C20.4 32.5461 21.4114 34.9879 23.2118 36.7882C25.0121 38.5886 27.4539 39.6 30 39.6C32.5461 39.6 34.9879 38.5886 36.7882 36.7882C38.5886 34.9879 39.6 32.5461 39.6 30C39.6 27.4539 38.5886 25.0121 36.7882 23.2118C34.9879 21.4114 32.5461 20.4 30 20.4ZM30 22.8C30.2939 22.8 30.5776 22.9079 30.7972 23.1033C31.0169 23.2986 31.1572 23.5677 31.1916 23.8596L31.2 24V29.5032L34.4484 32.7516C34.6636 32.9676 34.7886 33.2573 34.7979 33.5621C34.8072 33.8668 34.7001 34.1637 34.4985 34.3923C34.2969 34.621 34.0157 34.7644 33.7122 34.7933C33.4087 34.8222 33.1056 34.7345 32.8644 34.548L32.7516 34.4484L29.1516 30.8484C28.9651 30.6617 28.8453 30.4188 28.8108 30.1572L28.8 30V24C28.8 23.6817 28.9264 23.3765 29.1515 23.1515C29.3765 22.9264 29.6817 22.8 30 22.8Z"
                      fill="#7C7C7C"
                    />
                  </svg>
                  Time {eventDetails?.events[0]?.hour}
                </span>
              </div>
              <div className="calenderOpt text-center">
                <h5 className="">Add to calendar</h5>
                <div className="brands">
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
              </div>
              <div className="mapSection text-center">
                <span className="d-block">
                  {/* <Image alt="caption" src="assets/images/3.svg" /> */}
                  {eventDetails?.events[0]?.location}
                </span>
                {eventDetails?.events[0]?.map_full_link && (
                  <iframe
                    src={eventDetails?.events[0]?.map_full_link}
                    width="100%"
                    height="250"
                    loading="lazy"
                    // referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                )}
                <div className="addcomanion">
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/add/${param?.eventId}/${param?.qrId}`}
                  >
                    <span className=" text-left mp  floatRight">
                      Add Companion
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="30"
                        viewBox="0 0 29 30"
                        fill="none"
                      >
                        <path
                          d="M3.55078 24.4679V22.1009C3.55078 20.8454 4.04953 19.6413 4.93732 18.7535C5.82511 17.8658 7.02921 17.367 8.28473 17.367H12.4269M5.91775 7.89911C5.91775 9.15463 6.41651 10.3587 7.3043 11.2465C8.19208 12.1343 9.39618 12.6331 10.6517 12.6331C11.9072 12.6331 13.1113 12.1343 13.9991 11.2465C14.8869 10.3587 15.3856 9.15463 15.3856 7.89911C15.3856 6.64359 14.8869 5.43949 13.9991 4.5517C13.1113 3.66391 11.9072 3.16516 10.6517 3.16516C9.39618 3.16516 8.19208 3.66391 7.3043 4.5517C6.41651 5.43949 5.91775 6.64359 5.91775 7.89911Z"
                          stroke="#102D53"
                          stroke-width="2.62997"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M19.5283 26.8769V18.5084M15.3441 22.6927H23.7126"
                          stroke="#102D53"
                          stroke-width="2.62997"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
