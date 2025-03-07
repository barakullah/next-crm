import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import envelope from "../../../public/images/envelope.svg";
import user from "../../../public/images/user.svg";

export default function Header() {
  const [username, setUsername]: any = useState("");
  const history = useRouter();
  useEffect(() => {
    const name = Cookies.get("username");
    setUsername(name);
  }, []);
  const handleLogout = () => {
    Cookies.remove("userData");
    Cookies.remove("username");
    Cookies.remove("department");
    Cookies.set("verified", "false", { expires: 30, path: "/" });
    history.push("/login");
  };
  return (
    <header className="siteHeader">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <h1>Dashboard </h1>
          </div>
          <div className="col-8 text-end">
            <ul className="headerRight">
              {/* <li>
                <div className="inbox">
                  <Image src={envelope} alt="Envelope" width={24} height={24} />
                  <span className="text">Inbox</span>
                  <span className="count">3</span>
                </div>
              </li> */}
              <li>
                <div className="inbox login">
                  <Image src={user} alt="Envelope" width={24} height={24} />
                  <span className="text">{username}</span>
                  <span className="arrow"> &#9660; </span>
                  <div className="dropdown">
                    <ul>
                      <li>
                        <span onClick={handleLogout}>Logout</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
