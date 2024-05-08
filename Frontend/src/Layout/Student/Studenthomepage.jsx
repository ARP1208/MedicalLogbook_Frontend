import React,{useState,useEffect} from 'react'
import LogoNav from '../../Components/Admin/LogoNav'
import Studentnavbar from '../../Components/Student/Studentnavbar';
import Studentgradesheet from './Studentgradesheet';
import Dailyattendance from './Dailyattendance';
import Coursedetails from './Coursedetails';
import Attendance from './Attendance';
import Internalmarksstudent from './Internalmarksstudent';


const Studenthomepage = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const storedPreference = sessionStorage.getItem('sidebarCollapsed');
    return storedPreference !== null ? JSON.parse(storedPreference) : false;
  });

    const[showgradesheet,setshowgradesheet]=useState(false);
    const[showdailyattendance,setshowdailyattendance]=useState(false);
    const[showcoursedetails,setshowcoursedetails]=useState(false);
    const[showattendance,setshowattendance]=useState(false);
    const[showInternal,setshowInternal]=useState(false);
    

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
        setshowgradesheet(false);
        setshowdailyattendance(false);
        setshowcoursedetails(false);
        setshowattendance(false);
        setshowInternal(false);
      }
      else if (component === "Gradesheet") {
        setshowgradesheet(true);
        setshowdailyattendance(false);
        setshowcoursedetails(false);
        setshowattendance(false);
        setshowInternal(false);
      }
      else if(component === "Dailyattendance"){
        setshowdailyattendance(true);
        setshowgradesheet(false);
        setshowcoursedetails(false);
        setshowattendance(false);
        setshowInternal(false);
      }
      else if(component === "Coursedetails"){
        setshowdailyattendance(false);
        setshowgradesheet(false);
        setshowcoursedetails(true);
        setshowattendance(false);
        setshowInternal(false);
      }
      else if(component === "Attendance"){
        setshowdailyattendance(false);
        setshowgradesheet(false);
        setshowcoursedetails(false);
        setshowattendance(true);
        setshowInternal(false);
      }
      else if(component === "Internals"){
        setshowdailyattendance(false);
        setshowgradesheet(false);
        setshowcoursedetails(false);
        setshowattendance(false);
        setshowInternal(true);
      }
    };

  return (
    <section>
      <LogoNav/>
      <Studentnavbar/>
      {showgradesheet && <Studentgradesheet/>}
      {showdailyattendance && <Dailyattendance/>}
      {showcoursedetails && <Coursedetails/>}
      {showattendance && <Attendance/>}
      {showInternal && <Internalmarksstudent/>}
      
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
          

          <button onClick={() => handleOptions("Internals")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-file-pen p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Internal&nbsp;Marks</p>
          </button>

          <button onClick={() => handleOptions("Gradesheet")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-receipt p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Gradesheet</p>
          </button>

          <button onClick={() => handleOptions("Attendance")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-user-check p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Attendance</p>
          </button>

          <button onClick={() => handleOptions("Dailyattendance")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-clipboard-user p-2" style={{ color: "#ffffff" }} ></i>
            <p className="relative top-2 text-base">Daily&nbsp;Attendance</p>
          </button>

          <button onClick={() => handleOptions("Coursedetails")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
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
