"use client";
import { fetcher } from "../../../../lib/api";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../../public/images/atfx logo.svg";
export default function StopEmail() {
  const param = useParams();
  const history = useRouter();
  const getQrEventDetails = async () => {
    try {
      const data1: any = await fetcher("/stop_email_messages", {
        lead_id: param?.qrId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQrEventDetails();
  }, []);

  return (
    <>
      <div className="wrapper full-width ">
        <div className="mb-4 text-center">
          <Image alt="img" src={logo} width={97} height={30}></Image>
        </div>

        <div className="form_details ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
          >
            <g clip-path="url(#clip0_280_80)">
              <path
                d="M28 54C34.8956 54 41.5088 51.2607 46.3848 46.3848C51.2607 41.5088 54 34.8956 54 28C54 21.1044 51.2607 14.4912 46.3848 9.61522C41.5088 4.73928 34.8956 2 28 2C21.1044 2 14.4912 4.73928 9.61522 9.61522C4.73928 14.4912 2 21.1044 2 28C2 34.8956 4.73928 41.5088 9.61522 46.3848C14.4912 51.2607 21.1044 54 28 54Z"
                stroke="#61ED7B"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.7998 32C16.7998 39.2 24.7998 43.6 31.9998 41.6C36.3998 40 39.9998 36.4 41.1998 32M18.9998 22C18.7346 22 18.4802 21.8946 18.2927 21.7071C18.1052 21.5196 17.9998 21.2652 17.9998 21C17.9998 20.7348 18.1052 20.4804 18.2927 20.2929C18.4802 20.1054 18.7346 20 18.9998 20C19.265 20 19.5194 20.1054 19.7069 20.2929C19.8944 20.4804 19.9998 20.7348 19.9998 21C19.9998 21.2652 19.8944 21.5196 19.7069 21.7071C19.5194 21.8946 19.265 22 18.9998 22ZM36.9998 22C36.7346 22 36.4802 21.8946 36.2927 21.7071C36.1052 21.5196 35.9998 21.2652 35.9998 21C35.9998 20.7348 36.1052 20.4804 36.2927 20.2929C36.4802 20.1054 36.7346 20 36.9998 20C37.265 20 37.5194 20.1054 37.7069 20.2929C37.8944 20.4804 37.9998 20.7348 37.9998 21C37.9998 21.2652 37.8944 21.5196 37.7069 21.7071C37.5194 21.8946 37.265 22 36.9998 22Z"
                stroke="#61ED7B"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M37 25C39.2091 25 41 23.2091 41 21C41 18.7909 39.2091 17 37 17C34.7909 17 33 18.7909 33 21C33 23.2091 34.7909 25 37 25Z"
                fill="#61ED7B"
              />
              <path
                d="M19 25C21.2091 25 23 23.2091 23 21C23 18.7909 21.2091 17 19 17C16.7909 17 15 18.7909 15 21C15 23.2091 16.7909 25 19 25Z"
                fill="#61ED7B"
              />
            </g>
            <defs>
              <clipPath id="clip0_280_80">
                <rect width="56" height="56" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className="title navy_color full-width tpm text-center mt-10">
            Thank you
          </p>

          <p className="title navy_color full-width tpm text-center mt-20">
            You will not be notified about future seminars and lectures.
          </p>
          {/* 
          <p className="title navy_color full-width tpm text-center  mt-20">
            Customer Service{" "}
            <b>
              <a href="tel:+97148754100" className="full-width">
                97148754100
              </a>
            </b>
          </p> */}

          <p className="title navy_color full-width tpm text-center  mt-20">
            <b> For more information, you can visit our website.</b>
            <br />
            <a
              href="https://atfxmena.com"
              target="_blank"
              className="full-width"
            >
              atfxmena.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
