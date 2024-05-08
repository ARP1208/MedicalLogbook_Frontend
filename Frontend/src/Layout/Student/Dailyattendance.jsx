import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { getLoginResponse } from '../Login/Logged_user'

const GenerateSubject = () => {
  const subjects = [
    { value: "select Subject", label: "Select Subject" },
    { value: "Sub 1", label: "Subject 1" },
    { value: "Sub 2", label: "Subject 2" },
    { value: "Sub3", label: "Subject 3" },
    { value: "Sub4", label: "Subject 4" },
  ];

  return subjects;
};



const GenerateSemester = () => {
  const semesters = [
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

  return semesters;
};

const fetchAttendanceData = async (requestData) => {
  try {
    const response = await axios.post('http://localhost:8000/student/fetchAttendancedialy', requestData);
    return response.data; // Assuming the response is JSON data
  } catch (error) {
    console.error("Error fetching attendance data:", error.message);
    throw new Error(error.response?.data || 'Error fetching attendance data');
  }
};

const Dailyattendance = () => {
  const responseData = getLoginResponse(); // Assuming you have a function to get login response

  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState(null);


  const [studentData, setStudentData] = useState({
    studentname: "",
    regno: "",
    academicYear: "",

  });


  useEffect(() => {
    if (location.state && location.state.studentData) {
      const studentData = location.state.studentData;
      setStudentData({
        studentname: studentData.studentname,
        regno: studentData.regno,
        academicYear: studentData.academicYear,

      });
    }
  }, [location]);


  const getDetails = async () => {
    const url = "http://localhost:8000/student/getstudentdetails"; // Your backend API endpoint
    console.log("Fetching details for: ", responseData.email);
    let data = {
      "email": responseData.email,

    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
  }, [])



  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSemester || !selectedSubject) {
        console.error("Semester or Subject not selected");
        return;
      }



      const formattedDate = startDate.toISOString().split('T')[0];

      const data = {
        regno: studentData?.regno || '',
        name: studentData?.studentname || '',
        "Academic year": studentData?.academicYear?.year || '',
        semesters: [selectedSemester?.value] || [], // Ensure it's an array
        date: formattedDate,
        day: studentData?.day,
        subjectName: selectedSubject?.value || '',
      };

      console.log("Request Data:", data); // Log the request data

      try {
        console.log("Fetching attendance data...");
        const studentAttendance = await fetchAttendanceData(data);
        console.log("Attendance data fetched successfully:", studentAttendance);
        const day = studentAttendance.length > 0 ? studentAttendance[0].attendanceDays[0] : ''; // Assuming day is available in the first attendance record
        setAttendanceData(studentAttendance);

        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error while fetching attendance data:", error);
        setError('Error fetching attendance data');
      }
    };

    fetchData();
  }, [selectedSemester, selectedSubject, startDate]);

  return (
    <section className="left-50 absolute">
      <div className="absolute flex left-10 top-4">
        <button className="bg-sky-500 rounded-md w-fit text-lg">
          Daily Attendance
        </button>
      </div>

      <div className="border-1 px-10 py-4 h-auto w-auto overflow-hidden rounded-md border-black flex flex-col justify-center items-center mx-10 mt-18">
        <div className="overflow-hidden block">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 text-balance">
            <div className="flex flex-row gap-x-7 justify-center items-center">
              Semester
              <Select
                value={selectedSemester}
                onChange={setSelectedSemester}
                options={GenerateSemester()}
                className="w-20vw"
              />
            </div>
            <div className="flex flex-row gap-x-5 justify-center items-center">
              Subject
              <Select
                value={selectedSubject}
                onChange={setSelectedSubject}
                options={GenerateSubject()}
                className="w-20vw"
              />
            </div>
            <div className="flex flex-row gap-x-5 justify-center items-center">
              Date
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border rounded py-2 px-3 text-gray-700 leading-tight"
              />
            </div>
          </div>
          <div className=" grid grid-cols-3 mt-5">
            <h6>Name: {studentData?.studentname}</h6>
            <h6>Registration Number: {studentData?.regno}</h6>
            <h6>Semester: {selectedSemester?.value}</h6>
          </div>
          <form>
            <div className="flex w-auto h-40vh border-1 mt-2 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Date
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Day
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Subject Name
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((item, index) => (
                    item.attendanceDates.map((dateItem, dateIndex) => (
                      <tr key={`${index}-${dateIndex}`}>
                        <td className="border border-black px-4 py-2">{dateItem}</td>
                        <td className="border border-black px-4 py-2">{item.attendanceDays[dateIndex]}</td>
                        <td className="border border-black px-4 py-2">{item.subjectName}</td>
                        <td className="border border-black px-4 py-2">
                          <span style={{ color: item.attendanceStatus[dateIndex] === 0 ? "red" : "green" }}>
                            {item.attendanceStatus[dateIndex] === 0 ? "ABSENT" : "PRESENT"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Dailyattendance;