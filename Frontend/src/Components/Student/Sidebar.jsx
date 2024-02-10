import React from 'react'
import "../Style/style.css";
import internalicon from '../Assets/icons/internalmarks.png'
import gradesheeticon from '../Assets/icons/gradesheet.png'
import attendanceicon from '../Assets/icons/attendance.png'
import dailyattendanceicon from '../Assets/icons/dailyattendance.png'
import courseicon from '../Assets/icons/coursedetails.png'
import timetableicon from '../Assets/icons/timetable.png'

const Sidebar = () => {
  return (
    <div className='container'>
      <div className="side-bar">
      <nav className="left-navbar">
      <ul className="sidebarcont">
        <li className="sidebaritem">
            <a className="sidelink" href="#">
            <img className="internalicon" src={internalicon}></img>  Internal Marks</a>
        </li>
        <li className="sidebaritem">
            <a className="sidelink" href="/Addeditstudentlayout"><img className="gradesheeticon" src={gradesheeticon}></img>  Grade sheet</a>
        </li>
        <li className="sidebaritem">
            <a className="sidelink" href="#"><img className="attendanceicon" src={attendanceicon}></img>  Attendance</a>
        </li>
        <li className="sidebaritem">
            <a className="sidelink" href="#"><img className="dailyattendanceicon" src={dailyattendanceicon}></img>  Daily Attendance</a>
        </li>
        <li className="sidebaritem">
            <a className="sidelink" href="#"><img className="courseicon" src={courseicon}></img>  Course Details</a>
        </li>
        <li className="sidebaritem">
            <a className="sidelink" href="#"><img className="timetableicon" src={timetableicon}></img>  Timetable</a>
        </li>
      </ul>
    </nav>
      </div>
    </div>
  )
}

export default Sidebar
