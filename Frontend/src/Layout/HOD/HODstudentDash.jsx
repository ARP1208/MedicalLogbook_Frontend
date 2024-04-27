import React, { useState, useEffect } from 'react'
import LogoNav from '../../Components/Admin/LogoNav'
import NavbarHOD from '../../Components/HOD/NavbarHOD.jsx';
import FacultyStudentDash from '../Faculty/FacultyStudentDash.jsx';


const HodstudentDash = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const storedPreference = sessionStorage.getItem('sidebarCollapsed');
    return storedPreference !== null ? JSON.parse(storedPreference) : false;
  });

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
      setshowprofile(false);
    }
    else if (component === "DashBoard") {
      setshowDashboard(true);
    }
  };

  return (
    <section>
      <LogoNav />
      <NavbarHOD />

      <div className="fixed h-full">
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


          <button onClick={() => handleOptions("DashBoard")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i className="fa-solid fa-chalkboard p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Dashboard</p>
          </button>
        </nav>
      </div>
      {showDashboard && <FacultyStudentDash />}
    </section>
  )
}

export default HodstudentDash
