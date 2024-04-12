// Library Imports
import React, { useState,useEffect } from "react";

// Local Imports
import NavbarHOD from "../../Components/HOD/NavbarHOD";
import DepartmentalAnnouncement from "./DepartmentalAnnouncement";
import CreateDeptAnnoucement from "./CreateDeptAnnoucement";
import EditDepartmentalAnn from "./EditDepartmentalAnn";
import LogoNav from "../../Components/Admin/LogoNav";

const DepartmentalAnnHome = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const storedPreference = sessionStorage.getItem('sidebarCollapsed');
    return storedPreference !== null ? JSON.parse(storedPreference) : false;
  });

  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showcreateAnnouncement, setShowcreateAnnouncement] = useState(false);
  const [showeditAnnouncement, setShoweditAnnouncement] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Collapse toggle function
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleOptions = (component) => {
    if (component === "Announcement") {
      setShowAnnouncement(true);
      setShowcreateAnnouncement(false);
      setShoweditAnnouncement(false);
    } else if (component === "Createannouncement") {
      setShowAnnouncement(false);
      setShowcreateAnnouncement(true);
      setShoweditAnnouncement(false);
    } else if (component === "Home") {
      setShowAnnouncement(false);
      setShowcreateAnnouncement(false);
      setShoweditAnnouncement(false);
    }
  };

  return (
    <section className="oveflow-hidden">
      <LogoNav />
      <NavbarHOD />
        <div className="absolute h-full">
       {/* Sidebar with conditional collapsed class */}
        
          <nav className={`sideb h-full flex flex-col bg-blue-950 ${isSidebarCollapsed ? 'collapsed-sidebar' : ''}`}>

          <button onClick={toggleSidebarCollapse} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            {isSidebarCollapsed ? (
              <i className="fa-solid fa-angles-right p-2" style={{ color: "#ffffff" }} /> // Expand icon
            ) : (
              <i className="fa-solid fa-angles-left p-2" style={{ color: "#ffffff" }} /> // Collapse icon
            )}
            <p className="relative top-2 text-base">Collapse</p>
          </button>

            <button onClick={() => handleOptions("Home")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
              <i className="fa-solid fa-house pr-2" style={{ color: "#ffffff" }} />
              <p className="relative top-2 text-base">Home</p>
            </button>
            <button onClick={() => handleOptions("Announcement")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
              <i className="fa-solid fa-bullhorn p-2" style={{ color: "#ffffff" }} />
              <p className="relative top-2 text-base">Announcements</p>
            </button>

            <button onClick={() => handleOptions("Createannouncement")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
              <i className="fa-solid fa-scroll p-2" style={{ color: "#ffffff" }} />
              <p className="relative top-3 text-base mr-2">Create <span className="w-40 relative -top-2 break-words">Announcement</span></p>
            </button>
          </nav>
        </div>
        {showAnnouncement && <DepartmentalAnnouncement />}
        {showeditAnnouncement && <EditDepartmentalAnn />}
        {showcreateAnnouncement && <CreateDeptAnnoucement />}
    </section>
  );
};

export default DepartmentalAnnHome;
