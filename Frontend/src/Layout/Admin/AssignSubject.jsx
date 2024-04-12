import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import csvtojson from "csvtojson";
import Assignsubjectcsvpopup from "./Assignsubjectcsvpopup";
import Assignsubjectpreview from "./Assignsubjectpreview";
import axios from "axios";


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
  const [jsonArrays, setJsonArray] = useState(null); // State to store the JSON array
  const [subjectCount, setSubjectCount] = useState(1); // State to track the number of subjects
  const [csvData, setCsvData] = useState([]); // State to store CSV data
  const [openCsvPopup, setOpenCsvPopup] = useState(false); // State to manage CSV popup visibility
  const [openPreviewPopup, setOpenPreviewPopup] = useState(false); // State to manage Preview popup visibility

  const [formData, setFormData] = useState({ // Define formData state
    academicYear: " ",
    program: " ",
    semester: " ",
    section: " ",
    rollNo: " ",
    name: " ",
    subjects: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new array to store subjects data
      const subjectsData = [];
      // Loop through the subjectCount and populate subjectsData array
      for (let i = 0; i < subjectCount; i++) {
        const subject = document.getElementById(`subject${i + 1}`).value;
        const faculty = document.getElementById(`faculty${i + 1}`).value;
        const subjectCode = document.getElementById(`subjectcode${i + 1}`).value;
        const credit = document.getElementById(`credit${i + 1}`).value;
        subjectsData.push({ subjectName: subject, facultyName: faculty, subjectCode: subjectCode, credit: credit });
      }

      console.log(subjectsData);

      // Update formData with subjectsData
      setFormData(prevData => ({
        ...prevData,
        subjects: subjectsData
      }));

      // Update formData with subjectsData
      const formDataWithSubjects = {
        AcademicYear: {
          year: formData.academicYear.value,
          program: [
            {
              programname: formData.selectedProgram.value,
              semesters: [
                {
                  semesterNumber: formData.selectedSemester.value,
                  sections: [
                    {
                      sectionName: formData.selectedSection.value,
                      students: [
                        {
                          regno: formData.rollNo,
                          name: formData.name,
                          subjects: subjectsData.map(subject => ({
                            subjectName: subject.subjectName,
                            facultyname: subject.facultyName,
                            subjectcode: subject.subjectCode,
                            credit: subject.credit
                          }))
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      };

      console.log("Submitting data: ", formDataWithSubjects);

      // Make API call to save formDataWithSubjects to MongoDB
      const response = await axios.post(
        "http://localhost:8000/admin/assignsubject",
        formDataWithSubjects,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormData(
        {

          rollNo: " ",
          name: " ",
          subjects: []
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
      } else {
        // Handle errors from the backend
        const responseData = response.data;
        setErrors(responseData.errors || {});
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }

    console.log("Assign data submitted:", formData);
  };


  const handleSaveCSV = async (jsonArrays) => {
    try {
      if (!jsonArrays || jsonArrays.length === 0) {
        throw new Error("JSON array is empty or undefined");
      }

      const updatedFormData = {
        AcademicYear: {
          year: jsonArrays[0]['Academic year'],
          program: [
            {
              programname: jsonArrays[0]['Program'],
              semesters: [
                {
                  semesterNumber: jsonArrays[0]['Semester'],
                  sections: [
                    {
                      sectionName: jsonArrays[0]['Section'],
                      students: jsonArrays.map(item => ({
                        regno: item['Roll number'],
                        name: item['Name'],
                        subjects: parseSubjectDetails(item)
                      }))
                    }
                  ]
                }
              ]
            }
          ]
        }
      };




      const response = await axios.post(
        "http://localhost:8000/admin/saveCSVAssignSubject",
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Multiple subjects stored successfully");
        console.log(response.data);

      } else {
        const responseData = response.data;
        console.error("Error storing multiple subjects:", responseData.errors || {});
      }
      console.log("Saved data is: ", updatedFormData);
    } catch (error) {
      console.error('Error storing multiple subjects:', error);
      // Handle error
    }
  };

  const parseSubjectDetails = (item) => {
    const subjectDetails = [];

    for (let i = 1; i <= 6; i++) { // Assuming there are 6 subject details columns
      const subjectDetail = item[`Subject Details ${i}`];

      if (subjectDetail) {
        console.log("Subject Detail:", subjectDetail);

        // Split the subject detail by " - " to extract subject name, faculty name, and subject code
        const detailParts = subjectDetail.split(' - ');

        if (detailParts.length == 4) {
          const subjectName = detailParts[0].trim();
          const facultyName = detailParts[1].trim();
          const subjectCode = detailParts[2].trim();
          const credits = detailParts[3].trim();

          console.log("Parsed Subject Name:", subjectName);
          console.log("Parsed Faculty Name:", facultyName);
          console.log("Parsed Subject Code:", subjectCode);
          console.log("Parsed Credits:", credits);

          subjectDetails.push({
            subjectName: subjectName,
            facultyname: facultyName, // Adjusted to match schema field name
            subjectcode: subjectCode,   // Adjusted to match schema field name
            credit: credits
          });
        } else {
          console.error("Invalid subject detail format:", subjectDetail);
        }
      }
    }

    return subjectDetails;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleselectedChange = (selectedOption, field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: selectedOption
    }));
  };


  const handleSubjectChange = (e, index, fieldName) => {
    const { value } = e.target;
    const newSubjects = [...formData.subjects];
    if (!newSubjects[index]) {
      newSubjects[index] = {};
    }
    newSubjects[index][fieldName] = value;
    setFormData(prevData => ({
      ...prevData,
      subjects: newSubjects
    }));
  };

  const handleAddSubject = () => {
    setSubjectCount(prevCount => prevCount + 1);
    setFormData(prevData => ({
      ...prevData,
      subjects: [
        ...prevData.subjects,
        {
          subjectName: "",
          facultyName: "",
          subjectCode: "",
          credit: ""
        }
      ]
    }));
  };

  const handleRemoveSubject = () => {
    if (subjectCount > 1) {
      setSubjectCount(prevCount => prevCount - 1);
      setFormData(prevData => ({
        ...prevData,
        subjects: prevData.subjects.slice(0, -1)
      }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const text = event.target.result;
      const parsedJsonArray = await csvtojson().fromString(text);
      console.log("Value are: ", parsedJsonArray); // Print JSON data to console
      setJsonArray(parsedJsonArray); // Store JSON array in state
      setCsvData(parsedJsonArray)
      setOpenCsvPopup(true); // Show CSV popup
    };

    reader.readAsText(file);
  };

  const handleSaveButtonClick = () => {
    // Ensure jsonArray is populated and then call storeMultipleSubjects
    if (jsonArrays && jsonArrays.length > 0) {
      handleSaveCSV(jsonArrays);
    } else {
      console.error("JSON array is empty or undefined");
    }
  };



  return (
    <div style={{ position: "relative", zIndex: openCsvPopup || openPreviewPopup ? 9999 : "auto" }}>
      <section className="fixed">
        <div className="fixed flex left-5 top-32 ml-50 w-auto">
          <button className="bg-sky-500 rounded-md w-auto text-lg">
            Assign Subject
          </button>
        </div>
        <div className="fixed p-4 flex left-5 ml-50 top-45 flex-wrap w-80vw border-sky-500 border-3 rounded-md bg-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="flex-col md:flex-row gap-3 justify-center items-center grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 pb-4">
              <Select
                value={formData.academicYear}
                name="academicYear"
                placeholder="select Academic year"
                onChange={(selectedOption) => handleselectedChange(selectedOption, "academicYear")}
                options={generateYearOptions()}
                readOnly
                className="appearance-none border rounded w-full py-1 px-4 text-gray-700"
              />

              <Select
                value={formData.selectedProgram}
                name="selectedProgram"
                placeholder="select Program"
                onChange={(selectedOption) => handleselectedChange(selectedOption, "selectedProgram")}

                options={GenerateProgram()}
                className="appearance-none border rounded w-full py-1 px-4 text-gray-700"
              />

              <Select
                value={formData.selectedSemester}
                name="selectedSemester"
                placeholder="select semester"
                onChange={(selectedOption) => handleselectedChange(selectedOption, "selectedSemester")}
                options={GenerateSemester()}
                className="appearance-none border rounded w-full py-1 px-4 text-gray-700"
              />

              <Select
                value={formData.selectedSection}
                name="selectedSection"
                placeholder="select Section"
                onChange={(selectedOption) => handleselectedChange(selectedOption, "selectedSection")}
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
                    value={formData.rollNo}
                    onChange={handleChange}
                    name="rollNo"

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
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
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
                        value={formData.subjects[index]?.subjectName || ''}
                        onChange={(e) => handleSubjectChange(e, index, 'subjectName')}
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
                        value={formData.subjects[index]?.facultyName || ''}
                        onChange={(e) => handleSubjectChange(e, index, 'facultyName')}
                      />
                    </label>
                    <label
                      htmlFor={`subjectcode${index + 1}`}
                      className="block text-start text-gray-700 font-bold"
                    >
                      Subject code {index + 1}
                      <input
                        type="text"
                        id={`subjectcode${index + 1}`}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.subjects[index]?.subjectCode || ''}
                        onChange={(e) => handleSubjectChange(e, index, 'subjectCode')}
                      />
                    </label>
                    <label
                      htmlFor={`credit${index + 1}`}
                      className="block text-start text-gray-700 font-bold"
                    >
                      Credit {index + 1}
                      <input
                        type="number"
                        id={`credit${index + 1}`}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.subjects[index]?.credit || ''}
                        onChange={(e) => handleSubjectChange(e, index, 'credit')}
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
                  onClick={handleSaveButtonClick}
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