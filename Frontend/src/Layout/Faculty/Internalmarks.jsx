import React, { useState } from 'react';
import Select from 'react-select';
import GenrateInternalmarks from './GenrateInternalmarks';

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const Academic = [{ value: 'select Academic year', label: 'select Academic year' }];
  for (let year = currentYear; year >= currentYear - 10; year--) {
    Academic.push({ value: `${year - 1}-${year}`, label: `${year - 1}-${year}` });
  }
  return Academic;
};

const GenerateProgram = () => {
  return [
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
};

const GenerateSemester = () => {
  return [
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
};

const GenerateSection = () => {
  return [
    { value: 'select Section', label: 'select Section' },
    { value: 'A', label: 'Section A' },
    { value: 'B', label: 'Section B' },
    { value: 'C', label: 'Section C' },
    { value: 'D', label: 'Section D' },
  ];
};

const GenerateSubjectcode = () => {
  return [
    { value: 'select Section', label: 'select Section' },
    { value: 'sub1', label: 'SUB01' },
    { value: 'sub2', label: 'SUB02' },
    { value: 'sub3', label: 'SUB03' },
    { value: 'sub4', label: 'SUB04' },
    { value: 'sub5', label: 'SUB05' },
  ];
};

const Internalmarks = () => {
  const [academicYear, setAcademicYear] = useState({ value: 'select Academic year', label: 'select Academic year' });
  const [selectedProgram, setSelectedProgram] = useState({ value: 'select Program', label: 'select Program' });
  const [selectedSemester, setSelectedSemester] = useState({ value: 'select Semester', label: 'select Semester' });
  const [selectedSection, setSelectedSection] = useState({ value: 'select Section', label: 'select Section' });
  const [selectedSubjectCode, setSelectedSubjectCode] = useState({ value: 'select Subjectcode', label: 'select Subjectcode' });
  const [showGenerateInternal, setShowGenerateInternal] = useState(false);

  const handleGenerate = () => {
    setShowGenerateInternal(true);
  };

  return (
    <>
     {showGenerateInternal ? (
        <GenrateInternalmarks />
      ) : (
       
    <section className='absolute overflow-hidden top-18 left-38 m-10'>
     
          <div className='flex relative left-7 top-7 w-auto mb-10'>
            <button className='bg-sky-500 rounded-md w-auto text-lg'>Internal Marks</button>
          </div>
          <div className='border-2 p-5 lg:h-60vh md:h-60vh sm:h-70vh w-40vw overflow-hidden rounded-md border-sky-500 flex flex-col justify-center items-center ml-7'>
            <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 text-start w-auto mb-20'>
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
              <Select
                value={selectedSubjectCode}
                onChange={setSelectedSubjectCode}
                options={GenerateSubjectcode()}
              />
              {/* Input for Examination */}
              <input type='text' className='flex border border-gray h-10 lg:w-60 sm:w-50 md:w-40 rounded-md' placeholder='&nbsp;&nbsp;Examination  example:MISAC-1'></input>
            </div>

            <div className="relative flex justify-center items-center">
              <button className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg" onClick={handleGenerate}>
                Generate
              </button>
            </div>
          </div>
          </section>
       
      )}
  </>
  );
};

export default Internalmarks;
