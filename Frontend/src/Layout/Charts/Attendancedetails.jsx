import React, { useState, useEffect } from "react";
import Attendancechart from "../Charts/Attendancechart";
import Dashboardfilter from "./Dashboardfilter";

const Attendancedetails = () => {
  const [semester, setSemester] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [visibleAttendance, setVisibleAttendance] = useState(null);
  const [percentage, setPercentage] = useState([]);
  const regno = 220970062;
  const year = "2020-2021";
  const program = "MBBS";
  const name = "Luffy";

  const getAttendance = async () => {
    const url = "http://localhost:8000/student/fetchAttendance";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify({
          AcademicYear: year,
          programName: program,
          regno: regno,
          name: name,
        }),
      });
      const responseData = await response.json();
      // console.log(responseData);
      setAttendance(responseData);

      if (!response.ok) {
        console.log("Error fetching attendance");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const calculatePercentage = (attendanceArray) => {
    const subjectArray = attendanceArray[0].subjects;
    let totalClasses = 0;
    let totalDaysPresent = 0;
    let totalDaysAbsent = 0;
    let percentageData;

    // console.log(subjectArray);

    subjectArray.forEach((subject) => {
      totalClasses += subject.Totalclasses;
      totalDaysPresent += subject.Daypresent;
      totalDaysAbsent += subject.DayAbsent;
    });

    percentageData = Math.round((totalDaysPresent / totalClasses) * 100);
    setPercentage([
      { name: "Present", value: percentageData },
      { name: "Absent", value: 100-percentageData },
    ]);
  };

  useEffect(() => {
    getAttendance();
  }, []);

  useEffect(() => {
    if (semester !== null && attendance !== null && attendance.length > 0) {
      // Filtering out internal/external marks
      const filteredAttendance = attendance.filter(
        (item) => item.semesterNumber === semester
      );
      console.log("Filtered attendance: ", filteredAttendance);
      setVisibleAttendance(
        filteredAttendance.length > 0 ? filteredAttendance : null
      );
      if (filteredAttendance.length > 0) {
        calculatePercentage(filteredAttendance);
      }
    } else {
      setVisibleAttendance(null);
    }
  }, [semester, attendance]);

  return (
    <section className="flex flex-row">
      <Dashboardfilter onSemesterChange={setSemester} />
      <div className="mt-40 flex justify-center items-center relative left-2 scale-125">
        <Attendancechart data={percentage} />
      </div>
      <div className="relative text-nowrap py-3" style={{ top: "50vh", right: "28%" }}>
        <h3>Attendance details</h3>
        {visibleAttendance && visibleAttendance.length > 0 ? (
          visibleAttendance.map((item) => (
            <div key={item.semesterNumber}>
              <h4>Semester {item.semesterNumber}</h4>
              {item.subjects.map((subject, index) => (
                <p key={index}>
                'In {subject.subjectName}, your attendance record indicates {subject.Daypresent} days attended and {subject.DayAbsent} days absent out of a total of {subject.Totalclasses} days.'
                </p>
              ))}
            </div>
          ))
        ) : (
          <p>No attendance data available</p>
        )}
      </div>
    </section>
  );
};

export default Attendancedetails;
