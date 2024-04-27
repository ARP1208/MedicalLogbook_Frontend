import React, { useState, useEffect } from "react";
import Select from "react-select";
import AllCharts from "../Charts/AllCharts";

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const Academic = [{ value: "select Academic year", label: "select Academic year" }];
  for (let year = currentYear; year >= currentYear - 10; year--) {
    Academic.push({
      value: `${year - 1}-${year}`,
      label: `${year - 1}-${year}`,
    });
  }
  return Academic;
};

const GenerateProgram = () => {
  const Program = [
    { value: "select Program", label: "Select Program" },
    { value: "MBBS", label: "MBBS" },
    { value: "MS", label: "MS" },
    { value: "MD", label: "MD" },
    { value: "BAMS", label: "BAMS" },
    { value: "BHMS", label: "BHMS" },
    { value: "BPT", label: "BPT" },
    { value: "B.VSc", label: "B.VSc" },
    { value: "BUMS", label: "BUMS" },
    { value: "BSMS", label: "BSMS" },
    { value: "BNYS", label: "BNYS" },
  ];

  return Program;
};

const GenerateSection = () => {
  const Section = [
    { value: "Select Section", label: "Select Section" },
    { value: "A", label: "Section A" },
    { value: "B", label: "Section B" },
    { value: "C", label: "Section C" },
    { value: "D", label: "Section D" },
  ];

  return Section;
};

const GenerateSemester = () => {
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

const GenerateSubject = () => {
  const Subject = [
    { value: "select Subject", label: "Select Subject" },
    { value: "Subject 1", label: "Subject 1" },
    { value: "Subject 2", label: "Subject 2" },
    { value: "Subject 3", label: "Subject 3" },
    { value: "Subject 4", label: "Subject 4" },
    { value: "Subject 5", label: "Subject 4" },
  ];

  return Subject;
};

const FacultyStudentDash = () => {
  // State to manage academic year
  const [academicYear, setAcademicYear] = React.useState({
    value: "Select Academic Year",
    label: "Select Academic Year",
  });
  // State to manage selected semester
  const [selectedSemester, setSelectedSemester] = useState({
    value: "select Semester",
    label: "Select Semester",
  });

  // State to manage selected program
  const [selectedProgram, setSelectedProgram] = useState({
    value: "select Program",
    label: "select Program",
  });

  // State to manage selected subject
  const [selectedSubject, setSelectedSubject] = useState({
    value: "select Subject",
    label: "Select Subject",
  });

  // State to manage selected section
  const [selectedSection, setSelectedSection] = useState({
    value: "select Section",
    label: "select Section",
  });
  const [students, setStudents] = useState([]);
  const [showCharts, setShowCharts] = useState(false);
  const [showTableAndDropdowns, setShowTableAndDropdowns] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const get_students = async () => {
    const url = "http://localhost:8000/student/get-student";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AcademicYear: academicYear.label, // Use label instead of value
          program: selectedProgram.value,
          semester: selectedSemester.value,
          section: selectedSection.value,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
      setStudents(responseData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      academicYear.value !== "Select Academic Year" &&
      selectedProgram.value !== "select Program" &&
      selectedSemester.value !== "select Semester" &&
      selectedSection.value !== "select Section"
    ) {
      get_students();
    }
  }, [academicYear, selectedProgram, selectedSemester, selectedSection]);

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setShowCharts(true);
    setShowTableAndDropdowns(false);
  };

  return (
    <section className="left-50 absolute">
      <div className="absolute flex left-10 top-4">
        <button className="bg-sky-500 rounded-md w-fit text-lg">
          Student Dashboard
        </button>
      </div>
      <div className="px-10 py-3 h-auto w-75vw overflow-hidden rounded-md  flex flex-col justify-center items-center mx-10 mt-18">
        {showTableAndDropdowns && (
          <div className="overflow-hidden block">
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 text-balance">
              <div className="flex flex-row gap-x-5 justify-center items-center">
                Academic Year
                <Select
                  value={academicYear}
                  onChange={setAcademicYear}
                  options={generateYearOptions()}
                  readOnly
                  className="w-15vw"
                  required
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                />
              </div>
              <div className="flex flex-row gap-x-5 justify-center items-center">
                Semester
                <Select
                  value={selectedSemester}
                  onChange={setSelectedSemester}
                  options={GenerateSemester()}
                  className="w-15vw"
                  required
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                />
              </div>
              <div className="flex flex-row gap-x-5 justify-center items-center">
                Program
                <Select
                  value={selectedProgram}
                  onChange={setSelectedProgram}
                  options={GenerateProgram()}
                  className="w-15vw"
                  required
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                />
              </div>
              <div className="flex flex-row gap-x-5 justify-center items-center ml-12">
                Subject
                <Select
                  value={selectedSubject}
                  onChange={setSelectedSubject}
                  options={GenerateSubject()}
                  className="w-15vw"
                  required
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                />
              </div>
              <div className="flex flex-row gap-x-5 justify-center items-center ml-3">
                Section
                <Select
                  value={selectedSection}
                  onChange={setSelectedSection}
                  options={GenerateSection()}
                  className="w-15vw"
                  required
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                />
              </div>
            </div>
          </div>
        )}

        {!showCharts && showTableAndDropdowns && (
          <div className="flex w-70vw h-40vh border-1 mt-3 mb-3 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
            <table className="w-full h-10 text-center rounded-md border-collapse">
              <thead>
                <tr>
                  <th className="border bg-blue-950 text-white px-2 py-2">S.No.</th>
                  <th className="border bg-blue-950 text-white px-3 py-2">Regestration no.</th>
                  <th className="border bg-blue-950 text-white px-5 py-2">Name</th>
                  <th className="border bg-blue-950 text-white px-4 py-2">View</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(students) && students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={index}>
                      <td className="border border-black px-2 py-2">{index + 1}</td>
                      <td className="border border-black px-3 py-2">{student.regno}</td>
                      <td className="border border-black px-5 py-2">{student.name}</td>
                      <td className="border border-black px-4 py-2 flex items-center justify-center">
                        <button onClick={() => handleViewClick(student)} className="w-auto px-2 bg-blue-600 rounded-lg">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {showCharts && <AllCharts 
          name={selectedStudent.name}
          regno={selectedStudent.regno}
          year={academicYear.value}
          program={selectedProgram.value}
          subject={
            selectedSubject.value !== "select Subject"
              ? selectedSubject.value
              : null
          }
      />}
    </section>
  );
};

export default FacultyStudentDash;
