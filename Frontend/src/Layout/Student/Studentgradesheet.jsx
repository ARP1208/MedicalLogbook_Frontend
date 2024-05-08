import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const GenerateSemester = (marks) => {
  if (marks && marks.length > 0) {
    const uniqueSemesters = [...new Set(marks.map(mark => mark.semesterNumber))];
    const Semester = [
      { value: "select Semester", label: "Select Semester" },
      ...uniqueSemesters.map(semester => ({ value: semester, label: `${semester} Semester` }))
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

const Studentgradesheet = ({ subjectname, subcode, examination }) => {
  const [selectedSemester, setSelectedSemester] = React.useState({
    value: "Select Semester",
    label: "Select Semester",
  });
  const [marks, setMarks] = React.useState([]);
  const [CGPA, setCGPA] = React.useState(0);
  const [GPA, setGPA] = React.useState([]);
  const [creditsEarned, setCreditsEarned] = React.useState(0)

  var name = "V";
  var regno = 1234;
  var year = "2018-2019";
  var program = "MS";

  const get_marks = async () => {
    let url = "http://127.0.0.1:8000/student/fetchStudentGradeSheet";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          regno: regno,
          AcademicYear: year,
          programName: program,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      setMarks(responseData);
      calculate(responseData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const calculate = (marks) => {
    let totalMarks = 0;
    let totalFullMarks = 0
    let totalCredits = 0;
    let gpa = [];
    let semMarks;
    let subs;

    marks.forEach((semester) => {
      semMarks = 0
      subs = 0
      const subjectsArray = Object.values(semester.subjects);
      subjectsArray.forEach((subject) => {
        if (subject.marks) {
          // totalMarks += subject.marks;
          semMarks += subject.marks;
          subs += 1;
          // totalFullMarks += 1
          if (subject.marks > 40) {
            totalCredits += subject.credit;
          }
        }
      });
      let current_gpa = (semMarks / (subs * 100)) * 9.5
      gpa.push(current_gpa.toFixed(2));
    });
    totalFullMarks *= 100;
    // const cgpa = (((totalMarks / totalFullMarks)) * 9.5).toFixed(2);
    // setCGPA(cgpa);
    console.log(gpa)
    setCreditsEarned(totalCredits);
    setGPA(gpa);

    const filteredGPA = GPA.filter(num => !isNaN(parseFloat(num)));
    const sum = filteredGPA.reduce((acc, val) => acc + parseFloat(val), 0);
    const mean = sum / filteredGPA.length;

    setCGPA(mean.toFixed(2));
  };

  const calculateGPA = () => {
    if (GPA.length === 0) return 0;

    const selectedSemIndex = parseInt(selectedSemester.value) - 1;

    if (selectedSemIndex < 0 || selectedSemIndex >= GPA.length) return "-";

    const selectedSemGPA = GPA[selectedSemIndex];

    if (!selectedSemGPA) return "-";

    const totalMarks = selectedSemGPA[0];
    const numSubjects = selectedSemGPA[1];

    const gpa = ((totalMarks / (numSubjects * 100)) * 9.5).toFixed(2);
    if (isNaN(gpa)) return "-"
    return gpa;
  };



  const gpaForSelectedSemester = calculateGPA();

  useEffect(() => {
    get_marks();
  }, []);

  useEffect(() => {
    const maxSemester = Math.max(...marks.map(mark => parseInt(mark.semesterNumber)));
    if (maxSemester !== -Infinity) {
      setSelectedSemester({
        value: maxSemester.toString(),
        label: `${maxSemester} Semester`,
      });
    }
  }, [marks]);

  const semesterOptions = GenerateSemester(marks);

  return (
    <section className="left-50 absolute">
      <div className="absolute flex left-10 top-4">
        <button className="bg-sky-500 rounded-md w-fit text-lg">
          Gradesheet
        </button>
      </div>

      <div className="border-1 px-10 py-5 h-auto h-60vh w-auto overflow-hidden rounded-md border-black flex flex-col justify-center items-center mx-10 mt-20">
        <div className="overflow-hidden block">
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-10 text-balance">
            <h6>Name: {name}</h6>
            <h6>Registration Number: {regno}</h6>
            <Select
              value={selectedSemester}
              onChange={setSelectedSemester}
              options={semesterOptions}
              className="w-15vw ml-10 py-1"
            />
            <h6>GPA: {GPA[selectedSemester.value - 1]}</h6>
            <h6>CGPA: {CGPA}</h6>
            <h6>Total Credits Earned:{creditsEarned}</h6>
          </div>
          <form>
            <div className="flex w-70vw h-40vh border-1 mt-4 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
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
                    {/* <th className="border bg-blue-950 text-white px-4 py-2">
                      Semester
                    </th> */}
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Marks
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Credit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {marks
                    .filter(semesterData => semesterData.semesterNumber === selectedSemester.value)
                    .map((semesterData) => {
                      let subjectIndex = 0;
                      return Object.entries(semesterData.subjects).map(([subjectName, subjectDetails]) => (
                        <tr key={subjectDetails._id}>
                          <td className="border border-black px-4 py-2">{++subjectIndex}</td>
                          <td className="border border-black px-4 py-2">{subjectDetails.subjectcode}</td>
                          <td className="border border-black px-4 py-2">{subjectName}</td>
                          {/* <td className="border border-black px-4 py-2">{semesterData.semesterNumber}</td> */}
                          <td className="border border-black px-4 py-2">{subjectDetails.marks ? subjectDetails.marks : "-"}</td>
                          <td className="border border-black px-4 py-2">{subjectDetails.credit}</td>
                        </tr>
                      ));
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

export default Studentgradesheet;