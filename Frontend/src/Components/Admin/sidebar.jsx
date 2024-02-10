import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="absolute h-full">
        <nav className="sideb h-full sm:h-full flex flex-col bg-blue-950">
          {/* Home Buttton */}
          <button
            onClick={() => handlehomeOption("Home")}
            className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 "
          >
            <i
              className="fa-solid fa-house pr-2"
              style={{ color: "#ffffff" }}
            />
            <p className="relative top-2 text-base">Home</p>
          </button>

          {/* Student Button */}
          <button
            onClick={toggleFacultyOptions}
            className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 "
          >
            <i
              className="fa-solid fa-graduation-cap p-2"
              style={{ color: "#ffffff" }}
            />
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
                onClick={() => handlesuboptionstudent("")}
              >
                Program
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
          <button
            onClick={toggleStudentOptions}
            className="w-100 rounded-md h-10 flex justify-center items-center px-4 text-white bg-blue-600 "
          >
            <i
              className="fa-solid fa-chalkboard-user p-2"
              style={{ color: "#ffffff" }}
            />
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
  )
}

export default Sidebar