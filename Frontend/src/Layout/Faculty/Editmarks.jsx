import React, { useState } from "react";
import Select from "react-select";
import Editgeneratemarks from "./Editgeneratemarks";


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
  return [
    { value: "select Program", label: "select Program" },
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
};

const GenerateSemester = () => {
  return [
    { value: "select Semester", label: "select Semester" },
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
};

const GenerateSection = () => {
  return [
    { value: "select Section", label: "select Section" },
    { value: "A", label: "Section A" },
    { value: "B", label: "Section B" },
    { value: "C", label: "Section C" },
    { value: "D", label: "Section D" },
  ];
};


const Editmarks = () => {
  const [subjectname, setSubjectname] = useState("");
  const [subcode, setsubjectcode] = useState("");
  const [examination, setExamination] = useState("");
  const [errors, setErrors] = useState({});
  const [maxMarks, setMaxMarks] = useState(null);

  const [academicYear, setAcademicYear] = useState({
    value: "select Academic year",
    label: "select Academic year",
  });
  const [selectedProgram, setSelectedProgram] = useState({
    value: "select Program",
    label: "select Program",
  });
  const [selectedSemester, setSelectedSemester] = useState({
    value: "select Semester",
    label: "select Semester",
  });
  const [selectedSection, setSelectedSection] = useState({
    value: "select Section",
    label: "select Section",
  });
 
  const [showedit, setshowedit] = useState(false);

  // const handleGenerate = () => {
  //   setShowGenerateInternal(true);
  // };

  const handleEdit = () => {
    const newErrors = {};

    if (
      academicYear.value === "select Academic year" ||
      selectedProgram.value === "select Program" ||
      selectedSemester.value === "select Semester" ||
      selectedSection.value === "select Section" ||
      subjectname.trim() === "" ||
      examination.trim() === "" ||
      subcode.trim() === ""
    ) {
      if (academicYear.value === "select Academic year") {
        newErrors.academicYear = "required";
      }
      if (selectedProgram.value === "select Program") {
        newErrors.selectedProgram = "required";
      }
      if (selectedSemester.value === "select Semester") {
        newErrors.selectedSemester = "required";
      }
      if (selectedSection.value === "select Section") {
        newErrors.selectedSection = "required";
      }
      if (subjectname.trim() === "") {
        newErrors.subjectname = "required";
      }else if(!/^[a-zA-Z\s]{1,30}$/.test(subjectname.value)){
        newErrors.subcode="Invalid Subject name";
      }
      if (examination.trim() === "") {
        newErrors.examination = "required";
      }else if(!/^[a-zA-Z0-9]{1,15}$/.test(examination.value)){
        newErrors.subcode="Invalid Examination";
      }
      if (subcode.trim() === "") {
        newErrors.subcode = "required";
      }else if(!/^[A-Z\d]{1,10}$/.test(subcode.value)){
        newErrors.subcode="Invalid subject code";
      }
  
      setErrors(newErrors);
    } else {
      setshowedit(true);
    }
  };


  return (
    <>
      {showedit ? (
        <Editgeneratemarks
        subjectname={subjectname}
        subcode={subcode}
        examination={examination}
        max_marks={maxMarks} />
      ) : (
        <section className="absolute top-18 left-38 m-10">
        <div className="flex relative left-7 top-7 w-auto mb-10">
          <button className="bg-sky-500 rounded-md w-auto text-lg">
            Edit Marks
          </button>
        </div>
        <div className=" overflow-auto border-2 p-5 lg:h-60vh md:h-60vh sm:h-70vh w-60vw rounded-md border-sky-500 flex flex-col justify-center items-center ml-7">
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 text-start w-50vw mt-12">
            <div>
              <div className="flex">
                {errors.academicYear && (
                  <div className="text-red-500 text-start">{errors.academicYear}</div>
                )}
              </div>
              <Select
                value={academicYear}
                onChange={setAcademicYear}
                options={generateYearOptions()}
                readOnly
                required
              />
            </div>
            <div>
              <div className="flex">
                {errors.selectedProgram && (
                  <div className="text-red-500 text-start">{errors.selectedProgram}</div>
                )}
              </div>
              <Select
                value={selectedProgram}
                onChange={setSelectedProgram}
                options={GenerateProgram()}
                required
              />
            </div>
            <div>
              <div className="flex">
                {errors.selectedSemester && (
                  <div className="text-red-500 text-start">{errors.selectedSemester}</div>
                )}
              </div>
              <Select
                value={selectedSemester}
                onChange={setSelectedSemester}
                options={GenerateSemester()}
                required
              />
            </div>
            <div>
              <div className="flex">
                {errors.selectedSection && (
                  <div className="text-red-500 text-start">
                    {errors.selectedSection}
                  </div>
                )}
              </div>
              <Select
                value={selectedSection}
                onChange={setSelectedSection}
                options={GenerateSection()}
                required
              />
            </div>

            <div>
            <div className="flex">
              {errors.subcode && (
                <div className="text-red-500 text-start">{errors.subcode}</div>
              )}
              </div>
              <div className=" overflow-y-visible">
                <input
                  type="text"
                  maxLength={15}
                  className="flex border border-gray h-10 lg:w-80 sm:w-50 md:w-40 rounded-md"
                  placeholder="&nbsp;Subject code&nbsp;&nbsp;&nbsp;&nbsp;eg. SUB701"
                  value={subcode}
                  onChange={(e) => setsubjectcode(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Input for Subject name */}
            <div>
            <div className="flex">
              {errors.subjectname && (
                <div className="text-red-500 text-start">{errors.subjectname}</div>
              )}
              </div>
              <input
                type="text"
                maxLength={30}
                className="flex border border-gray h-10 lg:w-80 sm:w-50 md:w-40 rounded-md border-blue-500"
                placeholder="&nbsp;Subject name&nbsp;&nbsp;&nbsp;&nbsp;eg. MATHEMATICS"
                value={subjectname}
                onChange={(e) => setSubjectname(e.target.value)}
                required
              />
            </div>
            <div>
            <div className="flex">
              {errors.examination && (
                <div className="text-red-500 text-start">{errors.examination}</div>
              )}
              </div>
              <input
                type="text"
                maxLength={10}
                className="flex border border-gray h-10 lg:w-80 sm:w-50 md:w-40 rounded-md"
                placeholder="&nbsp;Examination&nbsp;&nbsp;&nbsp;&nbsp;eg. MISAC-1"
                value={examination}
                onChange={(e) => setExamination(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                  type="text"
                  maxLength={10}
                  className="flex border border-gray h-10 lg:w-80 sm:w-50 md:w-40 rounded-md"
                  placeholder="Max Marks"
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(e.target.value)}
                  required
                />
              </div>
          </div>

          <div className="relative flex justify-center items-center pb-5">
            <button
              className="bg-blue-500 rounded-md w-20 h-auto text-white text-lg mt-4"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      </section>
      )}
    </>
  );
};

export default Editmarks;
