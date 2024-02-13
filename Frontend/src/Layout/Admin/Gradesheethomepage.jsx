import React, { useState,useEffect} from "react";
import Navbar from "../../Components/Admin/Navbar";
import Entermarksgradesheet from "./Entermarksgradesheet";
import LogoNav from "../../Components/Admin/LogoNav";
import GradesheetDashboard from "./GradesheetDashboard";

const Gradesheethomepage = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const storedPreference = sessionStorage.getItem('sidebarCollapsed');
    return storedPreference !== null ? JSON.parse(storedPreference) : false;
  });

  const [showAddmarks, setshowAddmarks] = useState(false);
  const [showDashboard, setshowDashboard] = useState(false);

  useEffect(() => {
    // Save collapsed state changes to sessionStorage
    sessionStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Collapse toggle function
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

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
        <nav className={`sideb h-full flex flex-col bg-blue-950 ${isSidebarCollapsed ? 'collapsed-sidebar' : ''}`}>

        
        <button onClick={toggleSidebarCollapse} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            {isSidebarCollapsed ? (
              <i class="fa-solid fa-angles-right p-2" style={{ color: "#ffffff" }} /> // Expand icon
            ) : (
              <i class="fa-solid fa-angles-left p-2" style={{ color: "#ffffff" }} /> // Collapse icon
            )}
            <p className="relative top-2 text-base">Collapse</p>
          </button>

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
