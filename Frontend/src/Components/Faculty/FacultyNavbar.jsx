import React,{useEffect, useRef, useState} from "react";
import { NavLink } from "react-router-dom";
import Supportpage from "../../Layout/Faculty/Supportpage";

const FacultyNavbar = () => {

  const [open, setOpen] = useState(false);
  

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
        <div className="absolute flex right-2 items-end p-0.5"  style={{zIndex: open ? 9999: 'auto'}}>
          <button className="bg-blue-950 text-sm font-medium rounded-3xl w-auto h-auto" onClick= {()=>setOpen(true)}>
            <i
              className="fa-solid fa-headset fa-lg"
              style={{ color: "#ffffff" }}
            ></i>{" "}
            Support
          </button>
            
          <Supportpage open={open} onClose={() => setOpen(false)}>
        <div className="lg:w-40vw md:w-30vw sm:20vw lg:h-50vh md:60vh sm:70vh border-3 border-blue-500 ">
          
            <div className="text-2xl font-black text-blue-950 justify-self-center mt-4">Help & Support</div>
            <div className="grid lg:grid-cols-2 mt-5 sm:grid-cols-1 md:grid-cols-2">
            <h5 className="text-blue-500 text-2xl justify-self-center"><i class="fa-solid fa-phone" style={{ color: "#4299e1" }}></i>&nbsp;&nbsp;Phone
                <p className="text-black text-4">+91 9663345487,&nbsp;&nbsp;&nbsp;0820-2541351</p>
              </h5>
              
              <h5 className="text-blue-500 text-2xl justify-self-center"><i class="fa-regular fa-envelope" style={{ color: "#4299e1" }}></i>&nbsp;&nbsp;Email Id
                <p className="text-black text-4">Gangliatechnologies@gmail.com</p>
              </h5>
              <h5 className="text-blue-500 text-2xl justify-self-center"><i class="fa-solid fa-location-dot" style={{ color: "#4299e1" }}></i>&nbsp;&nbsp;Location
                <p className="text-black text-4">Ganglia Technologies, Manipal,<br/> Udupi, Karnataka 576104</p>
              </h5>
              <h5 className="text-blue-500 text-2xl justify-self-center"><i class="fa-solid fa-file-pen" style={{ color: "#4299e1" }}></i>&nbsp;&nbsp;Note
                <p className="text-black text-4">For assitance, Please Reach out to <br/>our customer support team, available<br/>everday from 10AM to 7PM </p>
              </h5>
            </div>
        </div>
      </Supportpage>
        </div>
      </ul>
    </div>
  );
};

export default FacultyNavbar;
