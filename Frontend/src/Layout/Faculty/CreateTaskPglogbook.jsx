import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextareaAutosize from "react-textarea-autosize";

const CreateTaskPglogbook = () => {
  const [subjectCount, setSubjectCount] = useState(1); // State to track the number of subjects
  const [startDate, setStartDate] = React.useState(new Date());

  const handleSubmit = (e) => {};

  const handleAddSubject = () => {
    setSubjectCount((prevCount) => prevCount + 1); // Increment subject count
  };

  const handleRemoveSubject = () => {
    if (subjectCount > 1) {
      setSubjectCount((prevCount) => prevCount - 1); // Decrement subject count only if greater than 1
    }
  };

  return (
    <section className="fixed">
      <div className="fixed flex left-5 top-32 ml-50 w-auto">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Create Task
        </button>
      </div>
      <div className="fixed p-4 flex left-5 ml-50 top-45 flex-wrap w-fit border-sky-500 border-3 rounded-md bg-gray-200">
        <form onSubmit={handleSubmit} className="overflow-auto">
          <div className="flex-col md:flex-row gap-3 justify-center items-center grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 overflow-auto"></div>

          <div className="flex mb-1 gap-10">
            <label className="block text-gray-700 font-bold mb-2 text-start">
              Task ID
              <input
                type="text"
                id="TaskID"
                className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <label className="block text-start text-gray-700 font-bold mb-2">
              Task Name
              <input
                type="text"
                id="TaskName"
                className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-start text-gray-700 font-bold mb-2">
              Task Description
              <TextareaAutosize
                id="Description"
                placeholder="Enter Task Description Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none min-h-10 focus:shadow-outline"
              />
            </label>
          </div>

          <div className="flex justify-center gap-10 mb-4">
            <label className="block text-start text-gray-700 font-bold mb-2">
              Start Date
              <br />
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <label className="block text-start text-gray-700 font-bold mb-2">
              End Date
              <br />
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>

            <label className="block text-start text-gray-700 font-bold mb-2">
              Submit Before
              <br />
              <input
                id="submittime"
                type="time"
                className="shadow appearance-none border rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <div className=" flex justify-center gap-10 pb-3">
            <button
              type="button"
              onClick={handleAddSubject}
              className="bg-blue-500 text-base rounded-md w-auto"
            >
              Add Student
            </button>
            <button
              type="button"
              onClick={handleRemoveSubject}
              className="bg-blue-500 text-base  rounded-md w-auto"
            >
              Remove Student
            </button>
          </div>
          {/* Dynamic Rol number and student name input fields */}
          <div className="overflow-auto max-h-40 mb-3">
            <div className=" w-auto">
              {[...Array(subjectCount)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-center gap-10  overflow-auto"
                >
                  <label
                    htmlFor={`subject${index + 1}`}
                    className="block text-start text-gray-700 font-bold"
                  >
                    Roll Number {index + 1}
                    <input
                      type="text"
                      id={`subject${index + 1}`}
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </label>
                  <label
                    htmlFor={`faculty${index + 1}`}
                    className="block text-start text-gray-700 font-bold"
                  >
                    Student Name {index + 1}
                    <input
                      type="text"
                      id={`faculty${index + 1}`}
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateTaskPglogbook;
