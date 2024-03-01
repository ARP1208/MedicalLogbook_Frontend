import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GenrateInternalMarks = ({ subjectname, subcode, examination }) => {
  const subjectOptions = [
    { value: "examination", label: "examination" },
    // Add more options if needed
  ];

  const initializeSelectedSubjects = (count, subjectCount) => {
    const subjects = [];
    for (let i = 0; i < count; i++) {
      const marks = {};
      for (let j = 0; j < subjectCount; j++) {
        marks[j] = ''; // Initialize marks for each subject
      }
      subjects.push({ marks });
    }
    return subjects;
  };

  const [selectedSubjects, setSelectedSubjects] = useState(
    initializeSelectedSubjects(6, subjectOptions.length)
  );

  const handleSubjectChange = (subjectIndex, studentIndex, newValue) => {
    setSelectedSubjects((prevSubjects) => {
      const updatedSubjects = [...prevSubjects];
      updatedSubjects[studentIndex] = {
        ...updatedSubjects[studentIndex],
        marks: {
          ...updatedSubjects[studentIndex].marks,
          [subjectIndex]: newValue,
        },
      };
      return updatedSubjects;
    });
  };

  const history = useNavigate();
  const goToPreviousPage = () => {
    history('/Academicshomepage');
  };

  const uploadCSV = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      parseCSVData(result);
    };
    reader.readAsText(file);
  };

  const parseCSVData = (csvData) => {
    const rows = csvData.split('\n').map(row => row.split(','));

    let index = -1;
    for (let i = 0; i < rows[0].length; i++) {
        if ( rows[0][i].match(examination) ) {
          break;
        } else {
        
            index++;
            console.log(index, "", rows[0][i])
        }
    }

    if (index === -1) {
        console.log("Column not found for", examination);
        return;
    } else {
        const newSelectedSubjects = [];
        for (let i = 1; i < rows.length; i++) {
          console.log("rows[i][index]",rows[i][index])
            if (rows[i][index] !== undefined && rows[i][index] !== null) {
              if(index === rows[0].length)
              {
                const marks = rows[i][index];
                newSelectedSubjects.push({ marks });

              }
              
              else
              {
                const marks = rows[i][index+1];
                newSelectedSubjects.push({ marks });
              }
            }
        }
        console.log(newSelectedSubjects);
        setSelectedSubjects(newSelectedSubjects);
    }
};


  return (
    <section className="absolute overflow-hidden top-18 left-38 m-10">
      <div className="flex relative left-7 top-7 w-auto mb-10">
        <button className="bg-sky-500 rounded-md w-auto text-lg">Marks sheet</button>
      </div>
      <div className="border-2 px-10 py-4 h-auto h-60vh w-auto overflow-hidden rounded-md border-sky-500 flex flex-col justify-center items-center m-10">
        <div className="overflow-hidden block">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-10 text-balance">
            <h4>Subject: {subjectname}</h4>
            <h4>Subject code: {subcode}</h4>
          </div>
          <form action="#">
            <div className="flex w-60vw h-40vh border-1 mt-2 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950 text-white px-4 py-2">SL. No.</th>
                    <th className="border bg-blue-950 text-white px-4 py-2">Reg Number</th>
                    <th className="border bg-blue-950 text-white px-4 py-2">Student Name</th>
                    {subjectOptions.map((_, index) => (
                      <th key={index} className="border bg-blue-950 text-white px-4 py-2">
                        {examination}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedSubjects.map((subject, studentIndex) => (
                    <tr key={studentIndex}>
                      <td className="border border-black px-4 py-2">{studentIndex + 1}</td>
                      <td className="border border-black px-4 py-2">Reg Number {studentIndex + 1}</td>
                      <td className="border border-black px-4 py-2">Student Name {studentIndex + 1}</td>
                      <td className="border border-black">
                        <input
                          type="text"
                          max="100"
                          placeholder="marks"
                          className="h-full w-full placeholder:text-center text-center"
                          value={subject.marks}
                          onChange={(e) =>
                            handleSubjectChange(0, studentIndex, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-5 items-center mt-2">
              <button className="bg-blue-500 rounded-md w-20 h-auto text-white text-lg" onClick={goToPreviousPage}>
                Save
              </button>
              <button className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg cursor-pointer relative overflow-hidden">
                Upload CSV
                <input
                  type="file"
                  accept=".csv"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  onChange={uploadCSV}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GenrateInternalMarks;