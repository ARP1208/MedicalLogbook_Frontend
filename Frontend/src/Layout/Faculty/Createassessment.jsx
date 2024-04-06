import React, { useState } from "react";
import Select from "react-select";
import Previewpopup from "./Previewpopup";

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const academicOptions = [
    { value: "select Academic year", label: "select Academic year" },
  ];
  for (let year = currentYear; year >= currentYear - 10; year--) {
    academicOptions.push({
      value: `${year - 1}-${year}`,
      label: `${year - 1}-${year}`,
    });
  }
  return academicOptions;
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

const Createassessment = () => {
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

  const [assessmentName, setAssessmentName] = useState("");
  const [assessmentid, setAssessmentid] = useState("");
  const [assessmentduration, setassessmentduration] = useState("");
  const [assessmentmarks, setassessmentmarks] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddQuestion = () => {
    if (question.trim() !== "") {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        { question, options, answer },
      ]);
      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("");
      // Reset options
    }
  };
  const handleCreateAssessment = async () => {
    const assessmentData = {
      AcademicYear: {
        year: academicYear.value,
        program: [
          {
            programname: selectedProgram.value,
            semesters: [
              {
                semesterNumber: selectedSemester.value,
                sections: [
                  {
                    sectionName: selectedSection.value,
                    assessment: [
                      {
                        assessmentId: assessmentid,
                        assessmentName: assessmentName,
                        assessmentquestion: questions.map((q) => ({
                          question: q.question,
                          optionA: q.options[0],
                          optionB: q.options[1],
                          optionC: q.options[2],
                          optionD: q.options[3],
                          answer: q.answer,
                        })),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  
    try {
      const response = await fetch(
        'http://localhost:8000/faculty/saveAddAssessment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(assessmentData),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error('Error adding assessment');
      }
      console.log('Assessment added successfully', response);
      alert('Assessment added successfully');
      resetFormState();
    } catch (error) {
      console.error('Error adding assessment:', error);
      alert('Failed to add assessment. Please try again.');
    }
  };
  
  const resetFormState = () => {
    setAcademicYear({ value: 'select Academic year', label: 'select Academic year' });
    setSelectedProgram({ value: 'select Program', label: 'select Program' });
    setSelectedSemester({ value: 'select Semester', label: 'select Semester' });
    setSelectedSection({ value: 'select Section', label: 'select Section' });
    setAssessmentName('');
    setAssessmentid('');
    setQuestion('');
    setOptions(['', '', '', '']);
    setQuestions([]);
    setAnswer('');
    setOpen(false);
  };
  
  // Function to handle preview button click
  const handlePreview = () => {
    setOpen(true);
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call your handleCreateAssessment function here
  };
  

  return (
    <section className="fixed">
       <form onSubmit={handleSubmit}>
      <div className="fixed flex left-5 top-32 ml-50 h-auto w-auto">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Create Assessment
        </button>
        <div
          className={`fixed p-4 flex left-5 ml-50 top-45 flex-wrap w-75vw justify-center items-center border-sky-500 border-3 rounded-md bg-gray-200 ${
            open ? "blur-background" : ""
          }`}
        >
          <div className="flex justify-center items-center gap-5 mb-4 sm:grid sm:grid-cols-1 md:grid-cols-4">
            <input
              placeholder="Enter Assessment Name"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
              className="shadow  border  rounded text-gray-700 px-3 py-2 focus:outline-none focus:shadow-outline"
            />
            <input
              placeholder="Enter Assessment Id"
              value={assessmentid}
              onChange={(e) => setAssessmentid(e.target.value)}
              className="shadow  border  rounded text-gray-700 px-3 py-2  focus:outline-none focus:shadow-outline"
            />
            <input
              placeholder="Duration in minutes"
              value={assessmentduration}
              type="number"
              onChange={(e) => setassessmentduration(e.target.value)}
              className="shadow  border  rounded text-gray-700 px-3 py-2  focus:outline-none focus:shadow-outline"
            />
            <input
              placeholder="Maximum Marks"
              value={assessmentmarks}
              type="number"
              onChange={(e) => setassessmentmarks(e.target.value)}
              className="shadow  border  rounded text-gray-700 px-3 py-2  focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-10 text-start w-auto">
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
          <label className="ml-0 mt-2 font-bold w-full flex justify-center items-center flex-col">
            Question :
            <textarea
              className="mt-2 p-2.5 h-auto text-sm w-full text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 shadow-card"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </label>

          <label className="font-bold mt-3">
            Options :
            <div className="ml-2 mt-2 flex gap-3">
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e)}
                  placeholder={`Option ${index + 1}`}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ))}
            </div>
          </label>
          <label className="ml-0 mt-2 font-bold w-full flex justify-center items-center flex-col">
            Answer :
            <input
              className="mt-2 p-2.5 h-auto text-sm max-w-xl text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 shadow-card"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </label>

          <div className="flex justify-center h-fit mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white ml-4 py-2 px-4 w-auto  rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddQuestion}
          >
            Add question
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white ml-4 py-2 px-4 w-auto  rounded focus:outline-none focus:shadow-outline"
            onClick={handleCreateAssessment}>
            Create
          </button>
          <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white ml-4 py-2 px-4 w-auto  rounded focus:outline-none focus:shadow-outline"
              onClick={handlePreview}
            >
              Preview
            </button>
          </div>
          
          <div style={{ zIndex: open ? 9999 : "auto" }}>
          
            <Previewpopup open={open} onClose={() => setOpen(false)}>
              <div className="lg:w-60vw md:w-30vw sm:20vw lg:h-60vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
                <div className="text-2xl font-black text-blue-950 justify-self-center mt-4">
                  Preview Assessment
                </div>
                <div className="flex flex-row gap-7 justify-center items-center">
                <h5 className="font-bold mt-4">
                  Assessment Id: {assessmentid}
                </h5>
                <h5 className="font-bold mt-4">
                  Assessment Name: {assessmentName}
                </h5>
                <h5 className="font-bold mt-4">
                  Duration: {assessmentduration}
                </h5>
                <h5 className="font-bold mt-4">
                  Maximum marks: {assessmentmarks}
                </h5>
                </div>
                <div className="mt-6 text-start ml-10">
                  <div className="grid grid-cols-2 text-center mt-4">
                    <p className="font-bold">
                      Academic Year: {academicYear.label}
                    </p>
                    <p className="font-bold">
                      Program: {selectedProgram.label}
                    </p>
                    <p className="font-bold">
                      Semester: {selectedSemester.label}
                    </p>
                    <p className="font-bold">
                      Section: {selectedSection.label}
                    </p>
                  </div>
                  <br />
                  {questions.map((q, index) => (
                    <div key={index}>
                      <p className="font-bold">{`Q ${index + 1}: ${
                        q.question
                      }`}</p>
                      {q.options.map((opt, i) => (
                        <div key={i} className="flex items-center">
                          <input
                            type="radio"
                            id={`option-${index}-${i}`}
                            name={`question-${index}`}
                            value={opt}
                            disabled
                            checked={q.answer === opt}
                            className="mr-2"
                          />
                          <label htmlFor={`option-${index}-${i}`}>{opt}</label>
                        </div>
                      ))}
                      <p className="font-bold">Answer: {q.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Previewpopup>
          </div>
        </div>
      </div>
      </form>
    </section>
  );
};

export default Createassessment;