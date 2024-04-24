import React,{useState} from "react";
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

const Dashboardfilter = () => {
  const [selectedSemester, setSelectedSemester] = useState({
    value: "select Semester",
    label: "select Semester",
  });

  return (
    <div className="ml-56 mt-10 w-56 p-2">
      <Select
        value={selectedSemester}
        onChange={setSelectedSemester}
        options={GenerateSemester()}
        required
      />
    </div>
  );
};

export default Dashboardfilter;
