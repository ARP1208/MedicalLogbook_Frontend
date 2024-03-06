import React, { useState } from "react";
import Select from "react-select";
import EditGradeSheetMarks from "./EditGradeSheetMarks";
import Showgradesheetpopup from "./Showgradesheetpopup";

const subjects = [
    { value: 'subject1', label: 'Subject 1' },
    { value: 'subject2', label: 'Subject 2' },
    { value: 'subject3', label: 'Subject 3' },
    { value: 'subject4', label: 'Subject 4' },
    { value: 'subject5', label: 'Subject 5' },
  ];
  

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const Academic = [
    { value: "select Academic year", label: "select Academic year" },
  ];
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

const subjectOptions = [
  { value: "Edit", label: "Edit" },
  { value: "Show", label: "Show" },
];

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

const generateRegNumbers = (count) => {
  const regNumbers = [];
  for (let i = 1; i <= count; i++) {
    regNumbers.push(String(i).padStart(6, "0"));
  }
  return regNumbers;
};

const GradesheetDashboard = () => {
  const regNumbers = generateRegNumbers(20);
  const [academicYear, setAcademicYear] = React.useState({
    value: "Select Academic Year",
    label: "Select Academic Year",
  });
  const [selectedProgram, setSelectedProgram] = React.useState({
    value: "Select Program",
    label: "Select Program",
  });
  const [selectedSemester, setSelectedSemester] = React.useState({
    value: "Select Semester",
    label: "Select Semester",
  });
  const [selectedSection, setSelectedSection] = React.useState({
    value: "Select Section",
    label: "Select Section",
  });
  const [selectedSubjects, setSelectedSubjects] = React.useState(
    subjectOptions.map((subject) => ({ ...subject, marks: "" }))
  );
  const [showmarks, setshowmarks] = useState(false);
  const [showform, setshowform] = useState(false);
  const [open, setOpen] = useState(false);
  const regNum = generateRegNumbers(1);
  const [Subjectsmarks, setSubjectsmarks] = React.useState(subjects.map(subject => ({ ...subject, marks: '' })));

  const handleSubjectChange = (index, newValue) => {
    const updatedSubjects = [...selectedSubjects];
    updatedSubjects[index] = newValue;
    setSelectedSubjects(updatedSubjects);
  };

  const handleoptions = (component) => {
    if (component === "Edit") {
      setshowmarks(true);
      setshowform(false);
    } 
  };

  return (
    <section className="absolute overflow-hidden top-20 left-40 m-10">
      {showmarks ? (
        <EditGradeSheetMarks />
      ) : (
        <>
          <div className="flex relative left-7 top-7 w-auto mb-10">
            <button
              className="bg-sky-500 rounded-md w-auto text-lg"
              onClick={() => handleoptions("Edit")}
            >
              Dashboard
            </button>
          </div>

          <div className="border-2 h-auto px-10 pb-10 h-60vh w-auto overflow-hidden rounded-md border-sky-500 flex flex-col justify-center items-center m-10">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-10 text-start w-auto mt-4">
              <Select
                value={academicYear}
                onChange={setAcademicYear}
                options={generateYearOptions()}
                readOnly
              />
              <Select
                value={selectedProgram}
                onChange={setSelectedProgram}
                options={GenerateProgram()}
              />
              <Select
                value={selectedSemester}
                onChange={setSelectedSemester}
                options={GenerateSemester()}
              />
              <Select
                value={selectedSection}
                onChange={setSelectedSection}
                options={GenerateSection()}
              />
            </div>
            <div className="overflow-hidden block">
              <form action="#">
                <div className="flex w-60vw h-40vh border-1 mt-2 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
                  <table className="w-full h-10 text-center rounded-md border-collapse">
                    <thead>
                      <tr>
                        <th className="border bg-blue-950 text-white px-4 py-2">
                          SL No
                        </th>
                        <th className="border bg-blue-950 text-white px-4 py-2">
                          Reg Number
                        </th>
                        <th className="border bg-blue-950 text-white px-4 py-2">
                          Student Name
                        </th>
                        {selectedSubjects.map((subject, index) => (
                          <th
                            key={index}
                            className="border bg-blue-950 text-white px-4 py-2"
                          >
                            {subject.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {regNumbers.map((regNumber, index) => (
                        <tr key={index}>
                          <td className="border border-black px-4 py-2">
                            {index + 1}
                          </td>
                          <td className="border border-black px-4 py-2">
                            {regNumber}
                          </td>
                          <td className="border border-black px-4 py-2 col-span-2">
                            Student Name {index + 1}
                          </td>
                          <td className="border  border-black px-4 py-2">
                            <button
                              className="w-20 h-10 bg-blue-500 text-stone-50 text-lg rounded-md py-1"
                              onClick={() => handleoptions("Edit")}
                            >
                              Edit
                            </button>
                          </td>
                          <td className="border border-black px-4 py-2">
                            <button
                              className="w-20 h-10 bg-blue-500 text-stone-50 text-lg rounded-md py-1"
                              onClick={() => setOpen(true)}
                            >
                              Show
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <div style={{ zIndex: open ? 9999 : "auto" }}>
              <Showgradesheetpopup open={open} onClose={() => setOpen(false)}>
                <div className="lg:w-70vw md:w-30vw sm:20vw lg:h-70vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
                  <div className="text-2xl font-black text-blue-950 justify-self-center mt-4">
                    Show Gradesheet
                  </div>
                  <div className="border-2 h-auto w-62vw overflow-hidden rounded-md border-none flex flex-col justify-center items-center m-10">
                    <div className="flex gap-7 relative top-0 w-auto mt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 text-start w-auto mt-4">
                        <label
                          htmlFor="name"
                          className="lg:text-lg md:text-base sm:text-sm font-medium"
                        >
                          Name:{" "}
                          <input
                            type="text"
                            id="name"
                            className="px-4 border-2 w-full h-10 rounded-md"
                            required
                            value={""}
                            readOnly
                          />
                        </label>

                        <label
                          htmlFor="regno"
                          className="lg:text-lg md:text-base sm:text-sm font-medium"
                        >
                          Registration Number:{" "}
                          <input
                            type="text"
                            id="regno"
                            className="border-2 px-4 w-full h-10 rounded-md"
                            required
                            value={""}
                            readOnly
                          />
                        </label>

                        <label
                          htmlFor="academicyear"
                          className="lg:text-lg md:text-base sm:text-sm font-medium"
                        >
                          Academic Year:{" "}
                          <input
                            type="text"
                            id="academicyear"
                            className="border-2 px-4 w-full h-10 rounded-md"
                            readOnly // Make the input read-only to prevent manual changes
                            value={""}
                          />
                        </label>

                        <label
                          htmlFor="course"
                          className="lg:text-lg md:text-base sm:text-sm font-medium"
                        >
                          Course:{" "}
                          <input
                            type="text"
                            id="course"
                            className="border-2 px-4 w-full h-10 rounded-md"
                            required
                            value={""}
                            readOnly
                          />
                        </label>

                        <label
                          htmlFor="section"
                          className="lg:text-lg md:text-base sm:text-sm font-medium"
                        >
                          Section:{" "}
                          <input
                            type="text"
                            id="section"
                            className="border-2 px-4  w-full h-10 rounded-md"
                            required
                            value={""}
                            readOnly
                          />
                        </label>
                      </div>
                    </div>

                    <div className="overflow-hidden block">
                      <form action="#">
                        <div className="flex w-60vw h-auto border-1 mt-5 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
                          <table className="w-full h-10 text-center rounded-md border-collapse">
                            <thead>
                              <tr>
                                <th className="border bg-blue-950 text-white px-4 py-2">
                                  SL No
                                </th>
                                <th className="border bg-blue-950 text-white px-4 py-2">
                                  Reg Number
                                </th>
                                <th className="border bg-blue-950 text-white px-4 py-2">
                                  Student Name
                                </th>
                                {Subjectsmarks.map((subject, index) => (
                                  <th
                                    key={index}
                                    className="border bg-blue-950 text-white px-4 py-2"
                                  >
                                    {subject.label}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {regNum.map((regNum, index) => (
                                <tr key={index}>
                                  <td className="border border-black px-4 py-2">
                                    {index + 1}
                                  </td>
                                  <td className="border border-black px-4 py-2">
                                    {regNum}
                                  </td>
                                  <td className="border border-black px-4 py-2">
                                    Student Name {index + 1}
                                  </td>
                                  {Subjectsmarks.map((_, subjectIndex) => (
                                    <td
                                      key={subjectIndex}
                                      className="border border-black "
                                    >
                                      <input
                                        type="number"
                                        max="100"
                                        placeholder="marks"
                                        className="h-full w-full placeholder:text-center text-center"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Showgradesheetpopup>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default GradesheetDashboard;
