import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import attendee from "../../../public/images/attendee.svg";
import city from "../../../public/images/cities.svg";
import dashboard from "../../../public/images/dashboard.svg";
import envelope from "../../../public/images/envelope.svg";
import events from "../../../public/images/events.svg";
import refresh from "../../../public/images/refresh.svg";
import sale from "../../../public/images/sale.svg";
import user from "../../../public/images/user.svg";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import { usePathname } from "next/navigation";

export default function Sidemenu(props: any) {
  const [collapsed, setCollapsed] = useState(false); // State for collapsing sidebar
  const pathname = usePathname();
  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Toggle the collapse state
  };
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebarSkin">
        {/* Sidebar */}
        <Sidebar className="sidebarnav">
          <Menu>
            <MenuItem
              active={pathname === "/" ? true : false}
              component={<Link href="/" />}
            >
              <Image src={attendee} alt="dashboard" width={18} height={18} />
              <span>Attendee</span>
            </MenuItem>
            {/* <MenuItem>
              <Image src={attendee} alt="attendee" width={18} height={18} />
              <span>Attendee</span>
            </MenuItem>
            <MenuItem>
              <Image src={sale} alt="sale" width={18} height={18} />
              <span>Sales</span>
            </MenuItem>
            <MenuItem>
              <Image src={events} alt="events" width={18} height={18} />
              <span>Events</span>
            </MenuItem>
            <MenuItem>
              <Image src={city} alt="city" width={18} height={18} />
              <span>City</span>
            </MenuItem> */}
          </Menu>
        </Sidebar>

        {/* Toggle Button */}
        <div className="sidebar-toggler">
          <button
            onClick={toggleSidebar}
            className={`menu-toggle ${collapsed ? "menu-toggle-active" : ""}`}
          >
            {collapsed ? "" : ""}
            <span></span>
          </button>
        </div>
      </div>
    </div>
  );
}
