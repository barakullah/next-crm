"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { fetcher } from "../../../../../lib/api";

import { Spinner } from "react-bootstrap";
import { useNotification } from "@/app/components/NotificationToast";
export default function OpenAccount() {
  const param = useParams();
  const history = useRouter();
  const searchParams = useSearchParams();
  const openNotification = useNotification();

  const getQrEventDetails = async () => {
    try {
      const data: any = await fetcher("/qr_event_details", {
        event_id: param?.eventId,
        qr: param?.qrId,
      });
      const payload = {
        event_id: param?.eventId,
        lead_id: data?.data[0]?.id,
      };

      const data1: any = await fetcher("/open_account", {
        ...payload,
      });
      if (!searchParams.has("lang"))
        history.push(
          `${data1?.data?.redirect_url}?lang=en&Combined_UTM_Campaign=marketing_events&Combined_UTM_Source=MENA_automation_platform`
        );
      else
        history.push(`${data1?.data?.redirect_url}?${searchParams.toString()}`);
    } catch (error: any) {
      openNotification("topRight", "error", error?.response?.data?.message);

      // setErrorMessage(error?.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getQrEventDetails();
  }, []);

  return (
    <>
      <div className="wrapper full-width addticket m-auto">
        <p className="center">
          Redirecting
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        </p>
      </div>
    </>
  );
}
