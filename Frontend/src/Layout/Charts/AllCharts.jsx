import React, { useState, useEffect } from "react";
import Taskchart from "./Taskchart";
import Academicschart from "./Academicschart";
import Assessmentchart from "./Assessmentchart";
import Attendancechart from "./Attendancechart";
import Dashboardfilter from "./Dashboardfilter";

const AllCharts = ({ name = "Luffy", regno = 220970062, year = "2020-2021", program = "MBBS", subject = null }) => {
  const [semester, setSemester] = useState(null);

  // Assessment Marks
  const [assessmentMarks, setAssessmentMarks] = useState(null);
  const [visibleAssessmentMarks, setVisibleAssessmentMarks] = useState(null);

  // Internal and External Marks
  const [marks, setMarks] = useState(null);
  const [visibleExamMarks, setVisibleExamMarks] = useState(null);

  // Student Attendence
  const [attendance, setAttendance] = useState(null);
  const [visibleAttendance, setVisibleAttendance] = useState(null);
  const [percentage, setPercentage] = useState([]);

  // Student Task Data
  const [taskData, setTaskData] = useState(null)

  const getAssessments = async () => {
    const url = "http://localhost:8000/student/fetchStudentAssessmentMarks";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          regno: regno,
        }),
      });
      const data = await response.json();
      setAssessmentMarks(data.marks);
      // console.log("Assessment Marks: ",data.marks);

      if (!response.ok) {
        console.log("Response is not ok");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMarks = async () => {
    const url = "http://localhost:8000/student/fetchMarks";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          regno: regno,
          AcademicYear: year,
        }),
      });
      const data = await response.json();
      if (subject !== null) {
        const filteredData = data.filter(item => item.subjectName === subject);
        setMarks(filteredData);
      } else {
        console.log(data);
        setMarks(data);
      }

      if (!response.ok) {
        console.log("Error fetching internal/external marks");
      }
    } catch (e) {
      console.log(e);
    }
  };

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
      if (subject !== null) {
        const filteredData = responseData.map(item => ({
          ...item,
          subjects: item.subjects.filter(sub => sub.subjectName === subject)
        }));
        console.log("Filtered: ", filteredData);
        setAttendance(filteredData);
      } else {
        console.log("All: ", responseData);
        setAttendance(responseData);
      }

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
      { name: "Present", value: percentageData, days: totalDaysPresent },
      { name: "Absent", value: 100-percentageData, days: totalDaysAbsent }
    ]);
  };

  const getTaskData = async () => {
    const url = "http://localhost:8000/faculty/searchTask";
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          searchTerm: name
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const responseData = await response.json();
      const tasks = responseData.taskData;
  
      // Calculate counts of tasks based on status
      const yetToStartCount = tasks.filter(task => task.Status === 0).length;
      const startedCount = tasks.filter(task => task.Status === 1).length;
      const completedCount = tasks.filter(task => task.Status === 2).length;
      const approvedCount = tasks.filter(task => task.Status === 3).length;
  
      // Set task data state
      setTaskData([
        { name: "Yet to Start", value: yetToStartCount },
        { name: "Started", value: startedCount },
        { name: "Completed", value: completedCount },
        { name: "Approved", value: approvedCount }
      ]);
  
      if (!response.ok) {
        console.log("Error fetching student's task details");
      }
    } catch (e) {
      console.log(e);
    }
  };  
  

  useEffect(() => {
    getAssessments();
    getMarks();
    getAttendance();
    getTaskData();
  }, []);

  useEffect(() => {
    if (
      semester !== null &&
      assessmentMarks !== null &&
      assessmentMarks.length > 0
    ) {
      // Filtering out assessment marks
      const filteredMarks = assessmentMarks.filter(
        (item) => item.semester === semester
      );
      // console.log("Filtered Marks: ", filteredMarks);
      setVisibleAssessmentMarks(
        filteredMarks.length > 0 ? filteredMarks : null
      );
    } else {
      setVisibleAssessmentMarks(null);
    }

    if (semester !== null && marks !== null && marks.length > 0) {
      // Filtering out internal/external marks
      const filteredExamMarks = marks.filter(
        (item) =>
          item.semesterNumber === semester && item.internalMarks !== null
      );
      // console.log("Filtered internal/external marks: ", filteredExamMarks);
      setVisibleExamMarks(
        filteredExamMarks.length > 0 ? filteredExamMarks : null
      );
    } else {
      setVisibleExamMarks(null);
    }

    if (semester !== null && attendance !== null && attendance.length > 0) {
      // Filtering out internal/external marks
      const filteredAttendance = attendance.filter(
        (item) => item.semesterNumber === semester
      );
      // console.log("Filtered attendance: ", filteredAttendance);
      setVisibleAttendance(
        filteredAttendance.length > 0 ? filteredAttendance : null
      );
      if (filteredAttendance.length > 0) {
        calculatePercentage(filteredAttendance);
      }
    } else {
      setVisibleAttendance(null);
    }
  }, [semester, assessmentMarks, marks, attendance]);

  return (
    <>
      <Dashboardfilter onSemesterChange={setSemester} />

      <div className="flex flex-col w-fit h-72 overflow-scroll absolute left-40">
        <div className=" h-screen fixed overflow-auto w-fit">
          <div className="flex flex-row gap-20 w-fit h-fit relative ">
            <div className="scale-75">
              <Assessmentchart array={visibleAssessmentMarks} />
              <div className="ml-70 py-3 font-medium text-xl">
                Assessment detail
              </div>
            </div>

            <div className="scale-125">
              <Taskchart data={taskData}/>
              <div className="left-20 -top-56 py-3 font-medium text-lg relative scale-75">
                Task detail
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-20 relative">
            <div className="scale-75">
              <Academicschart examMarks={visibleExamMarks} />
              <div className=" ml-70 relative -top-32 font-medium text-xl">
                Academics detail
              </div>
            </div>
            <div className="scale-125">
              <Attendancechart data={percentage} />
              <div className="left-20 -top-80 py-3 font-medium text-lg relative scale-75">
                Attendance detail
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCharts;
