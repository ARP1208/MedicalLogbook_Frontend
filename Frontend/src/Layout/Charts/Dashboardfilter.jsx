import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Academicschart from './Academicschart';

const GenerateSemester = () => {
  return [
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

const Dashboardfilter = ({ onSemesterChange }) => {
  const [selectedSemester, setSelectedSemester] = useState(null);

  // Pass the selected semester value to the parent component
  const handleSemesterChange = (selectedOption) => {
    setSelectedSemester(selectedOption);
    onSemesterChange(selectedOption.value);
  };

  useEffect(() => {
    if (!selectedSemester) {
      setSelectedSemester({ value: '1', label: '1 Semester' });
      onSemesterChange('1');
    }
  }, []);

  return (
    <div className="ml-56 mt-10 w-56 p-2">
      <Select
        value={selectedSemester}
        onChange={handleSemesterChange}
        options={GenerateSemester()}
        required
      />
    </div>
  );
};

export default Dashboardfilter;
