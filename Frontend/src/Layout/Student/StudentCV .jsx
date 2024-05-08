import React, { useState } from "react";
import Select from "react-select";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

const StudentCV = () => {
  const [selectedSemester, setSelectedSemester] = useState({
    value: "select Semester",
    label: "select Semester",
  });

  const downloadTables = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Get all table elements
    const tables = document.querySelectorAll("table");

    // Set the initial vertical position
    let startY = 10;

    // Iterate over each table and add it to the PDF
    tables.forEach((table) => {
      // Add the table to the PDF
      pdf.autoTable({ html: table, startY });

      // Adjust the vertical position for the next table
      startY = pdf.autoTableEndPosY() + 10;
    });

    // Save the PDF
    pdf.save("student_cv_tables.pdf");
  };

  return (
    <>
      <div className="mt-8 flex gap-4 justify-center items-center">
        <Select
          value={selectedSemester}
          onChange={setSelectedSemester}
          options={GenerateSemester()}
          className="w-15vw"
          required
          menuPosition={"fixed"}
        />
        <button
          className="bg-sky-500 rounded-md w-fit text-lg"
          onClick={downloadTables}
        >
          Download as PDF
        </button>
      </div>
      <div className=" overflow-scroll mt-8 ml-30 relative">
        <div className="h-60vh w-fit fixed overflow-auto">
          <h3
            className="absolute ml-50"
            style={{ textDecoration: "underline" }}
          >
            Task
          </h3>
          <table className="border border-black ml-50 mt-12">
            <thead>
              <tr>
                <th className="border border-black  px-4 py-2">
                  Assigned task
                </th>
                <th className="border border-black px-4 py-2">Accepted task</th>
                <th className="border border-black px-4 py-2">
                  Completed task
                </th>
                <th className="border border-black px-4 py-2">Approved task</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2">1</td>
              </tr>
            </tbody>
          </table>

          <h3
            className="mt-6 ml-50 absolute"
            style={{ textDecoration: "underline" }}
          >
            Assessment
          </h3>
          <table className="border-collapse mt-20 border border-black mx-auto">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Semester</th>
                <th className="border border-black px-4 py-2">
                  Assessment Name
                </th>
                <th className="border border-black px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2">Quiz1</td>
                <td className="border border-black px-4 py-2">8/10</td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2">Quiz2</td>
                <td className="border border-black px-4 py-2">6/10</td>
              </tr>
            </tbody>
          </table>

          <h3
            className="mt-6 ml-50 absolute"
            style={{ textDecoration: "underline" }}
          >
            Attendance
          </h3>
          <table className="border-collapse relative left-20 mt-20 border border-black mx-auto">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Semester</th>
                <th className="border border-black px-4 py-2">Subject</th>
                <th className="border border-black px-4 py-2">Total days</th>
                <th className="border border-black px-4 py-2">Present</th>
                <th className="border border-black px-4 py-2">Absent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2">Subject1</td>
                <td className="border border-black px-4 py-2">10</td>
                <td className="border border-black px-4 py-2">8</td>
                <td className="border border-black px-4 py-2">2</td>
              </tr>
            </tbody>
          </table>

          <h3
            className="mt-6 ml-50 absolute"
            style={{ textDecoration: "underline" }}
          >
            Academics
          </h3>
          <table className="border-collapse mt-20 left-20 relative border border-black mx-auto">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Exam type</th>
                <th className="border border-black px-4 py-2">Semester</th>
                <th className="border border-black px-4 py-2">Subject</th>
                <th className="border border-black px-4 py-2">
                  Marks obtained
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-4 py-2">Internal1</td>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2">Subject1</td>
                <td className="border border-black px-4 py-2">48</td>
              </tr>

              <tr>
                <td className="border border-black px-4 py-2">MISAC-1</td>
                <td className="border border-black px-4 py-2">1</td>
                <td className="border border-black px-4 py-2">Subject1</td>
                <td className="border border-black px-4 py-2">50</td>
              </tr>

              {/* Additional row for total marks */}
              <tr>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2">Total</td>
                <td className="border border-black px-4 py-2">98</td>
              </tr>

              <tr>
                <td colSpan="5" className="border border-black px-4 py-2"></td>
              </tr>

              <tr>
                <td className="border border-black px-4 py-2">Final Marks</td>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2">99</td>
              </tr>

              <tr>
                <td className="border border-black px-4 py-2">GPA</td>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2">6.68</td>
              </tr>

              <tr>
                <td className="border border-black px-4 py-2">CGPA</td>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2">6.37</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentCV;