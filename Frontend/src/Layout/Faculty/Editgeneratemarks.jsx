import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Editgeneratemarks = ({subjectname,subcode,examination}) => {
  const subjectOptions = [
    { value: "examination", label: "examination" },
    // Add more options if needed
  ];

const generateRegNumbers = (count) => {
  const regNumbers = [];
  for (let i = 1; i <= count; i++) {
    regNumbers.push(String(i).padStart(6, '0'));
  }
  return regNumbers;
};

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

  const regNumbers = generateRegNumbers(5);
  const [selectedSubjects, setSelectedSubjects] = useState(
    initializeSelectedSubjects(5, subjectOptions.length));

  const handleSubjectChange = (subjectIndex, studentIndex, newValue) => {
    setSelectedSubjects(prevSubjects => {
      const updatedSubjects = [...prevSubjects];
      updatedSubjects[studentIndex] = {
        ...updatedSubjects[studentIndex],
        marks: {
          ...updatedSubjects[studentIndex].marks,
          [subjectIndex]: newValue
        }
      };
      return updatedSubjects;
    });
  };

  const downloadCSV = () => {
    const csvRows = [];
    const headers = ['Reg Number', 'Student Name', ...subjectOptions.map(subject => subject.label)];
    csvRows.push(headers.join(','));

    regNumbers.forEach((regNumber, studentIndex) => {
      const rowData = [
        regNumber,
        `Student Name ${studentIndex + 1}`,
        ...subjectOptions.map((_, subjectIndex) => selectedSubjects[studentIndex].marks[subjectIndex] || '') // Add marks for each subject
      ];
      csvRows.push(rowData.join(','));
    });

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'internal_marks.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const history = useNavigate();

  const goToPreviousPage = () => {
    history('/Academicshomepage');
  };

  

  return (
    <section className='absolute overflow-hidden top-18 left-38 m-10'>
      <div className='flex relative left-7 top-7 w-auto mb-10'>
        <button className='bg-sky-500 rounded-md w-auto text-lg'>Edit Marks sheet</button>
      </div>
      <div className='border-2 px-10 py-5 h-auto h-60vh w-auto overflow-hidden rounded-md border-sky-500 flex flex-col justify-center items-center m-10'>
        <div className='overflow-hidden block'>
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
                      <th key={index} className="border bg-blue-950 text-white px-4 py-2">{examination}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {regNumbers.map((regNumber, studentIndex) => (
                    <tr key={studentIndex}>
                      <td className="border border-black px-4 py-2">{studentIndex + 1}</td>
                      <td className="border border-black px-4 py-2">{regNumber}</td>
                      <td className="border border-black px-4 py-2">Student Name {studentIndex + 1}</td>
                      {subjectOptions.map((_, subjectIndex) => (
                        <td key={subjectIndex} className="border border-black ">
                          <input
                            type="number"
                            max="100"
                            placeholder='marks'
                            className='h-full w-full placeholder:text-center text-center'
                            value={selectedSubjects[studentIndex]?.marks[subjectIndex] || ''}
                            onChange={(e) => handleSubjectChange(subjectIndex, studentIndex, e.target.value)}


                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-5 items-center mt-2">
            <button
                className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg" onClick={goToPreviousPage}>
                Save Changes
              </button>
              <button
                className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg"
                onClick={downloadCSV}
              >
                Download CSV
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Editgeneratemarks ;