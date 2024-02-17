import React, { useState,useEffect} from "react";
import LogoNav from "../../Components/Admin/LogoNav";
import FacultyNavbar from "../../Components/Faculty/FacultyNavbar";
import Facultyannouncement from "./Facultyannouncement";
import Internalmarks from "./Internalmarks";

const Academicshomepage = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const storedPreference = sessionStorage.getItem('sidebarCollapsed');
    return storedPreference !== null ? JSON.parse(storedPreference) : false;
  });


  const [showInternalmarks, setshowInternalmarks] = useState(false);

  useEffect(() => {
    // Save collapsed state changes to sessionStorage
    sessionStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Collapse toggle function
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleOptions = (component) => {
    if (component === "Internalmarks") {
      setshowInternalmarks(true);
    }
  };

  return (
    <section>
      <LogoNav />
      <FacultyNavbar />
      {showInternalmarks && <Internalmarks />}
      <div className="fixed h-full">
        <nav className={`sideb h-full flex flex-col bg-blue-950 ${isSidebarCollapsed ? 'collapsed-sidebar' : ''}`}>

           
        <button onClick={toggleSidebarCollapse} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            {isSidebarCollapsed ? (
              <i className="fa-solid fa-angles-right p-2" style={{ color: "#ffffff" }} /> // Expand icon
            ) : (
              <i className="fa-solid fa-angles-left p-2" style={{ color: "#ffffff" }} /> // Collapse icon
            )}
            <p className="relative top-2 text-base">Collapse</p>
          </button>

          <button
            onClick={() => handleOptions("Internalmarks")}
            className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 "
          >
            <i className="fa-solid fa-pen-to-square" style={{ color: "#ffffff" }}/>
            <p className="relative top-2 text-base">&nbsp;Internal&nbsp;Marks</p>
          </button>

          <button
            onClick={() => handleOptions("Announcement")}
            className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 "
          >
              
            <i className="fa-solid fa-file-pen" style={{ color: "#ffffff" }}/>
            <p className="relative top-2 text-base">&nbsp;Midterm&nbsp;Marks</p>
          </button>
        </nav>
      </div>
    </section>
  );
};

export default Academicshomepage;
