import React, { useState } from "react";
import Select from "react-select";
import Attendancecsvpopup from "./Attendancecsvpopup";
import Attendancepreviewpopup from "./Attendancepreviewpopup";
import csvtojson from "csvtojson"; 

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
    { value: "sub1", label: "Subject 1" },
    { value: "sub2", label: "Subject 2" },
    { value: "sub3", label: "Subject 3" },
    { value: "sub4", label: "Subject 4" },
  ];

  return Subject;
};

const EnterStudentAttendance = () => {
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

  // State to manage student attendance
  const [attendance, setAttendance] = useState([]);

  // State for CSV popup visibility
  const [openCsvPopup, setOpenCsvPopup] = useState(false);

  // State for Preview popup visibility
  const [openPreviewPopup, setOpenPreviewPopup] = useState(false);

  // State to store CSV data
  const [csvData, setCsvData] = useState([]);

  const students = [
    { registrationNo: "220970001", name: "ABCD", subject: "PHYSICS" },
    { registrationNo: "220970002", name: "XYZ", subject: "PHYSICS" },
    // Add more student objects here as needed
  ];

  // Function to handle checkbox change
  const handleCheckboxChange = (index, isChecked) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index] = isChecked;
    setAttendance(updatedAttendance);
  };

  // Function to handle master checkbox change
  const handleMasterCheckboxChange = (isChecked) => {
    const updatedAttendance = students.map(() => isChecked);
    setAttendance(updatedAttendance);
  };

  // Function to handle file change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const text = event.target.result;
      const parsedJsonArray = await csvtojson().fromString(text);
      console.log("Value are: ", parsedJsonArray); 
      //setJsonArray(parsedJsonArray);
      setOpenCsvPopup(true);
      setCsvData(parsedJsonArray);
      
    };
    reader.readAsText(file);
  };
  
  const handlesaveclose = () => {
    setOpenCsvPopup(false);
  };


  return (
    <section className="left-50 absolute">
      <div className="absolute flex left-10 top-4">
        <button className="bg-sky-500 rounded-md w-fit text-lg">
          Attendance
        </button>
      </div>

      <div className="border-1 px-10 py-3 h-auto w-auto overflow-hidden rounded-md border-black flex flex-col justify-center items-center mx-10 mt-18">
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
                menuPosition={'fixed'}
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
                menuPosition={'fixed'}
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
                menuPosition={'fixed'}
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
                menuPosition={'fixed'}
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
                menuPosition={'fixed'}
              />
            </div>
            <div className="flex flex-row gap-x-5 justify-center items-center ml-8">
              Date
              <input
                type="date"
                className="border-2 px-4 w-15vw h-10 rounded-md mt-1"
                required
              />
            </div>
          </div>
        </div>
        <form>
          <div className="flex w-75vw h-40vh border-1 mt-4 mb-4 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
            <table className="w-full h-10 text-center rounded-md border-collapse">
              <thead>
                <tr>
                  <th className="border bg-blue-950 text-white px-2 py-2">
                    Sl.No
                  </th>
                  <th className="border bg-blue-950 text-white px-3 py-2">
                    Regestration no.
                  </th>
                  <th className="border bg-blue-950 text-white px-5 py-2">
                    Name
                  </th>
                  <th className="border bg-blue-950 text-white px-4 py-2">
                    Subject
                  </th>
                  <th className="border bg-blue-950 text-white px-4 py-2 flex items-center justify-center">
                    <span>Attendance</span>
                    <input
                      type="checkbox"
                      className="w-5 h-5 ml-3"
                      onChange={(e) =>
                        handleMasterCheckboxChange(e.target.checked)
                      }
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="border border-black px-2 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-black px-3 py-2">
                      {student.registrationNo}
                    </td>
                    <td className="border border-black px-5 py-2">
                      {student.name}
                    </td>
                    <td className="border border-black px-4 py-2">
                      {student.subject}
                    </td>
                    <td className="border border-black px-4 py-2 flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 ml-3"
                        onChange={(e) =>
                          handleCheckboxChange(index, e.target.checked)
                        }
                        checked={attendance[index] || false}
                      />
                      <span className={`ml-2 ${attendance[index] ? 'text-green-500' : 'text-red-500'}`}>{attendance[index] ? "PRESENT" : "ABSENT"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
        <div className="relative flex justify-center items-center gap-2">
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
            className="bg-blue-500 rounded-md w-20 h-auto text-white text-lg">
            Save
          </button>
        </div>
        {/* CSV popup */}
        <div style={{zIndex:9999}}>
      {openCsvPopup && (
        <Attendancecsvpopup  open={openCsvPopup}
        onClose={() => setOpenCsvPopup(false)}>
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
                onClick={() => {
                  handlesaveclose(); // Close the CSV popup
                  setOpenPreviewPopup(false); // Open the preview popup
                }}
              >
                Save
              </button>
            </div>
            </div>
          </Attendancecsvpopup>
      )}
</div>
      {/* Preview popup */}
      <div style={{zIndex:9999}}>
      {openPreviewPopup && (
        <Attendancepreviewpopup
          open={openPreviewPopup}
          onClose={() => setOpenPreviewPopup(false)}
          csvData={csvData} // Pass your CSV data here
        />
      )}
      </div>
      </div>

      
    </section>
  );
};

export default EnterStudentAttendance;
