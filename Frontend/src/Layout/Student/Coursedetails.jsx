import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLoginResponse } from "../Login/Logged_user";

import axios from "axios";

import Select from "react-select";

const GenerateSemester = (marks) => {
  if (marks && marks.length > 0) {
    const uniqueSemesters = [
      ...new Set(marks.map((mark) => mark.semesterNumber)),
    ];
    const Semester = [
      { value: "select Semester", label: "Select Semester" },
      ...uniqueSemesters.map((semester) => ({
        value: semester,
        label: `${semester} Semester `,
      })),
    ];
    return Semester;
  }

  const Semester = [
    { value: "select Semester", label: "Select Semester" },
    { value: "1", label: "1 Semester" },
    { value: "2", label: "2 Semester" },
    { value: "3", label: "3 Semester" },
    { value: "4", label: "4 Semester" },
    { value: "5", label: "5 Semester" },
    { value: "6", label: "6 Semester" },
    { value: "7", label: "7 Semester" },
    { value: "8", label: "8 Semester" },
    { value: "9", label: "9 Semester" },
  ];

  return Semester;
};

const Coursedetails = ({ subjectname, subcode, examination }) => {
  const [selectedSemester, setSelectedSemester] = React.useState({
    value: "Select Semester",
    label: "Select Semester",
  });

  const responseData = getLoginResponse();

  const [marks, setMarks] = React.useState([]);

  const [studentData, setStudentData] = useState({
    studentname: "",
    regno: "",
    academicYear: "",
    course: "",
  });

  useEffect(() => {
    if (location.state && location.state.studentData) {
      const studentData = location.state.studentData;
      setStudentData({
        studentname: studentData.studentname,
        regno: studentData.regno,
        academicYear: studentData.academicYear,
        course: studentData.course,
      });
    }
  }, [location]);

  const getDetails = async () => {
    const url = "http://localhost:8000/student/getstudentdetails"; // Your backend API endpoint
    console.log("Fetching details for: ", responseData.email);
    let data = {
      email: responseData.email,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const studentDetails = await response.json();
        setStudentData(studentDetails);
      } else {
        console.error("Failed to fetch Student details:", response.status);
      }
    } catch (error) {
      console.error("Error while fetching student details:", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  var name = studentData.studentname;
  var regno = studentData.regno;
  var year = studentData.academicYear;
  var program = studentData.course;

  const get_course = async () => {
   
    try {
      const response = await fetch(
        "http://localhost:8000/student/fetchStudentCourseDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            regno: regno,
            name: name,
            AcademicYear: year,
            programName: program,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("data fetched: ", responseData);
      setMarks(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle semester selection
  const handleSemesterChange = (selectedOption) => {
    setSelectedSemester(selectedOption);
    // Call get_course when a semester is selected
    get_course();
  };



  useEffect(() => {
    const maxSemester = Math.max(
      ...marks.map((mark) => parseInt(mark.semesterNumber))
    );
    if (maxSemester !== -Infinity) {
      setSelectedSemester({
        value: maxSemester.toString(),
        label: `${maxSemester} Semester`,
      });
    }
  }, [marks]);

  const semesterOptions = GenerateSemester(marks);

  return (
    <section className="left-45 absolute">
      <div className="absolute flex left-6 top-4">
        <button className="bg-sky-500 rounded-md w-fit text-lg">
          Course Details
        </button>
      </div>

      <div className="border-1 px-6 py-4 h-auto w-auto overflow-hidden rounded-md border-black flex flex-col justify-center items-center mx-6 mt-18">
        <div className="overflow-hidden block">
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-10 gap-y-5 text-balance">
            <h6>Name: {name}</h6>
            <h6>Registration Number:{regno}</h6>
            <Select
              value={selectedSemester}
              onChange={(e) => handleSemesterChange(e)}
              options={semesterOptions}
            />
          </div>
          <form>
            <div className="flex w-70vw h-50vh border-1 mt-3 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      SL. No.
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Subject Code
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Subject Name
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Semester
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Credit
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Section
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {marks
                    .filter(
                      (semesterData) =>
                        semesterData.semesterNumber === selectedSemester.value
                    )
                    .map((semesterData) => {
                      let subjectIndex = 0;
                      return Object.entries(semesterData.subjects || {}).map(
                        ([subjectName, subjectDetails]) => (
                          <tr key={subjectDetails._id}>
                            <td className="border border-black px-4 py-2">
                              {subjectIndex++}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {subjectDetails.subjectcode ? subjectDetails.subjectcode
                                : "-"}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {subjectName ? subjectName
                                : "-"}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {semesterData.semesterNumber ? semesterData.semesterNumber
                                : "-"}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {subjectDetails.credit ? subjectDetails.credit
                                : "-"}
                            </td>
                            <td className="border border-black px-4 py-2">
                              {semesterData.sectionName
                                ? semesterData.sectionName
                                : "-"}
                            </td>
                          </tr>
                        )
                      );
                    })}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Coursedetails;