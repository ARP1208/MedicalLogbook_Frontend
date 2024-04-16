import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import Viewtaskfacultypopup from "./Viewtaskfacultypopup";
import { set } from "mongoose";

const Generateapproval = () => {
  return [
    { value: "All", label: "All" },
    { value: "Approved", label: "Approved" },
    { value: "Not Approved", label: "Not Approved" },
  ];
};

const Dashboardpglog = () => {
  const [selectedOption, setSelectedOption] = useState("All");
  const [tableData, setTableData] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState("Not Approved");
  const [open, setOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [allTasks, setAllTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);


  const handleDropdownChange = (selectedOption) => {
    console.log("Selected option: ", selectedOption);
    setSelectedOption(selectedOption);
    const newStatus = selectedOption.value;
    setApprovalStatus(newStatus);
  };

  const fetchData = async (status) => {
    const url = `http://127.0.0.1:8000/faculty/fetchalltasks`;
    try {
      let response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        let data = await response.json();
        console.log(data.tasks)
        setTableData(data.tasks);
        setAllTasks(data.tasks);
      } else {
        console.log("Error fetching tasks ", response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleApprovalStatusChange = async (task_id) => {
    const url = "http://127.0.0.1:8000/faculty/updateTask";

    if (tableData && tableData.length > 0) {
      console.log("Changing status");

      const updatedData = tableData.map(async (row) => {
        if (row && row.Task_ID === task_id) {
          const data = {
            ...row,
            Task_Completed: true,
          };

          console.log("Changing: ", data);

          try {
            let response = await fetch(url, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            if (response.ok) {
              console.log(response);
            } else {
              console.log("Error Fetching data");
            }
          } catch (e) {
            console.log(e);
          }

          return {
            ...row,
            Task_Completed: true,
          };
        }
        return row;
      });

      const resolvedData = await Promise.all(updatedData);
      setTableData(resolvedData);
      setAllTasks(resolvedData);
    }
  };

  const searchTask = () => {
    const query = searchInputRef.current.value.toLowerCase(); // Convert query to lowercase for case-insensitive search

    if (query) {
      console.log("Searching for: ", query);

      // Filter allTasks based on the search query
      const filteredTasks = allTasks.filter((task) => {
        const taskName = task.Task_Name.toLowerCase();
        const taskNumber = task.Task_ID.toLowerCase();
        const studentNames = task.Students ? task.Students.map(student => student.Name.toLowerCase()).join(", ") : "";

        return taskName.includes(query) || taskNumber.includes(query) || studentNames.includes(query);
      });

      setTableData(filteredTasks);
    } else {
      setTableData(allTasks); // If query is empty, display all tasks
    }
  };

  // Use the searchTask function on input change
  const handleInputChange = () => {
    searchTask();
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <section className="left-50 absolute">
      <div className="absolute flex left-5 top-4 w-auto ">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Dashboard
        </button>
      </div>

      <div className="border-1 h-70vh rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10 -pb-5">
        <div className="p-10 ">
          <div className="mb-4 w-full flex items-center gap-2">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search Task name, Task number, Student name"
              className="placeholder:text-sky-500 px-2 py-1 border-2 w-2/3 text-4 text-black rounded-md border-sky-950"
              onChange={searchTask}
            />
            {/* <button className="px-2 py-1 bg-sky-500 text-white w-fit rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-lg"
              onClick={searchTask}>
              Search
            </button> */}
            <div className="w-1/3 pl-2">
              <select
                className="border-2 border-black p-2 rounded-md"
                value={selectedOption}
                onChange={(e) => { handleDropdownChange(e.target.value) }}
              >
                <option value={Generateapproval[0]}>All</option>
                <option value={Generateapproval[1]}>Approved</option>
                <option value={Generateapproval[2]}>Not Approved</option>
              </select>
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
                      Students
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
                  {tableData.map((row) => {
                    if (selectedOption == "Approved" && row.Task_Completed !== undefined) {
                      return (
                        <tr key={row.Task_ID}>
                          <td className="w-20 border border-black px-1 py-1">
                            {row.Task_ID}
                          </td>
                          <td className="border border-black px-4 py-1 text-center">
                            {row.Task_Name}
                          </td>
                          <td className="w-20 border border-black px-4 py-1 text-center">
                            {row.Students ? row.Students.map(student => student.Name).join(", ") : ""}
                          </td>
                          <td className="w-fit border border-black px-4 py-1 text-center">
                            <button
                              className={`w-fit h-10 rounded-xl text-lg p-2 ${row.Task_Completed === undefined
                                ? "bg-red-500 text-white"
                                : "bg-green-500 text-white"
                                }`}
                              onClick={() => handleApprovalStatusChange(row.Task_ID)}
                            >
                              {row.Task_Completed === undefined ? "Not Approved" : "Approved"}
                            </button>
                          </td>
                          <td className="w-20 border border-black px-4 py-1 text-center">
                            <button
                              className="w-20 h-10 rounded-xl bg-blue-500 text-lg p-1"
                              onClick={() => {
                                setOpen(true);
                                setSelectedTask(row); // Pass the selected task data to the state
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    } else if (selectedOption == "Not Approved" && row.Task_Completed === undefined) {
                      return (
                        <tr key={row.Task_ID}>
                          <td className="w-20 border border-black px-1 py-1">
                            {row.Task_ID}
                          </td>
                          <td className="border border-black px-4 py-1 text-center">
                            {row.Task_Name}
                          </td>
                          <td className="w-20 border border-black px-4 py-1 text-center">
                            {row.Students ? row.Students.map(student => student.Name).join(", ") : ""}
                          </td>
                          <td className="w-fit border border-black px-4 py-1 text-center">
                            <button
                              className={`w-fit h-10 rounded-xl text-lg p-2 ${row.Task_Completed === undefined ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                              onClick={() => handleApprovalStatusChange(row.Task_ID)}
                            >
                              {row.Task_Completed === undefined ? "Not Approved" : "Approved"}
                            </button>
                          </td>
                          <td className="w-20 border border-black px-4 py-1 text-center">
                            <button
                              className="w-20 h-10 rounded-xl bg-blue-500 text-lg p-1"
                              onClick={() => {
                                setOpen(true);
                                setSelectedTask(row); // Pass the selected task data to the state
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    } else if (selectedOption == "All") {
                      return (
                        <tr key={row.Task_ID}>
                          <td className="w-20 border border-black px-1 py-1">
                            {row.Task_ID}
                          </td>
                          <td className="border border-black px-4 py-1 text-center">
                            {row.Task_Name}
                          </td>
                          <td className="w-20 border border-black px-4 py-1 text-center">
                            {row.Students ? row.Students.map(student => student.Name).join(", ") : ""}
                          </td>
                          <td className="w-fit border border-black px-4 py-1 text-center">
                            <button
                              className={`w-fit h-10 rounded-xl text-lg p-2 ${row.Task_Completed === undefined
                                ? "bg-red-500 text-white"
                                : "bg-green-500 text-white"
                                }`}
                              onClick={() => handleApprovalStatusChange(row.Task_ID)}
                            >
                              {row.Task_Completed === undefined ? "Not Approved" : "Approved"}
                            </button>
                          </td>
                          <td className="w-20 border border-black px-4 py-1 text-center">
                            <button
                              className="w-20 h-10 rounded-xl bg-blue-500 text-lg p-1"
                              onClick={() => {
                                setOpen(true);
                                setSelectedTask(row); // Pass the selected task data to the state
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    }
                    return null; // Return null for other cases
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Viewtaskfacultypopup
        open={open}
        onClose={() => setOpen(false)}
        task={selectedTask} // Pass the selected task data as a prop
      >
        <div className="lg:w-60vw md:w-30vw sm:20vw lg:h-60vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
          <div className="text-2xl font-black text-blue-950 justify-self-center mt-4">
            View Task
          </div>
          {selectedTask && ( // Check if selectedTask is not null
            <section className="relative">


              <div className="flex justify-center items-center mb-1 gap-10">
                <label className="block text-gray-700 font-bold mb-2 text-start">
                  Task ID
                  <input
                    type="text"
                    id="TaskID"
                    className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={selectedTask.Task_ID}
                    readOnly
                  />
                </label>
                <label className="block text-start text-gray-700 font-bold mb-2">
                  Task Name
                  <input
                    type="text"
                    id="TaskName"
                    className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={selectedTask.Task_Name}
                    readOnly
                  />
                </label>
              </div>
              <div className="mb-4 px-5">
                <label className="block text-start text-gray-700 font-bold mb-2">
                  Task Description
                  <textarea
                    id="Description"
                    placeholder="Enter Task Description Name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none min-h-10 focus:shadow-outline"
                    value={selectedTask.Task_Description}
                    readOnly
                  />
                </label>
              </div>

              <div className="flex justify-center gap-10 mb-4">
                <label className="block text-start text-gray-700 font-bold mb-2">
                  Start Date
                  <br />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={selectedTask.start_Date}
                    readOnly
                  />
                </label>
                <label className="block text-start text-gray-700 font-bold mb-2">
                  End Date
                  <br />
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={selectedTask.End_Date}
                    readOnly
                  />
                </label>

                <label className="block text-start text-gray-700 font-bold mb-2">
                  Submit Before
                  <br />
                  <input
                    id="submittime"
                    type="time"
                    className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={selectedTask.Submit_Time}
                    readOnly
                  />
                </label>
              </div>
              <div className="flex flex-col px-5 gap-4">
                {selectedTask.Students && selectedTask.Students.map((student, index) => (
                  <div key={index} className="flex justify-center items-center gap-10">
                    <label className="block text-gray-700 font-bold mb-2 text-start">
                      Registration No.
                      <input
                        type="text"
                        id={`TaskID-${index}`}
                        className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={student.regno}
                        readOnly
                      />
                    </label>
                    <label className="block text-start text-gray-700 font-bold mb-2">
                      Student Name
                      <input
                        type="text"
                        id={`StudentName-${index}`}
                        className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={student.Name}
                        readOnly
                      />
                    </label>
                  </div>
                ))}
              </div>

            </section>
          )}
        </div>
      </Viewtaskfacultypopup>

    </section >
  );
};

export default Dashboardpglog;