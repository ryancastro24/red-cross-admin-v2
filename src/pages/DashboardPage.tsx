import { useState, useEffect } from "react";
import { Outlet, useNavigation } from "react-router";
import { Link } from "react-router";
import { Divider } from "@nextui-org/divider";
import { TiUserAdd } from "react-icons/ti";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoMdAnalytics } from "react-icons/io";
import { IoArchiveSharp } from "react-icons/io5";
import { FaBriefcaseMedical } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
function generateDate(): string {
  const now: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("en-US", options); // Formats as "December 09, 2024"
}

// Function to generate running time in 12-hour format
function generateRunningTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  return `${hours}:${minutes}:${seconds} ${ampm}`;
}

const Dashboard = () => {
  const [navigation, setNavigation] = useState("/dashboard");
  const [time, setTime] = useState(generateRunningTime());
  const pageNavigation = useNavigation();

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setTime(generateRunningTime());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="w-full h-screen  flex justify-between items-center">
      <div className="w-[250px] h-full bg-red-500 flex flex-col gap-6 px-3 py-5">
        <h2>Dashboard Page</h2>
        <ul className="flex flex-col gap-3">
          <Link
            onClick={() => setNavigation("/dashboard")}
            className={`hover:bg-red-600 ${
              navigation === "/dashboard" ? "bg-red-600" : ""
            } flex items-center gap-2 text-white px-2 py-3 rounded cursor-pointer`}
            to={"/dashboard"}
          >
            <span className="text-xl">
              <TiUserAdd />
            </span>
            <span>Register Form</span>
          </Link>
          <Link
            onClick={() => setNavigation("users")}
            className={`hover:bg-red-600 ${
              navigation === "users" ? "bg-red-600" : ""
            } flex items-center gap-2 text-white px-2 py-3 rounded cursor-pointer`}
            to={"datatable"}
          >
            <span className="text-xl">
              <PiUsersThreeFill />
            </span>
            <span>Users</span>
          </Link>

          <Link
            onClick={() => setNavigation("analytics")}
            className={`hover:bg-red-600 ${
              navigation === "analytics" ? "bg-red-600" : ""
            } flex items-center gap-2 text-white px-2 py-3 rounded cursor-pointer`}
            to={"analytics"}
          >
            <span className="text-lg">
              <IoMdAnalytics />
            </span>
            <span>Analytics</span>
          </Link>

          <Link
            onClick={() => setNavigation("archives")}
            className={`hover:bg-red-600 ${
              navigation === "archives" ? "bg-red-600" : ""
            } flex items-center gap-2 text-white px-2 py-3 rounded cursor-pointer`}
            to={"archives"}
          >
            <span className="text-lg">
              <IoArchiveSharp />
            </span>
            <span>Archives</span>
          </Link>

          <Link
            onClick={() => setNavigation("instructors")}
            className={`hover:bg-red-600 ${
              navigation === "instructors" ? "bg-red-600" : ""
            } flex items-center gap-2 text-white px-2 py-3 rounded cursor-pointer`}
            to={"instructor_page"}
          >
            <span className="text-lg">
              <FaBriefcaseMedical />
            </span>
            <span>Instructors</span>
          </Link>

          <Link
            onClick={() => setNavigation("certificates")}
            className={`hover:bg-red-600 ${
              navigation === "certificates" ? "bg-red-600" : ""
            } flex items-center gap-2 text-white px-2 py-3 rounded cursor-pointer`}
            to={"certificate"}
          >
            <span className="text-xl">
              <PiCertificateFill />
            </span>
            <span>Certificate</span>
          </Link>
        </ul>
      </div>

      <div className="w-full h-full flex flex-col ">
        <div className="w-full h-12 flex justify-between items-center py-2  pt-4 px-5 ">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">{generateDate()}</h2>
            <span className="text-sm">{time}</span>
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Avatar className="cursor-pointer " name="Admin" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
              <DropdownItem key="copy">Copy link</DropdownItem>
              <DropdownItem key="edit">Edit file</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Divider className="my-4" />
        <div className="p-4 overflow-y-auto">
          {pageNavigation.state === "loading" ? (
            <h2>Loadding...</h2>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
