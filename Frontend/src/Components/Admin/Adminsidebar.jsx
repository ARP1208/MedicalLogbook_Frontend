import React, { useState } from "react";

import Addeditstudentlayout from "../../Layout/Admin/Addeditstudentlayout";

const AddFaculty = () => {
  return <div>Faculty</div>;
};

const AddStudent = () => {
  return <div>Student</div>;
};

const Adminsidebar = () => {
  const [showFacultyOptions, setShowFacultyOptions] = useState(false);
  const [showStudentOptions, setShowStudentOptions] = useState(false);
  const [showAddEditStudent, setShowAddEditStudent] = useState(false);

  const toggleFacultyOptions = () => {
    setShowFacultyOptions(!showFacultyOptions);
    setShowStudentOptions(false);
  };

  const toggleStudentOptions = () => {
    setShowStudentOptions(!showStudentOptions);
    setShowFacultyOptions(false);
  };
  const handlesuboption = (component) => {
    setShowAddEditStudent(false);

    if (component === "AddEditStudent") {
      setShowAddEditStudent(true);
    }
  }

  return (
    <div className="container">
      <div className="side-bar">
        <nav className="left-navbar">
          <button className="sidelink" onClick={toggleFacultyOptions}>
            Student
          </button>
          {showFacultyOptions && (
            <div>
              <button
                className="sidebaritem"
                onClick={() => handlesuboption("AddEditStudent")}
              >
                Add / Edit Student
              </button>

              <button
                className="sidebaritem"
                onClick={() => console.log("Search Student clicked")}
              >
                Search Student
              </button>
            </div>
          )}

          <button className="sidelink" onClick={toggleStudentOptions}>
            Faculty
          </button>
          {showStudentOptions && (
            <div >
              <button
                className="sidebaritem"
                onClick={() => console.log("Add / Edit Faculty clicked")}>
                Add / Edit Faculty
              </button>
              <button
                className="sidebaritem"
                onClick={() => console.log("Search Faculty clicked")}>
                Search Faculty
              </button>
            </div>
          )}

          {showAddEditStudent && <Addeditstudentlayout />}
          {!showFacultyOptions && <AddFaculty />}
          {!showStudentOptions && <AddStudent />}
        </nav>
      </div>
    </div>
  );
};

export default Adminsidebar;
