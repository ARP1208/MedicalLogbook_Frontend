import React, { useState } from "react";
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
            <label>Name : Abc</label>
            <label>Registration no : 220970000</label>
            <Select
              value={selectedSemester}
              onChange={setSelectedSemester}
              options={GenerateSemester()}
              required
            />
          </div>
          <div className="overflow-hidden block text-4">
            <div className="flex w-70vw h-50vh border-1 mb-3 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
              <table className="w-70vw h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950 text-white px-1 py-2">
                      Subject Code
                    </th>
                    <th className="border col-span-4 bg-blue-950 text-white px-4 py-2">
                      Subject Name
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Marks Obtained
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Max Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="flex w-70vw h-20vh border border-black">
                        <table className="w-70vw text-center rounded-md border-collapse">
                          <thead>
                            <tr>
                              <th className="border bg-blue-400 text-white px-1 py-2">
                                Internals
                              </th>
                              <th className="border bg-blue-400 text-white px-1 py-2">
                                Maximum marks
                              </th>
                              <th className="border bg-blue-400 text-white px-1 py-2">
                                Marks obtained
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="w-20 border border-black px-1 py-1">
                                MISAC-1
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                15
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                12
                              </td>
                            </tr>
                            <tr>
                              <td className="w-20 border border-black px-1 py-1">
                                MISAC-2
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                15
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                10
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="flex w-70vw h-20vh border border-black mt-3">
                        <table className="w-70vw text-center rounded-md border-collapse">
                          <thead>
                            <tr>
                              <th className="border bg-blue-400 text-white px-1 py-2">
                                Assessments
                              </th>
                              <th className="border bg-blue-400 text-white px-1 py-2">
                                Maximum marks
                              </th>
                              <th className="border bg-blue-400 text-white px-1 py-2">
                                Marks obtained
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="w-20 border border-black px-1 py-1">
                                Assessment-1
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                10
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                5
                              </td>
                            </tr>
                            <tr>
                              <td className="w-20 border border-black px-1 py-1">
                                Assessment-2
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                5
                              </td>
                              <td className="w-20 border border-black px-1 py-1">
                                3
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Internalmarksstudent;
