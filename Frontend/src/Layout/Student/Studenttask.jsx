import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Opentaskstudent from "./Opentaskstudent";

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const academicOptions = [
    { value: "select Academic year", label: "select Academic year" },
  ];
  for (let year = currentYear; year >= currentYear - 10; year--) {
    academicOptions.push({
      value: `${year - 1}-${year}`,
      label: `${year - 1}-${year}`,
    });
  }
  return academicOptions;
};

const Studenttask = () => {
  const [buttonText, setButtonText] = useState("Accept");
  const [buttonColor, setButtonColor] = useState("bg-blue-500");
  const [startDate, setStartDate] = React.useState(new Date());
  const [showtask, setshowtask] = useState(false);
  const handleopentask = (component) => {
    if (component === "Open") {
      setshowtask(true);
    } else if (component === "Accept") {
      setButtonText("Accepted");
      setButtonColor("bg-blue-950");
    }
  };
  const [academicYear, setAcademicYear] = useState({
    value: "select Academic year",
    label: "select Academic year",
  });

  return (
    <section className="left-50 absolute">
      {showtask && <Opentaskstudent />}
      {!showtask && <Opentaskstudent /> && (
        <>
          <div className="absolute flex left-10 top-4 w-auto">
            <button className="bg-sky-500 rounded-md w-20 text-lg">
              {" "}
              Tasks
            </button>
          </div>

          <div className="border-1 h-70vh rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10 -pb-5">
            <div className="p-10 ">
              <div className="overflow-hidden block text-4">
                <div className="justify-center items-center grid grid-cols-2 mb-3 gap-5">
                  <Select
                    value={academicYear}
                    onChange={setAcademicYear}
                    options={generateYearOptions()}
                  />

                  <DatePicker
                    id="startDate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  />
                </div>
                <div className="flex w-60vw h-50vh border-2 rounded-tl-3xl rounded-tr-3xl overflow-auto border-sky-500 rounded-xl">
                  <table className="w-full h-10 text-center rounded-md border-collapse">
                    <thead>
                      <tr>
                        <th className="border bg-blue-950 text-white px-1 py-2">
                          Task Id
                        </th>
                        <th className="col-span-4 bg-blue-950 border-b border-r-0 text-white px-4 py-2">
                          Task Name
                        </th>
                        <th className="bg-blue-950 border-b  border-r-0 px-4 py-2"></th>
                        <th className="bg-blue-950 border-b border-r-0 px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="w-20 border border-black px-1 py-1">
                          1
                        </td>
                        <td className="border-b border-black border-r-0 px-4 py-1 text-center">
                          Taskname 1
                          <span style={{ color: "red" }} className="ml-10">
                            Deadline: 12/03/2024 5:00pm
                          </span>
                        </td>
                        <td className="w-20 border-b border-black border-r-0  px-4 py-1 text-center">
                          <button
                            className="w-auto h-10 rounded-xl bg-blue-500 text-lg py-1 px-3"
                            onClick={() => handleopentask("Open")}
                          >
                            Open
                          </button>
                        </td>
                        <td className="w-20 border-b border-black border-r-0 px-4 py-1 text-center">
                          <button
                            className={`w-auto h-10 rounded-xl bg-blue-500 text-lg py-1 px-3 ${buttonColor}`}
                            onClick={() => handleopentask("Accept")}
                          >
                            {buttonText}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Studenttask;
