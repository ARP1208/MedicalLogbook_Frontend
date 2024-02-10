import React, { useState } from "react";
import Navbar from "../../Components/Admin/Navbar";
import Entermarksgradesheet from "./Entermarksgradesheet";
import LogoNav from "../../Components/Admin/LogoNav";
import GradesheetDashboard from "./GradesheetDashboard";

const Gradesheethomepage = () => {
  const [showAddmarks, setshowAddmarks] = useState(false);
  const [showDashboard, setshowDashboard] = useState(false);

  const handleOptions = (component) => {
    if (component === "Home") {
      setshowAddmarks(false);
      setshowDashboard(false);
    } else if (component === "Addmarks") {
      setshowAddmarks(true);
      setshowDashboard(false);
    } else if (component === "Dashboard") {
      setshowAddmarks(false);
      setshowDashboard(true);
    }
  };

  return (
    <section>
      <LogoNav />
      <Navbar />
      {showAddmarks && <Entermarksgradesheet />}
      {showDashboard && <GradesheetDashboard/>} 
      <div className="absolute h-full">
        <nav className="sideb h-full flex flex-col bg-blue-950 ">

          <button onClick={() => handleOptions("Home")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i className="fa-solid fa-house pr-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Home</p>
          </button>

          <button onClick={() => handleOptions("Addmarks")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i class="fa-solid fa-marker p-2" style={{ color: "#ffffff" }}></i>
            <span className=" realative w-auto top-2 text-base">Add&nbsp;Marks</span>
          </button>

          <button onClick={() => handleOptions("Dashboard")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i class="fa-solid fa-chalkboard p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Dashboard</p>
          </button>
        </nav>
      </div>

    </section >
  );
};

export default Gradesheethomepage;
