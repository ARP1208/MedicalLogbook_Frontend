import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/Style/samp.css"
import "./Components/Style/style.css"

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Addeditstudentlayout from "./Layout/Admin/Addeditstudentlayout.jsx";
import Login from "./Layout/Login/Adminloginform.jsx";
import Adminsidebar from "./Components/Admin/Adminsidebar.jsx";
import Adminhomepage from "./Layout/Admin/Adminhomepage.jsx";

import SearchStudent from "./Layout/Admin/Searchstudent.jsx";
import Addeditfaculty from "./Layout/Admin/Addeditfaculty.jsx";
import Searchfaculty from "./Layout/Admin/Searchfaculty.jsx";
import Announcement from "./Layout/Admin/Announcement.jsx";
import Navbar from "./Components/Admin/Navbar.jsx";
import Announcementsidebar from "./Components/Admin/Announcementsidebar.jsx";
import Sidebarannouncement from "./Components/Admin/Sidebarannouncement.jsx";
import Announcementhomepage from "./Layout/Admin/Announcementhomepage.jsx";
import EditAnnouncement from "./Layout/Admin/EditAnnouncement.jsx";

import Gradesheethomepage from "./Layout/Admin/Gradesheethomepage.jsx";
import Entermarksgradesheet from "./Layout/Admin/Entermarksgradesheet.jsx";
import EditGradeSheetMarks from "./Layout/Admin/EditGradeSheetMarks.jsx";
import GradesheetDashboard from "./Layout/Admin/GradesheetDashboard.jsx";
import Facultyhomepage from "./Layout/Faculty/Facultyhomepage.jsx";
import Facultyannouncement from "./Layout/Faculty/Facultyannouncement.jsx";
import CreateTaskPglogbook from "./Layout/Faculty/CreateTaskPglogbook.jsx";
import Pgloghomepage from "./Layout/Faculty/Pgloghomepage.jsx";
import Editstudent from "./Layout/Admin/Editstudent.jsx";
import Profilehomepage from "./Layout/Faculty/Profilehomepage.jsx";
import Profilefaculty from "./Layout/Faculty/Profilefaculty.jsx";

