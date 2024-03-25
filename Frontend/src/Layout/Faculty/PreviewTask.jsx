import React,{useState} from "react";
import Select from "react-select";
import Evaluatetaskpopup from "./Evaluatetaskpopup";

const GenerateProgram = () => {
  const Program = [
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

  return Program;
};

const GenerateSemester = () => {
  const Semester = [
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

  return Semester;
};

const subjectOptions = [
  { value: "Feedback", label: "Feedback", placeholder: "Marks",type:"number",max:100,min:0,maxlength:3},
  { value: "Completed", label: "Completed", placeholder: "Yes / No",type:"text" },
];

const GenerateSection = () => {
  const Section = [
    { value: "select Section", label: "select Section" },
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

const PreviewTask = () => {
  const regNumbers = generateRegNumbers(20);
  const [selectedProgram, setSelectedProgram] = React.useState({
    value: "select Program",
    label: "select Program",
  });
  const [selectedSemester, setSelectedSemester] = React.useState({
    value: "select Semester",
    label: "select Semester",
  });
  const [selectedSection, setSelectedSection] = React.useState({
    value: "select Section",
    label: "select Section",
  });
  const [selectedSubjects, setSelectedSubjects] = React.useState(
    subjectOptions.map((subject) => ({ ...subject, marks: "" }))
  );

  const handleSubjectChange = (index, newValue) => {
    const updatedSubjects = [...selectedSubjects];
    updatedSubjects[index] = newValue;
    setSelectedSubjects(updatedSubjects);
  };


  const [open, setOpen] = useState(false);


  return (
    <section className="absolute overflow-hidden top-0 left-30">
      <div className="flex relative left-10 top-3 w-auto mb-3">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Evaluate Task
        </button>
      </div>
      <div className="border-2 mx-10 px-10 top-3 h-auto w-auto overflow-hidden rounded-md border-sky-500 flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-10 mt-4 text-balance">
          <h5>Task name :(name)</h5>
          <h5>Task Id :(12121)</h5>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-10 text-start w-auto mt-4">
          <span
            htmlFor=""
            className="border-2 border-black rounded-md flex justify-center h-10"
          >
            <i
              class="fa-solid fa-user items-center p-2 "
              style={{ color: "#74C0FC" }}
            />
            <span className="px-2">
              <p className="text-center text-sm">
                (40)<p className="text-sm -mt-1">Total Students</p>
              </p>
            </span>
          </span>

          <span
            htmlFor=""
            className="border-2 border-black rounded-md flex justify-center h-10"
          >
            <i
              class="fa-solid fa-check items-center p-2"
              style={{ color: "#74C0FC" }}
            >
              {" "}
            </i>
            <span className="px-2">
              <p className="text-center text-sm">
                (40)<p className="text-sm -mt-1">Task Completed</p>
              </p>
            </span>
          </span>

          <span
            htmlFor=""
            className="border-2 border-black rounded-md flex justify-center h-10"
          >
            <i
              class="fa-solid fa-comment items-center p-2"
              style={{ color: "#74C0FC" }}
            ></i>
            <span className="px-2">
              <p className="text-center text-sm">
                (40)<p className="text-sm -mt-1">Task Incompleted</p>
              </p>
            </span>
          </span>

          <span
            htmlFor=""
            className="border-2 border-black rounded-md flex justify-center h-10"
          >
            <i
              class="fa-solid fa-x items-center p-2"
              style={{ color: "#74C0FC" }}
            ></i>
            <span className="px-2">
              <p className="text-center text-sm">
                (40)/5<p className="text-sm -mt-1">Overall Feedback</p>
              </p>
            </span>
          </span>
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
                      <td className="border border-black px-4 py-2">
                        Student Name {index + 1}
                      </td>
                      {selectedSubjects.map((main, subjectIndex) => (
                        <td key={subjectIndex} className="border border-black ">
                          <input
                            type={main.type}
                            max={main.max}
                            min={main.min}
                            maxLength={main.maxlength}
                            placeholder={main.placeholder}
                            className="h-full w-full placeholder:text-center text-center"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          
            <div className="flex justify-center items-center mt-4 gap-5 mb-2">
            <button className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg"  onClick={() => setOpen(true)}>
                View Description
              </button>
            
            <button className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg">
                View Attachment
              </button>
              <button className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg">
                Submit
              </button>
            </div>
          </form>

          <div style={{ zIndex: open ? 9999 : "auto" }}>
          <Evaluatetaskpopup open={open} onClose={() => setOpen(false)}>
              <div className="lg:w-60vw md:w-30vw sm:20vw lg:h-60vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
                <div className="text-2xl font-black text-blue-950 justify-self-center mt-4">
                  Task Description
                </div>
                <div className="mt-5 text-start pl-10">
                 <p>Description about task</p>
                </div>
                
              </div>
            </Evaluatetaskpopup>
            </div>

        </div>
      </div>
    </section>
  );
};

export default PreviewTask;
