import React, { useEffect, useState } from "react";
import Select from "react-select";

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

const Internalmarksstudent = () => {
  const [selectedSemester, setSelectedSemester] = useState({
    value: "select Semester",
    label: "select Semester",
  });
  const [marks, setMarks] = useState([]);
  const [visibleMarks, setVisibleMarks] = useState([]);

  const name = "Tejas";
  const regno = 220970062;

  const get_marks = async () => {
    const url = "http://localhost:8000/student/fetchStudentTestMarks";

    if (!name || !regno) {
      console.log("Name or regno is not initialized.");
      return;
    }

    const data = {
      "name": "Tejas",
      "regno": 220970062
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setMarks(responseData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    get_marks();
  }, []);

  useEffect(() => {
    if (selectedSemester.value !== "select Semester") {
      const filteredMarks = marks.filter(mark => mark.semester == parseInt(selectedSemester.value));
      setVisibleMarks(filteredMarks);
      console.log(filteredMarks[0] ? filteredMarks[0].assessments[0] : null);
    }
  }, [selectedSemester]);

  return (
    <section className="left-50 absolute">
      <div className="absolute flex left-10 top-4 w-auto ">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          {" "}
          Internal Marks
        </button>
      </div>

      <div className="border-1 h-70vh rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10 -pb-5">
        <div className="p-10 ">
          <div className="grid grid-cols-3 gap-3 mb-3 text-lg">
            <label>Name : {name}</label>
            <label>Registration no : {regno}</label>
            <Select
              value={selectedSemester}
              onChange={setSelectedSemester}
              options={GenerateSemester()}
              required
              readonly
            />
          </div>
          <div className="overflow-hidden block text-4">
            <div className="flex w-70vw h-50vh border-2 mb-3 rounded-tl-3xl rounded-tr-3xl overflow-auto border-blue-500 rounded-xl">
              {visibleMarks.length > 0 ? (
                <div>
                  <table className="w-70vw h-10 text-center rounded-md border-collapse mb-3">
                    <thead>
                      <tr>
                        <th className="border bg-blue-950 text-white px-4 py-2">
                          Internals
                        </th>
                        <th className="border bg-blue-950 text-white px-4 py-2">
                          Maximum marks
                        </th>
                        <th className="border bg-blue-950 text-white px-4 py-2">
                          Marks obtained
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleMarks[0].combinedData.map((row, index) => (
                        <>
                          <tr key={`subject-${index}`}>
                            <td className="border bg-blue-400 text-white px-1 py-2" colSpan={3}>
                              {row.subjectName}
                            </td>
                          </tr>
                          <tr key={`marks-${index}`}>
                            <td className="w-20 border border-black px-1 py-1">{row.Test.testname}</td>
                            <td className="w-20 border border-black px-1 py-1">150</td>
                            <td className="w-20 border border-black px-1 py-1">{row.Test.marks}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                  <br />
                  {visibleMarks[0].assessments ? (
                    <table className="w-70vw h-10 text-center rounded-md border-collapse mb-3">
                      <thead>
                        <tr>
                          <th className="border bg-blue-950 text-white px-4 py-2">
                            Assessment ID
                          </th>
                          <th className="border bg-blue-950 text-white px-4 py-2">
                            Assessment Name
                          </th>
                          <th className="border bg-blue-950 text-white px-4 py-2">
                            Maximum marks
                          </th>
                          <th className="border bg-blue-950 text-white px-4 py-2">
                            Marks obtained
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleMarks[0].assessments.map((assessment, index) => {
                          return (
                            <tr key={index}>
                              <td className="w-20 border border-black px-1 py-1">
                                {assessment.assessmentId}
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                {assessment.assessmentName}
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                {assessment.totalMarks}
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                {assessment.markObtain}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : null}

                </div>
              ) : <div className="flex justify-center items-center text-center w-full"><span className="text-center text-m text-black" >Nothing to show</span></div>
              }
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Internalmarksstudent;