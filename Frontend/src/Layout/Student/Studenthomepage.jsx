import React,{useState,useEffect} from 'react'
import LogoNav from '../../Components/Admin/LogoNav'
import Studentnavbar from '../../Components/Student/Studentnavbar';


const Studenthomepage = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const storedPreference = sessionStorage.getItem('sidebarCollapsed');
    return storedPreference !== null ? JSON.parse(storedPreference) : false;
  });

    const [showprofile, setshowprofile] = useState(false);

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
        setshowprofile(false);
      }
    //   else if (component === "Profile") {
    //     setshowprofile(true);
    //   }
    };

  return (
    <section>
      <LogoNav/>
      <Studentnavbar/>
     
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
          

          <button onClick={() => handleOptions("Profile")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-file-pen p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Internal&nbsp;Marks</p>
          </button>

          <button onClick={() => handleOptions("Profile")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-receipt p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Gradesheet</p>
          </button>

          <button onClick={() => handleOptions("Profile")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-user-check p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Attendance</p>
          </button>

          <button onClick={() => handleOptions("Profile")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-clipboard-user p-2" style={{ color: "#ffffff" }} ></i>
            <p className="relative top-2 text-base">Daily&nbsp;Attendance</p>
          </button>

          <button onClick={() => handleOptions("Profile")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-book-open-reader p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Course&nbsp;Details</p>
          </button>
{/* 
          <button onClick={() => handleOptions("Profile")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-regular fa-clipboard p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Timetable</p>
          </button> */}
        </nav>
      </div>
    </section>
  )
}

export default Studenthomepage
