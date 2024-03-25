import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Viewtaskpopup from "./Viewtaskpopup";
import TextareaAutosize from "react-textarea-autosize";
import Studenttaskcheckin from "./Studenttaskcheckin";
import Completedpopup from "./Completedpopup";

const Generatesort = () => {
  return [
    { value: "New Task", label: "New Task" },
    { value: "Yet to Complete", label: "Yet to Complete" },
    { value: "Completed", label: "Completed" },
  ];
};

const Studenttask = () => {
  const [buttonText, setButtonText] = useState("Check-In");
  const [buttonColor, setButtonColor] = useState("bg-blue-500");
  const [startDate, setStartDate] = React.useState(new Date());
  const [EndDate, setEndDate] = React.useState(new Date());
  const [open, setOpen] = useState(false);
  const [viewopen, setviewopen] = useState(false);
  const [checktask, setCheckTask] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [tableData, setTableData] = useState([]);

  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const newData = fetchData(selectedOption.value);
    setTableData(newData);
  };

  const fetchData = (option) => {
    // Dummy data for demonstration, you can replace it with actual data fetching logic
    switch (option) {
      case "New Task":
        return [
          { taskId: 1, taskName: "Taskname 1" },
          { taskId: 2, taskName: "Taskname 2" },
          // Add more data as needed
        ];
      case "Yet to Complete":
        return [
          { taskId: 3, taskName: "Taskname 3" },
          { taskId: 4, taskName: "Taskname 4" },
          // Add more data as needed
        ];
      case "Completed":
        return [
          { taskId: 5, taskName: "Taskname 5" },
          { taskId: 6, taskName: "Taskname 6" },
          // Add more data as needed
        ];
      default:
        return [];
    }
  };

  const handleOpenTask = (component) => {
    if (component === "Check-In") {
      setButtonText("Checked-In");
      setButtonColor("bg-blue-900");
      setCheckTask(true);
    }
  };

  const renderActionButtons = (option) => {
    switch (option) {
      case "New Task":
        return (
          <>
            <button
              className="w-auto h-10 rounded-xl bg-blue-500 text-4 py-1 px-3"
              onClick={() => setOpen(true)}
            >
              View
            </button>
            {/* <button
              className={`w-auto h-10 rounded-xl bg-blue-500 text-4 py-1 px-3 ${buttonColor}`}
              onClick={() => handleOpenTask("Check-In")}
            >
              {buttonText}
            </button> */}
          </>
        );
      case "Yet to Complete":
        return (
          <>
            <button
              className="w-auto h-10 rounded-xl bg-yellow-500 text-4 py-1 px-3"
              onClick={() => handleOpenTask("Check-In")}
            >
              Upload
            </button>
            {/* <button
              className={`w-auto h-10 rounded-xl bg-blue-500 text-4 py-1 px-3 ${buttonColor}`}
             
            >
              {buttonText}
            </button> */}
          </>
        );
      case "Completed":
        return (
          <>
            <button
              className="w-auto h-10 rounded-xl bg-blue-500 text-4 py-1 px-3"
              onClick={() => setviewopen(true)}
            >
              View
            </button>
            {/* <button
              className={`w-auto h-10 rounded-xl bg-green-500 text-4 py-1 px-3`}
              onClick={() => handleCompleted()}
            >
              Completed
            </button> */}
          </>
        );
      default:
        return null;
    }
  };

  const renderStatusButtons = (option) => {
    switch (option) {
      case "New Task":
        return (
          <button
            className={`w-auto h-10 rounded-xl bg-blue-500 text-4 py-1 px-3 ${buttonColor}`}
            onClick={() => handleOpenTask("Check-In")}
          >
            {buttonText}
          </button>
        );
      case "Yet to Complete":
        return (
          <button className="w-auto h-10 rounded-xl bg-blue-950 text-4 py-1 px-3 ">
            Checked-In
          </button>
        );
      case "Completed":
        return (
          <button
            className={`w-auto h-10 rounded-xl bg-green-500 text-4 py-1 px-3`}
            onClick={() => handleCompleted()}
          >
            Completed
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <section className="left-50 absolute">
      {checktask && <Studenttaskcheckin />}
      {!checktask && (
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
                <div className="justify-center items-center grid grid-cols-3 mb-3 gap-5">
                  <DatePicker
                    id="startDate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  />

                  <DatePicker
                    id="EndDate"
                    selected={EndDate}
                    onChange={(date) => setEndDate(date)}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  />

                  <Select
                    value={selectedOption}
                    onChange={handleDropdownChange}
                    options={Generatesort()}
                    placeholder="Sort"
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
                      {tableData.map((task) => (
                        <tr key={task.taskId}>
                          <td className="w-20 border border-black px-1 py-1">
                            {task.taskId}
                          </td>
                          <td className="border-b border-black border-r-0 px-4 py-1 text-center">
                            {task.taskName}
                          </td>
                          <td className="w-20 border-b border-black border-r-0 px-1 py-1 text-center">
                            {renderActionButtons(selectedOption.value)}
                          </td>
                          <td className="w-25 border-b border-black border-r-0 px-1 py-1 text-center">
                            {renderStatusButtons(selectedOption.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div style={{ zIndex: open ? 9999 : "auto" }}>
              <Viewtaskpopup open={open} onClose={() => setOpen(false)}>
                <div className="lg:w-60vw md:w-30vw sm:20vw lg:h-70vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
                  <div className="text-2xl font-black text-blue-950 justify-self-center mt-4">
                    View Task
                  </div>
                  <section className="left-4 absolute">
                    <div className="h-55vh rounded-md flex justify-center items-center px-5 py-3">
                      <div className="p-10">
                        <div className="overflow-hidden block text-4">
                          <div className="justify-center items-center grid grid-cols-2 pb-4">
                            <h5>
                              Start Date:
                              <span className="pl-3">13/03/2024</span>
                            </h5>
                            <h5>
                              End Date:
                              <span className="pl-3">15/03/2024</span>
                            </h5>
                          </div>
                          <div className="w-50vw h-45vh  rounded-xl">
                            <div className="flex flex-row justify-center">
                              <h5 className="font-bold pr-1">Task Id:</h5>
                              <h5 className="font-bold pr-7">T001</h5>
                              <h5 className="font-bold pl-7 pr-1">
                                Task Name:
                              </h5>
                              <h5 className="font-bold ">Task1</h5>
                            </div>

                            <div className="p-7">
                              <div className="py-3">
                                <label className="block text-start text-gray-700 font-bold mb-2">
                                  Task Description
                                </label>
                                <TextareaAutosize
                                  id="Description"
                                  className="border rounded py-2 w-45vw text-gray-700 leading-tight focus:outline-none min-h-10 "
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </Viewtaskpopup>
            </div>

            <div style={{ zIndex: viewopen ? 9999 : "auto" }}>
              <Completedpopup viewopen={viewopen} onClose={() => setviewopen(false)}>
                <div className="lg:w-60vw md:w-30vw sm:20vw lg:h-70vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
                  <div className="text-2xl font-black text-blue-950 justify-self-center mt-4">
                    View Task
                  </div>
                  <section className="left-4 absolute">
                    <div className="h-55vh rounded-md flex justify-center items-center px-5 py-3">
                      <div className="p-10">
                        <div className="overflow-hidden block text-4">
                          <div className="justify-center items-center grid grid-cols-2 pb-4">
                            <h5>
                              Start Date:
                              <span className="pl-3">13/03/2024</span>
                            </h5>
                            <h5>
                              End Date:
                              <span className="pl-3">15/03/2024</span>
                            </h5>
                          </div>
                          <div className="w-50vw h-45vh  rounded-xl">
                            <div className="flex flex-row justify-center">
                              <h5 className="font-bold pr-1">Task Id:</h5>
                              <h5 className="font-bold pr-7">T001</h5>
                              <h5 className="font-bold pl-7 pr-1">
                                Task Name:
                              </h5>
                              <h5 className="font-bold ">Task1</h5>
                            </div>

                            <div className="p-7">
                              <div className="py-3">
                                <label className="block text-start text-gray-700 font-bold mb-2">
                                  Task Description
                                </label>
                                <TextareaAutosize
                                  id="Description"
                                  className="border rounded py-2 w-45vw text-gray-700 leading-tight focus:outline-none min-h-10 "
                                  readOnly
                                />
                                <label className="block text-start text-gray-700 font-bold mb-2">
                                  Student Description
                                </label>
                                <TextareaAutosize
                                  id="Remarks"
                                  className="border rounded py-2 w-45vw text-gray-700 leading-tight focus:outline-none min-h-10 "
                                />
                              </div>
                              <div>
                              <button className="bg-blue-500 rounded-md w-auto h-auto px-4 py-2 text-white">
                                Preview File
                              </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </Completedpopup>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Studenttask;
