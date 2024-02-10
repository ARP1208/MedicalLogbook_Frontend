import React, { useState } from "react";
import Addeditstudentlayout from "./Addeditstudentlayout";
import Searchstudent from "./Searchstudent";
import Addeditfaculty from "./Addeditfaculty";
import Searchfaculty from "./Searchfaculty";
import Navbar from "../../Components/Admin/Navbar";
import LogoNav from "../../Components/Admin/LogoNav";
import AssignSubject from "./Assignsubject";

const Adminhomepage = () => {
  const [showFacultyOptions, setShowFacultyOptions] = useState(false);
  const [showStudentOptions, setShowStudentOptions] = useState(false);
  const [showAddEditStudent, setShowAddEditStudent] = useState(false);
  const [showAddEditFaculty, setShowAddEditFaculty] = useState(false);
  const [showsearchstudent, setshowsearchstudent] = useState(false);
  const [showsearchfaculty, setshowsearchfaculty] = useState(false);
  const [showeditfaculty,setshoweditfaculty]=useState(false);
  const [showassignsubject,setshowassignsubject]=useState(false);
  const [showeditstudent,setshoweditstudent]=useState(false);

  const toggleFacultyOptions = () => {
    setShowFacultyOptions(!showFacultyOptions);
    setShowStudentOptions(false);
  };

  const toggleStudentOptions = () => {
    setShowStudentOptions(!showStudentOptions);
    setShowFacultyOptions(false);
  };

  const handlesuboptionstudent = (component) => {
    setShowAddEditStudent(false);

    if (component === "AddEditStudent") {
      setShowAddEditStudent(true);
      setshowsearchstudent(false);
      setShowAddEditFaculty(false);
      setshowsearchfaculty(false);
      setshowassignsubject(false);
      setshoweditstudent(false);
    } else if (component === "Searchstudent") {
      setshowsearchstudent(true);
      setShowAddEditStudent(false);
      setShowAddEditFaculty(false);
      setshowsearchfaculty(false);
      setshowassignsubject(false);
      setshoweditstudent(false);
    }else if(component === "AssignSubject")
    {
      setShowAddEditStudent(false);
      setshowsearchstudent(false);
      setShowAddEditFaculty(false);
      setshowsearchfaculty(false);
      setshowassignsubject(true);
      setshoweditstudent(false);
    }
    else if(component === "Editstudent"){
      setShowAddEditStudent(false);
      setshowsearchstudent(false);
      setShowAddEditFaculty(false);
      setshowsearchfaculty(false);
      setshowassignsubject(false);
      setshoweditstudent(true);
    }
  };

  const handlesuboptionfaculty = (component) => {
    setShowAddEditFaculty(false);

    if (component === "AddEditFaculty") {
      setShowAddEditFaculty(true);
      setShowAddEditStudent(false);
      setshowsearchstudent(false);
      setshowsearchfaculty(false);
      setshoweditfaculty(false);
      setshowassignsubject(false);
      setshoweditstudent(false);
    }else if(component === "Editfaculty"){
      setShowAddEditFaculty(false);
      setShowAddEditStudent(false);
      setshowsearchstudent(false);
      setshowsearchfaculty(false);
      setshoweditfaculty(true);
      setshowassignsubject(false);
      setshoweditstudent(false);
    } else if (component === "Searchfaculty") {
      setshowsearchfaculty(true);
      setShowAddEditFaculty(false);
      setShowAddEditStudent(false);
      setshowsearchstudent(false);
      setshoweditfaculty(false);
      setshowassignsubject(false);
      setshoweditstudent(false);
    }
  };

  const handlehomeOption = (component) =>{
    if(component === "Home"){
      setshowsearchfaculty(false);
      setShowAddEditFaculty(false);
      setShowAddEditStudent(false);
      setshowsearchstudent(false);
      setshowsearchstudent(false);
      setShowAddEditStudent(false);
      setShowAddEditFaculty(false);
      setshowsearchfaculty(false);
      setShowStudentOptions(false);
      setShowFacultyOptions(false);
      setshoweditfaculty(false);
      setshowassignsubject(false);
      setshoweditstudent(false);
    }
   
  }

  return (
    <section>
      <LogoNav />
      <Navbar />

      {showAddEditStudent && <Addeditstudentlayout />}
      {showsearchstudent && <Searchstudent />}
      {showAddEditFaculty && <Addeditfaculty />}
      {showsearchfaculty && <Searchfaculty />}
      {showassignsubject && <AssignSubject/>}

      <div className="absolute h-full">
        <nav className="sideb h-83vh sm:h-full flex flex-col bg-blue-950">

          {/* Home Buttton */}
          <button onClick={() => handlehomeOption("Home")} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i className="fa-solid fa-house pr-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Home</p>
          </button>

          {/* Student Button */}
          <button onClick={toggleFacultyOptions} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i className="fa-solid fa-graduation-cap p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Student</p>
          </button>
          {showFacultyOptions && (
            <div className="flex flex-col left-10">
              <button
                className="w-100 h-10 bg-transparent focus:ring-4 rounded-lg focus:outline-none focus:ring-blue-300 text-base"
                onClick={() => handlesuboptionstudent("AddEditStudent")}
              >
                Add Student
              </button>

              <button
                className="w-100 h-10 bg-transparent focus:ring-4 rounded-lg focus:outline-none focus:ring-blue-300 text-base"
                onClick={() => handlesuboptionstudent("AssignSubject")}
              >
                  Assign Subject
              </button>

              <button
                className="w-100 h-10 bg-transparent focus:ring-4 rounded-lg focus:outline-none focus:ring-blue-300 text-base"
                onClick={() => handlesuboptionstudent("Searchstudent")}
              >
                Search Student
              </button>
              
            </div>
          )}

          {/* Faculty Button */}
          <button onClick={toggleStudentOptions} className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 ">
            <i className="fa-solid fa-chalkboard-user p-2" style={{ color: "#ffffff" }} />
            <p className="relative top-2 text-base">Faculty</p>
          </button>
          {showStudentOptions && (
            <div>
              <button
                className="w-100  h-10 bg-transparent focus:ring-4 rounded-lg focus:outline-none focus:ring-blue-300 text-base"
                onClick={() => handlesuboptionfaculty("AddEditFaculty")}
              >
                Add Faculty
              </button>
              <button
                className="w-100 h-10 bg-transparent focus:ring-4 rounded-lg focus:outline-none focus:ring-blue-300 text-base"
                onClick={() => handlesuboptionfaculty("Searchfaculty")}
              >
                Search Faculty
              </button>
            </div>
          )}
        </nav>
      </div>
    </section >
  );
};

export default Adminhomepage;