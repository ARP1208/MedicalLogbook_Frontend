import React, { useState } from 'react'
import Navbar from './Navbar'

const Announcementsidebar = () => {

  const [showFacultyOptions, setShowFacultyOptions] = useState(false);
  const [showStudentOptions, setShowStudentOptions] = useState(false);
  const [showAddEditStudent, setShowAddEditStudent] = useState(false);
  const [showAddEditFaculty, setShowAddEditFaculty] = useState(false);
  const [showsearchstudent, setshowsearchstudent] = useState(false);
  const [showsearchfaculty, setshowsearchfaculty] = useState(false);

  const toggleFacultyOptions = () => {
    setShowFacultyOptions(!showFacultyOptions);
    setShowStudentOptions(false);
  };

  const toggleStudentOptions = () => {
    setShowStudentOptions(!showStudentOptions);
    setShowFacultyOptions(false);
  };



  return (
    <section> <Navbar />

      <div className="side-bar">
        <nav className="left-navbar">
          <button className="w-30 h-15">
            <a href="/Announcementsidebar">
              {" "}
              <img className="home" alt="home icon" />
              &nbsp; Home
            </a>
          </button>
          <button className="sidelink">
            <img className="student" alt="student icon" />
            &nbsp; Student
          </button>
          {showFacultyOptions && (
            <>
              <button
                className="sidebaritem bg-transparent"
              // onClick={() => handlesuboptionstudent("AddEditStudent")}
              >
                <div className="flex ">
                  <img
                    className="addstudent flex"
                    alt="add student icon"
                  />
                  &nbsp; Add / Edit Student
                </div>
              </button>

              <button
                className="sidebaritem bg-transparent"
              >
                <div className="flex ">
                  <img className="search" src={search} alt="search icon" />
                  &nbsp; Search Student
                </div>
              </button>
            </>
          )}

          <button className="sidelink" onClick={toggleStudentOptions}>
            <img className="faculty" alt="faculty icon" />
            &nbsp; Faculty
          </button>
          {showStudentOptions && (
            <div>
              <button
                className="sidebaritem bg-transparent"
              >
                <div className="flex ">
                  <img
                    className="addfaculty"

                    alt="add faculty icon"
                  />
                  &nbsp; Add / Edit Faculty
                </div>
              </button>
              <button
                className="sidebaritem bg-transparent"

              >
                <div className="flex ">
                  <img className="search" alt="search icon" />
                  &nbsp; Search Faculty
                </div>
              </button>
            </div>
          )}

          {/* {showAddEditStudent && <Addeditstudentlayout />}
          {showsearchstudent && <Searchstudent />}
          {showAddEditFaculty && <Addeditfaculty />}
          {showsearchfaculty && <Searchfaculty />} */}
          {/* {!showStudentOptions && <AddStudent />}
          {!showFacultyOptions && <AddFaculty />} */}
        </nav>
      </div>


    </section>

  )
}

export default Announcementsidebar
