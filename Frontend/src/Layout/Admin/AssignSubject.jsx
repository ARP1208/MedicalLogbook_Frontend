import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import csvtojson from "csvtojson";
import Assignsubjectcsvpopup from "./Assignsubjectcsvpopup";
import Assignsubjectpreview from "./Assignsubjectpreview";

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

const AssignSubject = () => {
  const [academicYear, setAcademicYear] = React.useState({
    value: "select Academic year",
    label: "select Academic year",
  });
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
  const [subjectCount, setSubjectCount] = useState(1); // State to track the number of subjects
  const [csvData, setCsvData] = useState([]); // State to store CSV data
  const [openCsvPopup, setOpenCsvPopup] = useState(false); // State to manage CSV popup visibility
  const [openPreviewPopup, setOpenPreviewPopup] = useState(false); // State to manage Preview popup visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(csvData);
  };

  const handleAddSubject = () => {
    setSubjectCount((prevCount) => prevCount + 1); // Increment subject count
  };

  const handleRemoveSubject = () => {
    if (subjectCount > 1) {
      setSubjectCount((prevCount) => prevCount - 1); // Decrement subject count only if greater than 1
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const text = event.target.result;
      const jsonArray = await csvtojson().fromString(text);
      console.log(jsonArray); // Print JSON data to console
      setCsvData(jsonArray);
      setOpenCsvPopup(true); // Show CSV popup
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ position: "relative", zIndex: openCsvPopup || openPreviewPopup ? 9999 : "auto"}}>
    <section className="fixed">
      <div className="fixed flex left-5 top-32 ml-50 w-auto">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Assign Subject
        </button>
      </div>
      <div className="fixed p-4 flex left-5 ml-50 top-45 flex-wrap w-fit border-sky-500 border-3 rounded-md bg-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="flex-col md:flex-row gap-3 justify-center items-center grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 pb-4">
            <Select
              value={academicYear}
              onChange={setAcademicYear}
              options={generateYearOptions()}
              readOnly
              className="appearance-none border rounded w-full py-1 px-4 text-gray-700"
            />

            <Select
              value={selectedProgram}
              onChange={setSelectedProgram}
              options={GenerateProgram()}
              className="appearance-none border rounded w-full py-1 px-4 text-gray-700"
            />

            <Select
              value={selectedSemester}
              onChange={setSelectedSemester}
              options={GenerateSemester()}
              className="appearance-none border rounded w-full py-1 px-4 text-gray-700"
            />

            <Select
              value={selectedSection}
              onChange={setSelectedSection}
              options={GenerateSection()}
              className="appearance-none border rounded w-full py-1 px-4 text-gray-700"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="mb-4 flex-grow">
              {/* Form inputs for roll number and name */}
              <label
                htmlFor="rollno"
                className="block text-start text-gray-700 font-bold mb-2"
              >
                Roll No
                <input
                  type="text"
                  id="rollno"
                  required
                  placeholder="Enter student`s Roll No"
                  className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4 flex-grow justify-center items-center">
              {/* Form inputs for roll number and name */}
              <label
                htmlFor="name"
                className="block text-start text-gray-700 font-bold mb-2"
              >
                Name
                <input
                  id="name"
                  required
                  placeholder="separate by comma if multiple students "
                  className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          </div>

          <div className=" flex justify-center gap-10 pb-3">
            <button
              type="button"
              onClick={handleAddSubject}
              className="bg-blue-500 text-base rounded-md w-auto"
            >
              Add Subject
            </button>
            <button
              type="button"
              onClick={handleRemoveSubject}
              className="bg-blue-500 text-base  rounded-md w-auto"
            >
              Remove Subject
            </button>
          </div>
          {/* Dynamic subject and faculty input fields */}
          <div className="overflow-auto max-h-40 mb-3">
            <div className=" w-auto">
              {[...Array(subjectCount)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-center gap-10  overflow-auto"
                >
                  <label
                    htmlFor={`subject${index + 1}`}
                    className="block text-start text-gray-700 font-bold"
                  >
                    Subject {index + 1}
                    <input
                      type="text"
                      id={`subject${index + 1}`}
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </label>
                  <label
                    htmlFor={`faculty${index + 1}`}
                    className="block text-start text-gray-700 font-bold"
                  >
                    Faculty {index + 1}
                    <input
                      type="text"
                      id={`faculty${index + 1}`}
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </label>
                  <label
                    htmlFor={`faculty${index + 1}`}
                    className="block text-start text-gray-700 font-bold"
                  >
                    Subject code {index + 1}
                    <input
                      type="text"
                      id={`subjectcode${index + 1}`}
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline cursor-pointer"
              onClick={() => document.getElementById("csv-upload").click()}
            >
              Upload CSV
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
            {/* {csvData.length > 0 && (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline"
                onClick={() => setOpenPreviewPopup(true)}
              >
                Preview
              </button>
            )} */}
            
          </div>
          
        </form>
        
      </div>
      {openCsvPopup && (
        <Assignsubjectcsvpopup
          open={openCsvPopup}
          onClose={() => setOpenCsvPopup(false)}
        >
          <div className="lg:w-50vw md:w-30vw sm:20vw lg:h-45vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
            <div className="text-2xl font-black text-blue-950 justify-self-center m-20">
              Your csv has been Uploaded !!!
            </div>
            <h5>To view the more details, Please Click on preview</h5>
            <div className="flex gap-3 justify-center items-center py-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline"
              onClick={() => setOpenPreviewPopup(true)}
            >
              Preview
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
            </div>
          </div>
        </Assignsubjectcsvpopup>
      )}

      {openPreviewPopup && (
        <Assignsubjectpreview
          open={openPreviewPopup}
          onClose={() => setOpenPreviewPopup(false)}
          csvData={csvData} // Pass the csvData prop here
        >
          {/* Content for the preview popup */}
          
        </Assignsubjectpreview>
      )}
    </section>
    </div>
  );
};

export default AssignSubject;
