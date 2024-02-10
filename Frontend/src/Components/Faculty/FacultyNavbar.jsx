import React from "react";
import { NavLink } from "react-router-dom";

const FacultyNavbar = () => {
  return (
    <div className="bg-gray-300 overflow-hidden navbar-expand bg-grey w-100 h-11">
      <ul className="navbar-nav list-none gap-10 justify-center flex ml-auto text-8">
        {/* Announcement Navbar */}
        <nav className="text-lg font-semibold">
          <NavLink
            to="/Facultyhomepage"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-500 p-3 no-underline"
                : "text-black no-underline"
            }
          >
            {" "}
            Announcement{" "}
          </NavLink>
        </nav>

        {/* PG-Log Navbar */}
        <nav className="text-lg font-semibold ">
          <NavLink
            to="/Pgloghomepage"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-500  p-3 no-underline"
                : "text-black no-underline"
            }
          >
            {" "}
            PG-Log{" "}
          </NavLink>
        </nav>

        {/* Dashboard Navbar */}
        <nav className="text-lg font-semibold ">
          <NavLink
            to="#"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-500  p-3 no-underline"
                : "text-black no-underline"
            }
          >
            {" "}
            Dashboard{" "}
          </NavLink>
        </nav>

        {/* Profile Navbar */}
        <nav className="text-lg font-semibold ">
          <NavLink
            to="/Profilehomepage"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-500  p-3 no-underline"
                : "text-black no-underline"
            }
          >
            {" "}
            Profile{" "}
          </NavLink>
        </nav>
        <div className="absolute flex right-2 items-end p-0.5">
          <button className="bg-blue-950 text-sm font-medium rounded-3xl w-auto h-auto">
            <i
              className="fa-solid fa-headset fa-lg"
              style={{ color: "#ffffff" }}
            ></i>{" "}
            Support
          </button>
        </div>
      </ul>
    </div>
  );
};

export default FacultyNavbar;
