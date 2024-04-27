import React, { useState, useEffect } from "react";
import Assessmentchart from "../Charts/Assessmentchart";
import Dashboardfilter from "./Dashboardfilter";

const Assessmentdetails = () => {
  const [semester, setSemester] = useState(null);
  const [assessmentMarks, setAssessmentMarks] = useState(null);
  const [visibleAssessmentMarks, setVisibleAssessmentMarks] = useState(null);
  const regno = 220970062;

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

  useEffect(() => {
    getAssessments();
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
      console.log("Filtered Marks: ", filteredMarks);
      setVisibleAssessmentMarks(
        filteredMarks.length > 0 ? filteredMarks : null
      );
    } else {
      setVisibleAssessmentMarks(null);
    }
  }, [semester, assessmentMarks]);

  return (
    <>
      <Dashboardfilter onSemesterChange={setSemester} />

      <section className="mt-10 scale-125 absolute left-40 ml-40 flex items-center">
        <Assessmentchart array={visibleAssessmentMarks} ma/>
      </section>
      <div className="text-center relative py-3" style={{ top: "56vh" }}>
        <h3>Assessment details</h3>
        {visibleAssessmentMarks ? (
          <ul style={{ listStyleType: "disc" }}>
            {visibleAssessmentMarks.map((sem) => (
              <li key={sem.semester}>
                <strong>Semester:</strong> {sem.semester}
                <ul style={{ listStyleType: "circle" }}>
                  {sem.assessments.map((assessment) => (
                    <li key={assessment.assessmentName}>
                      <strong>Assessment Name:</strong>{" "}
                      {assessment.assessmentName}
                      <br />
                      <strong>Score:</strong> {assessment.markObtain} /{" "}
                      {assessment.totalMarks}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>Select a semester</p>
        )}
      </div>
    </>
  );
};

export default Assessmentdetails;
