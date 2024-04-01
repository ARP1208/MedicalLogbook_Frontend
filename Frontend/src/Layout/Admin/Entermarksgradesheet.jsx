import React from 'react';
import Select from 'react-select';
import { useEffect } from 'react';

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const Academic = [{ value: 'select Academic year', label: 'select Academic year' }];
  for (let year = currentYear; year >= currentYear - 10; year--) {
    Academic.push({ value: `${year - 1}-${year}`, label: `${year - 1}-${year}` });
  }
  return Academic;
};

const GenerateProgram = () => {
  const Program = [
    { value: 'select Program', label: 'select Program' },
    { value: 'MBBS', label: 'MBBS' },
    { value: 'MS', label: 'MS' },
    { value: 'MD', label: 'MD' },
    { value: 'BAMS', label: 'BAMS' },
    { value: 'BHMS', label: 'BHMS' },
    { value: 'BPT', label: 'BPT' },
    { value: 'B.VSc', label: 'B.VSc' },
    { value: 'BUMS', label: 'BUMS' },
    { value: 'BSMS', label: 'BSMS' },
    { value: 'BNYS', label: 'BNYS' },
  ];

  return Program;
};

const GenerateSemester = () => {
  const Semester = [
    { value: 'select Semester', label: 'select Semester' },
    { value: '1', label: '1 Semester' },
    { value: '2', label: '2 Semester' },
    { value: '3', label: '3 Semester' },
    { value: '4', label: '4 Semester' },
    { value: '5', label: '5 Semester' },
    { value: '6', label: '6 Semester' },
    { value: '7', label: '7 Semester' },
    { value: '8', label: '8 Semester' },
    { value: '9', label: '9 Semester' },
  ];

  return Semester;
};

const subjectOptions = [
  { value: 'subject1', label: 'Subject 1' },
  { value: 'subject2', label: 'Subject 2' },
  { value: 'subject3', label: 'Subject 3' },
  { value: 'subject4', label: 'Subject 4' },
  { value: 'subject5', label: 'Subject 5' },
];

const GenerateSection = () => {
  const Section = [
    { value: 'select Section', label: 'select Section' },
    { value: 'A', label: 'Section A' },
    { value: 'B', label: 'Section B' },
    { value: 'C', label: 'Section C' },
    { value: 'D', label: 'Section D' },
  ];

  return Section;
};

const generateRegNumbers = (count) => {
  const regNumbers = [];
  for (let i = 1; i <= count; i++) {
    regNumbers.push(String(i).padStart(6, '0'));
  }
  return regNumbers;
};

const Entermarksgradesheet = () => {
  const regNumbers = generateRegNumbers(20);
  const [academicYear, setAcademicYear] = React.useState({ value: 'select Academic year', label: 'select Academic year' });
  const [selectedProgram, setSelectedProgram] = React.useState({ value: 'select Program', label: 'select Program' });
  const [selectedSemester, setSelectedSemester] = React.useState({ value: 'select Semester', label: 'select Semester' });
  const [selectedSection, setSelectedSection] = React.useState({ value: 'select Section', label: 'select Section' });
  const [selectedSubjects, setSelectedSubjects] = React.useState(subjectOptions.map(subject => ({ ...subject, marks: '' })));
  const [selectedStudents, setSelectedStudents] = React.useState([]);

  const handleSubjectChange = (index, newValue) => {
    const updatedSubjects = [...selectedSubjects];
    updatedSubjects[index] = newValue;
    setSelectedSubjects(updatedSubjects);
  };

  const get_students = async (year, program, sem, sec) => {
    try {
      const url = "http://127.0.0.1:8000/admin/filter_students";
      const data = {
        AcademicYear: year,
        programName: program,
        semesterNumber: sem,
        sectionName: sec
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setSelectedStudents(responseData.students);
      console.log(responseData.students);
      return responseData.students;
    } catch (e) {
      console.log("Error filtering students: ", e);
      throw error;
    }
  }

  useEffect(() => {
    // Check if all variables are set
    if (academicYear.value != 'select Academic year' && selectedProgram.value != 'select Program' && selectedSemester.value != 'select Semester' && selectedSection.value != 'select Section') {
      get_students(academicYear.value, selectedProgram.value, selectedSemester.value, selectedSection.value);
    }
  }, [academicYear, selectedProgram, selectedSemester, selectedSection]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting...");

    // Collect the marks entered by the user
    const marksData = [];
    selectedStudents.forEach((student, studentIndex) => {
      const marksEntry = {
        regNo: student.regNo,
        marks: []
      };
      selectedSubjects.forEach((_, subjectIndex) => {
        const inputId = `marks-${studentIndex}-${subjectIndex}`;
        const inputValue = document.getElementById(inputId).value;
        marksEntry.marks.push(inputValue);
      });
      marksData.push(marksEntry);
    });

    // Log the collected marks data
    console.log('Collected Marks Data:', marksData);
  };




  return (
    <section className='absolute overflow-hidden top-18 left-38 m-10'>
      <div className='flex relative left-10 top-7 w-auto mb-10'>
        <button className='bg-sky-500 rounded-md w-auto text-lg'>Add Marks</button>
      </div>
      <div className='border-2 px-10 h-auto w-70vw overflow-hidden rounded-md border-sky-500 flex flex-col justify-center items-center m-10'>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-10 text-start w-auto mt-4'>
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
        <div className='overflow-hidden block'>
          <form action="#" onSubmit={handleSubmit}>
            <div className="flex w-65vw h-40vh border-1 mt-4 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950 text-white px-4 py-2">SL No</th>
                    <th className="border bg-blue-950 text-white px-4 py-2">Reg Number</th>
                    <th className="border bg-blue-950 text-white px-4 py-2">Student Name</th>
                    {selectedSubjects.map((subject, index) => (
                      <th key={index} className="border bg-blue-950 text-white px-4 py-2">{subject.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedStudents.map((student, index) => (
                    <tr key={index}>
                      <td className="border border-black px-4 py-2">{index + 1}</td>
                      <td className="border border-black px-4 py-2">{student.regNo}</td>
                      <td className="border border-black px-4 py-2">{student.name}</td>
                      {[...Array(selectedSubjects.length)].map((_, emptyIndex) => (
                        <td key={`empty-${emptyIndex}`} className="border border-black px-4 py-2">
                          <input type="number" max="100" min="0" id={`marks-${index}-${emptyIndex}`} placeholder='marks' className='h-full w-full placeholder:text-center text-center' />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center m-3">
              <button className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Entermarksgradesheet;