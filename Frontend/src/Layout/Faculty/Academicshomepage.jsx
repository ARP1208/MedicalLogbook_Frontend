import React, { useState,useEffect} from "react";
import LogoNav from "../../Components/Admin/LogoNav";
import FacultyNavbar from "../../Components/Faculty/FacultyNavbar";
import Internalmarks from "./Internalmarks";
import Editmarks from "./Editmarks";
import Enterstudentattendance from "./Enterstudentattendance";

const Academicshomepage = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const storedPreference = sessionStorage.getItem('sidebarCollapsed');
    return storedPreference !== null ? JSON.parse(storedPreference) : false;
  });


  const [showInternalmarks, setshowInternalmarks] = useState(false);
  const [showeditmarks,setshoweditmarks]=useState(false);
  const [showstudentattendance,setshowstudentattendance]=useState(false);

  useEffect(() => {
    // Save collapsed state changes to sessionStorage
    sessionStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Collapse toggle function
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleOptions = (component) => {
    if(component === "Home"){
      setshowInternalmarks(false);
      setshoweditmarks(false);
      setshowstudentattendance(false);
    }
    else if (component === "Internalmarks") {
      setshowInternalmarks(true);
      setshoweditmarks(false);
      setshowstudentattendance(false);
    }
    else if(component === "Editmarks"){
      setshoweditmarks(true);
      setshowInternalmarks(false);
      setshowstudentattendance(false);
    }
    else if(component === "Attendance"){
      setshoweditmarks(false);
      setshowInternalmarks(false);
      setshowstudentattendance(true);
    }
  };

  return (
    <section>
      <LogoNav />
      <FacultyNavbar />
      {showInternalmarks && <Internalmarks />}
      {showeditmarks && <Editmarks/>}
      {showstudentattendance && <Enterstudentattendance/>}
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
          
          <button onClick={() => handleOptions("Home")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i className="fa-solid fa-house pr-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Home</p>
          </button>

          <button
            onClick={() => handleOptions("Internalmarks")}
            className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 "
          >
            <i className="fa-solid fa-pen-to-square" style={{ color: "#ffffff" }}/>
            <p className="relative top-2 text-base">&nbsp;Internal&nbsp;Marks</p>
          </button>

          <button
            onClick={() => handleOptions("Editmarks")}
            className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 "
          >
              
            <i className="fa-solid fa-file-pen" style={{ color: "#ffffff" }}/>
            <p className="relative top-2 text-base">&nbsp;Edit&nbsp;Marks</p>
          </button>

          <button
            onClick={() => handleOptions("Attendance")}
            className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 "
          >
              
              <i className="fa-solid fa-user-check p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Attendance</p>
          </button>
        </nav>
      </div>
    </section>
  );
};

export default Academicshomepage;
