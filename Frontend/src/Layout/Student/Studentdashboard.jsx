import React, { useState, useEffect } from 'react';
import LogoNav from '../../Components/Admin/LogoNav';
import Studentnavbar from '../../Components/Student/Studentnavbar';
import Attendancedetails from '../Charts/Attendancedetails';
import Taskdetails from '../Charts/Taskdetails';
import Assessmentdetails from '../Charts/Assessmentdetails';
import Academicsdetails from '../Charts/Academicsdetails';
import AllCharts from '../Charts/AllCharts';
import StudentCV from './StudentCV ';

const Studentdashboard = () => {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const storedPreference = sessionStorage.getItem('sidebarCollapsed');
    return storedPreference !== null ? JSON.parse(storedPreference) : false;
  });

  const [showattendancechart, setshowattendancechart] = useState(false);
  const [showtaskchart, setshowtaskchart] = useState(false);
  const [showassessmentchart, setshowassessmentchart] = useState(false);
  const [showacademicschart, setshowacademicschart] = useState(false);
  const [showallchart, setshowallchart] = useState(false);
  const [showcv, setshowcv] = useState(false);

  useEffect(() => {
    // Save collapsed state changes to sessionStorage
    sessionStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  useEffect(() => {
    // Set showallchart to true when the component mounts
    setshowallchart(true);
  }, []);

  // Collapse toggle function
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleOptions = (component) => {
    console.log ("component clicked",component)
    // Hide all charts by default
    setshowattendancechart(false);
    setshowtaskchart(false);
    setshowassessmentchart(false);
    setshowacademicschart(false);
    setshowallchart(false);
    setshowcv(false);

    // Show the respective chart based on the selected option
    if (component === "Home") {
      setshowallchart(true);
    }
    else if (component === "Task") {
      setshowtaskchart(true);
    }
    else if (component === "Assessment") {
      setshowassessmentchart(true);
    }
    else if (component === "Attendance") {
      setshowattendancechart(true);
    }
    else if (component === "Academics") {
      setshowacademicschart(true);
    }
    else if(component === "CV"){
      setshowcv(true);
    }
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

          <button onClick={() => handleOptions("Home")}  className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i className="fa-solid fa-house pr-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Home</p>
          </button>

          <button onClick={() => handleOptions("Task")}   className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i class="fa-solid fa-list-check" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Task</p>
          </button>
          <button onClick={() => handleOptions("Assessment")}  className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-pen-to-square" style={{ color: "#ffffff" }}/>
            <p className="relative top-2 text-base">&nbsp;Assessment</p>
          </button>
          <button onClick={() => handleOptions("Attendance")}  className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
          <i className="fa-solid fa-user-check p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Attendance</p>
          </button>
          <button onClick={() => handleOptions("Academics")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i class="fa-solid fa-book-open-reader" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;Academics</p>
          </button>
          <button onClick={() => handleOptions("CV")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i className="fa-regular fa-address-card" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">&nbsp;CV</p>
          </button>
        </nav>
      </div>
      {showattendancechart && <Attendancedetails/>}
      {showtaskchart && <Taskdetails/>}
      {showassessmentchart && <Assessmentdetails/>}
      {showacademicschart && <Academicsdetails/>}
      {showallchart && <AllCharts/>}
      {showcv && <StudentCV/>}
    </section>
  )
}

export default Studentdashboard;




// import React,{useState,useEffect} from 'react'
// import LogoNav from '../../Components/Admin/LogoNav'
// import Studentnavbar from '../../Components/Student/Studentnavbar'
// import Attendancedetails from '../Charts/Attendancedetails'
// import Taskdetails from '../Charts/Taskdetails'
// import Assessmentdetails from '../Charts/Assessmentdetails'
// import Academicsdetails from '../Charts/Academicsdetails'
// import AllCharts from '../Charts/AllCharts'

// const Studentdashboard = () => {

//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
//     const storedPreference = sessionStorage.getItem('sidebarCollapsed');
//     return storedPreference !== null ? JSON.parse(storedPreference) : false;
//   });

//     const [showattendancechart,setshowattendancechart]=useState(false);
//     const [showtaskchart,setshowtaskchart]=useState(false);
//     const [showassessmentchart,setshowassessmentchart]=useState(false);
//     const [showacademicschart,setshowacademicschart]=useState(false);
//     const [showallchart,setshowallchart]=useState(false);

//     useEffect(() => {
//       // Save collapsed state changes to sessionStorage
//       sessionStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
//     }, [isSidebarCollapsed]);
  
//     // Collapse toggle function
//     const toggleSidebarCollapse = () => {
//       setIsSidebarCollapsed(!isSidebarCollapsed);
//     };
  
//     const handleOptions = (component) => {
//       if(component === "Home"){
//         setshowattendancechart(false);
//         setshowtaskchart(false);
//         setshowassessmentchart(false);
//         setshowacademicschart(false);
//         setshowallchart(true);
//       }
//       else if (component === "Attendance") {
//         setshowattendancechart(true);
//         setshowtaskchart(false);
//         setshowassessmentchart(false);
//         setshowacademicschart(false);
//         setshowallchart(false);
//       }
//       else if (component === "Task")
//       {
//         setshowtaskchart(true);
//         setshowattendancechart(false);
//         setshowassessmentchart(false);
//         setshowacademicschart(false);
//         setshowallchart(false);
//       }
//       else if(component === "Assessment")
//       {
//         setshowassessmentchart(true);
//         setshowtaskchart(false);
//         setshowattendancechart(false);
//         setshowacademicschart(false);
//         setshowallchart(false);
//       }
//       else if(component === "Academics")
//       {
//         setshowassessmentchart(false);
//         setshowtaskchart(false);
//         setshowattendancechart(false);
//         setshowacademicschart(true);
//         setshowallchart(false);
//       }
//     };

//   return (
//     <section>
//       <LogoNav/>
//       <Studentnavbar/>

//       <div className="fixed h-full">
//         <nav className={`sideb h-full flex flex-col bg-blue-950 ${isSidebarCollapsed ? 'collapsed-sidebar' : ''}`}>
//         <button onClick={toggleSidebarCollapse} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
//             {isSidebarCollapsed ? (
//               <i class="fa-solid fa-angles-right p-2" style={{ color: "#ffffff" }} /> // Expand icon
//             ) : (
//               <i class="fa-solid fa-angles-left p-2" style={{ color: "#ffffff" }} /> // Collapse icon
//             )}
//             <p className="relative top-2 text-base">Collapse</p>
//           </button>

//           <button onClick={() => handleOptions("Home")}  className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
//             <i className="fa-solid fa-house pr-2" style={{ color: "#ffffff" }} />
//             <p className="relative top-2 text-base">Home</p>
//           </button>
          

//           <button onClick={() => handleOptions("Task")}   className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
//           <i className="fa-regular fa-address-card" style={{ color: "#ffffff" }} />
//             <p className="relative top-2 text-base">&nbsp;Task</p>
//           </button>
//           <button onClick={() => handleOptions("Assessment")}  className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
//           <i className="fa-regular fa-address-card" style={{ color: "#ffffff" }} />
//             <p className="relative top-2 text-base">&nbsp;Assessment</p>
//           </button>
//           <button onClick={() => handleOptions("Attendance")}  className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
//           <i className="fa-regular fa-address-card" style={{ color: "#ffffff" }} />
//             <p className="relative top-2 text-base">&nbsp;Attendane</p>
//           </button>
//           <button  onClick={() => handleOptions("Academics")}   className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
//           <i className="fa-regular fa-address-card" style={{ color: "#ffffff" }} />
//             <p className="relative top-2 text-base">&nbsp;Academics</p>
//           </button>
//           <button  className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
//           <i className="fa-regular fa-address-card" style={{ color: "#ffffff" }} />
//             <p className="relative top-2 text-base">&nbsp;CV</p>
//           </button>
//         </nav>
//       </div>
//       {showattendancechart && <Attendancedetails/>}
//      {showtaskchart && <Taskdetails/>}
//       {showassessmentchart && <Assessmentdetails/>}
//       {showacademicschart && <Academicsdetails/>}
//      {/* {showallchart && <AllCharts/>} */}
//      <AllCharts/>
//     </section>
//   )
// }

// export default Studentdashboard