import Editfaculty from "./Layout/Admin/Editfaculty.jsx";
import Dashboardpglog from "./Layout/Faculty/Dashboardpglog.jsx";
import Academicshomepage from "./Layout/Faculty/Academicshomepage.jsx";
import GenrateInternalmarks from "./Layout/Faculty/GenrateInternalmarks.jsx";
import Internalmarks from "./Layout/Faculty/Internalmarks.jsx";
import Createannouncement from "./Layout/Admin/Createannouncement.jsx";
import AssignSubject from "./Layout/Admin/AssignSubject.jsx";
import GenerateInternalMarks from "./Layout/Faculty/GenrateInternalmarks.jsx";
import Assessmenthomepage from "./Layout/Faculty/Assessmenthomepage.jsx";
import Assessmentdashboard from "./Layout/Faculty/Assessmentdashboard.jsx";
import EditAssessment from "./Layout/Faculty/EditAssessment.jsx";
import Dashboardhomepage from "./Layout/Faculty/Dashboardhomepage.jsx";
import Studentnavbar from "./Components/Student/Studentnavbar.jsx";
import Studenthomepage from "./Layout/Student/Studenthomepage.jsx";
import Profilestudenthomepage from "./Layout/Student/Profilestudenthomepage.jsx";
import Pglogstudenthome from "./Layout/Student/Pglogstudenthome.jsx";
import StudentAnnouncementhome from "./Layout/Student/StudentAnnouncementhome.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Login />}></Route>
      <Route
        index={true}
        path="/addeditstudentlayout"
        element={<Addeditstudentlayout />}
      ></Route>
       <Route
        index={true}
        path="/GenerateInternalMarks"
        element={<GenerateInternalMarks />}
      ></Route>
      <Route
        index={true}
        path="/Adminsidebar"
        element={<Adminsidebar />}
      ></Route>
      <Route
        index={true}
        path="/Adminhomepage"
        element={<Adminhomepage />}
      ></Route>
      <Route
        index={true}
        path="/Searchstudent"
        element={<SearchStudent />}
      ></Route>
      <Route
        index={true}
        path="/Addeditfaculty"
        element={<Addeditfaculty />}
      ></Route>
      <Route
        index={true}
        path="/Searchfaculty"
        element={<Searchfaculty />}
      ></Route>
      <Route
        index={true}
        path="/Announcement"
        element={<Announcement />}
      ></Route>
      {/* <Route index={true} path="/Gradesheet" element={<Gradesheet/>}></Route> */}
      <Route index={true} path="/Navbar" element={<Navbar />}></Route>
      <Route
        index={true}
        path="/Announcementsidebar"
        element={<Announcementsidebar />}
      ></Route>
      <Route
        index={true}
        path="/Sidebarannouncement"
        element={<Sidebarannouncement />}
      ></Route>
      <Route
        index={true}
        path="/Announcementhomepage"
        element={<Announcementhomepage />}
      ></Route>
      <Route
        index={true}
        path="/EditAnnouncement"
        element={<EditAnnouncement />}
      ></Route>
      <Route
        index={true}
        path="/Createannouncement"
        element={<Createannouncement />}
      ></Route>
      <Route
        index={true}
        path="/Gradesheethomepage"
        element={<Gradesheethomepage />}
      ></Route>
      <Route
        index={true}
        path="/Entermarksgradesheet"
        element={<Entermarksgradesheet />}
      ></Route>
      <Route
        index={true}
        path="/EditGradeSheetMarks"
        element={<EditGradeSheetMarks />}
      ></Route>
      <Route
        index={true}
        path="/GradesheetDashboard"
        element={<GradesheetDashboard />}
      ></Route>
      <Route
        index={true}
        path="/Facultyhomepage"
        element={<Facultyhomepage />}
      ></Route>
      <Route
        index={true}
        path="/Facultyannouncement"
        element={<Facultyannouncement />}
      ></Route>
      <Route
        index={true}
        path="/CreateTaskPglogbook"
        element={<CreateTaskPglogbook />}
      ></Route>
      <Route
        index={true}
        path="/Pgloghomepage"
        element={<Pgloghomepage />}
      ></Route>
      <Route index={true} path="/Editstudent" element={<Editstudent />}></Route>
      <Route
        index={true}
        path="/Profilehomepage"
        element={<Profilehomepage />}
      ></Route>
      <Route
        index={true}
        path="/Profilefaculty"
        element={<Profilefaculty />}
      ></Route>
      <Route
        index={false}
        path="/AssignSubject"
        element={<AssignSubject />}
      ></Route>
        <Route
        index={true}
        path="/Editfaculty"
        element={<Editfaculty />}
      ></Route>
      <Route
        index={true}
        path="/Dashboardpglog"
        element={<Dashboardpglog />}
      ></Route>
      <Route
        index={true}
        path="/Academicshomepage"
        element={<Academicshomepage />}
      ></Route>
       <Route
        index={true}
        path="/GenrateInternalmarks "
        element={<GenrateInternalmarks  />}
      ></Route>
       <Route
        index={true}
        path="/Internalmarks"
        element={<Internalmarks />}
      ></Route>
      <Route
        index={true}
        path="/Assessmenthomepage"
        element={<Assessmenthomepage />}
      ></Route>
      <Route
        index={true}
        path="/Assessmentdashboard"
        element={<Assessmentdashboard />}
      ></Route>
       <Route
        index={true}
        path="/EditAssessment"
        element={<EditAssessment />}
      ></Route>
        <Route
        index={true}
        path="/Dashboardhomepage"
        element={<Dashboardhomepage />}
      ></Route>
      <Route
        index={true}
        path="/Studentnavbar"
        element={<Studentnavbar />}
      ></Route>
      <Route
        index={true}
        path="/Studenthomepage"
        element={<Studenthomepage />}
      ></Route>
      <Route
        index={true}
        path="/Profilestudenthomepage"
        element={<Profilestudenthomepage />}
      ></Route>
      <Route
        index={true}
        path="/Pglogstudenthome"
        element={<Pglogstudenthome />}
      ></Route>
      <Route
        index={true}
        path="/StudentAnnouncementhome"
        element={<StudentAnnouncementhome />}
      ></Route>

    </Route>
    
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);