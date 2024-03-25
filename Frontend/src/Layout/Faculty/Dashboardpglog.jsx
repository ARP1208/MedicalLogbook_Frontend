import React, { useState } from "react";
import Select from "react-select";
import Viewtaskfacultypopup from "./Viewtaskfacultypopup";

const Generateapproval = () => {
  return [
    { value: "Approved", label: "Approved" },
    { value: "Not Approved", label: "Not Approved" },
  ];
};

const Dashboardpglog = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [tableData, setTableData] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState("Not Approved");
  const [open, setOpen] = useState(false);

  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const newStatus = selectedOption.value;
    setApprovalStatus(newStatus);
    const newData = fetchData(newStatus);
    setTableData(newData);
  };

  const fetchData = (status) => {
    // Dummy data for demonstration
    const data = [
      { taskId: 1, taskName: "Taskname 1", status: "Approved" },
      { taskId: 2, taskName: "Taskname 2", status: "Approved" },
      { taskId: 3, taskName: "Taskname 3", status: "Not Approved" },
      { taskId: 4, taskName: "Taskname 4", status: "Not Approved" },
    ];

    return data.filter((row) => row.status === status);
  };

  const handleApprovalStatusChange = (taskId) => {
    const updatedData = tableData.map((row) => {
      if (row.taskId === taskId) {
        return {
          ...row,
          status: "Approved", // Change status to "Approved"
        };
      }
      return row;
    });
    setTableData(updatedData);
  };

  return (
    <section className="left-50 absolute">
      <div className="absolute flex left-5 top-4 w-auto ">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          {" "}
          Dashboard
        </button>
      </div>

      <div className="border-1 h-70vh rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10 -pb-5">
        <div className="p-10 ">
          <div className="mb-4 w-full flex items-center gap-2">
            <input
              type="text"
              placeholder="Search Task name, Task number, Student name"
              className="placeholder:text-sky-500 px-2 py-1 border-2 w-2/3 text-4 text-black rounded-md border-sky-950"
            />
            <button className="px-2 py-1 bg-sky-500 text-white w-fit rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-lg">
              Search
            </button>
            <div className="w-1/3 pl-2">
              <Select
                value={selectedOption}
                onChange={handleDropdownChange}
                options={Generateapproval()}
                placeholder="Sort"
              />
            </div>
          </div>
          <div className="overflow-hidden block text-4">
            <div className="flex w-60vw h-50vh border-3 rounded-tl-3xl rounded-tr-3xl overflow-auto border-sky-500 rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950 text-white px-1 py-2">
                      Task Id
                    </th>
                    <th className="border col-span-4 bg-blue-950 text-white px-4 py-2">
                      Task Name
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Student name
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Faculty name
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Approval status
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.taskId}>
                      <td className="w-20 border border-black px-1 py-1">
                        {row.taskId}
                      </td>
                      <td className="border border-black px-4 py-1 text-center">
                        {row.taskName}
                      </td>
                      <td className="w-20 border border-black px-4 py-1 text-center">
                        <p>Student1</p>
                      </td>
                      <td className="w-20 border border-black px-4 py-1 text-center">
                        <p>Faculty1</p>
                      </td>
                      <td className="w-fit border border-black px-4 py-1 text-center">
                        <button
                          className={`w-fit h-10 rounded-xl text-lg p-2 ${
                            row.status === "Not Approved"
                              ? "bg-red-500 text-white"
                              : "bg-blue-500 text-white"
                          }`}
                          onClick={() =>
                            handleApprovalStatusChange(row.taskId)
                          }
                        >
                          {row.status}
                        </button>
                      </td>
                      <td className="w-20 border border-black px-4 py-1 text-center">
                        <button
                          className="w-20 h-10 rounded-xl bg-blue-500 text-lg p-1"
                          onClick={() => setOpen(true)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Viewtaskfacultypopup
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="lg:w-60vw md:w-30vw sm:20vw lg:h-60vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
          <div className="text-2xl font-black text-blue-950 justify-self-center mt-4">
            View Task
          </div>
        </div>
      </Viewtaskfacultypopup>
    </section>
  );
};

export default Dashboardpglog;