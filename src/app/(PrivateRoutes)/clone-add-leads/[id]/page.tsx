"use client";
import Image from "next/image";
import attendee from "../../../../../public/images/attendee.svg";
import city from "../../../../../public/images/cities.svg";
import dashboard from "../../../../../public/images/dashboard.svg";
import envelope from "../../../../../public/images/envelope.svg";
import events from "../../../../../public/images/events.svg";
import refresh from "../../../../../public/images/refresh.svg";
import sale from "../../../../../public/images/sale.svg";
import user from "../../../../../public/images/user.svg";
import { useEffect, useState } from "react";
import { fetcher } from "../../../../lib/api";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function AddLeads() {
  const params = useParams();
  const [leadDetails, setLeadDetails]: any = useState({});
  const getLeadDetails = async () => {
    try {
      const data: any = await fetcher("/lead_details", {
        id: Cookies.get("userData"),
        lead_id: params?.id,
      });
      setLeadDetails(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLeadDetails();
  }, []);
  return (
    <div className="wrapper">
      <header className="siteHeader">
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <h1>Dashboard &#8250; Leads </h1>
            </div>
            <div className="col-8 text-end">
              <ul className="headerRight">
                <li>
                  <div className="inbox">
                    <Image
                      src={envelope}
                      alt="Envelope"
                      width={24}
                      height={24}
                    />
                    <span className="text">Inbox</span>
                    <span className="count">3</span>
                  </div>
                </li>
                <li>
                  <div className="inbox login">
                    <Image src={user} alt="Envelope" width={24} height={24} />
                    <span className="text">Admin</span>
                    <span className="arrow"> &#9660; </span>
                    <ul className="dropdown">
                      <li>
                        <a href="">Admin</a>
                      </li>
                      <li>
                        <a href="">Admin</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="mainArea">
        <div className="row mx-0">
          <div className="sidebar">
            <div className="sidebarSkin">
              <ul className="sidebarnav">
                <li>
                  <a href="">
                    <Image
                      src={dashboard}
                      alt="dashboard"
                      width={18}
                      height={18}
                    />
                    <span>Dashboard</span>
                  </a>{" "}
                </li>
                <li>
                  <a href="">
                    <Image
                      src={attendee}
                      alt="attendee"
                      width={18}
                      height={18}
                    />
                    <span>Attendee</span>
                  </a>{" "}
                </li>
                <li>
                  <a href="">
                    <Image src={sale} alt="sale" width={18} height={18} />
                    <span>Sales</span>
                  </a>{" "}
                </li>
                <li>
                  <a href="">
                    <Image src={events} alt="events" width={18} height={18} />
                    <span>Events</span>
                  </a>{" "}
                </li>
                <li>
                  <a href="">
                    <Image src={city} alt="city" width={18} height={18} />
                    <span>City</span>
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="contentArea">
            <div className="infoBar">
              <div className="col-md-10">
                <strong className="inforTitle">Add Lead </strong>
                <ul className="infobarOptions">
                  <li>
                    <a href="">Logs</a>{" "}
                  </li>
                </ul>
              </div>
              {/* <div className="col-md-2 text-end">
                <a href="" className="refresh">
                  <Image src={refresh} alt="refresh" width={18} height={24} />
                  Reset Filter
                </a>
              </div> */}
            </div>
            <div className="FormArea">
              <div className="row mb-3">
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">First Name</label>
                  <input
                    value={leadDetails?.first_name}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Last Name</label>
                  <input
                    value={leadDetails?.last_name}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Lead Type</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Client E-mail</label>
                  <input
                    value={leadDetails?.email}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Language</label>
                  <select
                    value={leadDetails?.language}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select </option>
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                    <option value="ru">Russian</option>
                  </select>
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Client Status</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Client Mobile Number</label>
                  <input
                    value={leadDetails?.mobile}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Country</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Lead Owner</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Event</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Confirmed By Sales Call</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">
                    Interested In Upcoming Events
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-md-12 mb-4 formBox">
                  <label className="d-block">Comments</label>
                  <textarea className="form-control"></textarea>
                </div>
                <div className="col-md-12 btnHolder my-3 text-end">
                  <Link href="/" className="btn btn-gray">
                    Cancel
                  </Link>
                  <a href="" className="btn btn-green">
                    Save
                  </a>
                  <a href="" className="btn btn-blue">
                    Save & Close
                  </a>
                  <a href="" className="btn btn-blue">
                    Save & New
                  </a>
                </div>
              </div>
              {/* Row Two */}
              <div className="row">
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">QR Code</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Referred By</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Arrived</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="No"
                  />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">QR Code Image</label>
                  <input className="form-control" type="file" />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">QR Brand Image</label>
                  <input className="form-control" type="file" />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Open Link</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="No"
                  />
                </div>
                <div className="col-md-12 mb-4 formBox">
                  <label className="d-block">Token</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-md-12 mb-4 formBox">
                  <label className="d-block">Full User Agent String</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Phone otp</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Email otp</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Random</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Browser</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">BrowserVersion</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-lg-4 mb-4 formBox">
                  <label className="d-block">Operating System</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="col-md-12 btnHolder my-3 text-end">
                  <a href="" className="btn btn-gray">
                    Cancel
                  </a>
                  <a href="" className="btn btn-green">
                    Save
                  </a>
                  <a href="" className="btn btn-blue">
                    Save & Close
                  </a>
                  <a href="" className="btn btn-blue">
                    Save & New
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
