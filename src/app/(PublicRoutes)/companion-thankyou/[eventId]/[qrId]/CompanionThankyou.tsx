"use client";
import Image from "next/image";
import logo from "../../../../../../public/images/atfx logo.svg";
import { useParams, useRouter } from "next/navigation";

export default function CompanionThankyou() {
  const history = useRouter();
  const params = useParams();
  return (
    <>
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
                <h3 className="navyColor my-3">Thank you</h3>
                <p>Companion ticket has been added.</p>
                <button
                  onClick={() =>
                    history.push(`/ticket/${params.eventId}/${params.qrId}`)
                  }
                  className={`btn btn-blue px-4 `}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
