import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const AssignSubject = () => {
  const [subjectCount, setSubjectCount] = useState(1); // State to track the number of subjects

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

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
          Assign Subject
        </button>
      </div>
      <div className="fixed p-4 flex left-5 ml-50 top-45 flex-wrap w-fit border-sky-500 border-3 rounded-md bg-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3">
          <div className="mb-1 gap-10">
            {/* Form inputs for academic year, program, semester, section */}
            <label
              htmlFor="startDate"
              className="block text-start text-gray-700 font-bold mb-2"
            >
              Academic Year
              <input
                type="date"
                id="startDate"
                className="shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <label
              htmlFor="program"
              className="block text-gray-700 font-bold mb-2 text-start"
            >
              Program
              <input
                type="text"
                id="program"
                placeholder="Enter the student`s Program"
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div className="mb-1 gap-10">
            <label
              htmlFor="semester"
              className="block text-gray-700 font-bold mb-2 text-start"
            >
              Semester
              <input
                type="text"
                id="semester"
                placeholder="Enter the student`s Semester"
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <label
              htmlFor="section"
              className="block text-gray-700 font-bold mb-2 text-start"
            >
              Section
              <input
                type="text"
                id="section"
                placeholder="Enter the student`s Section"
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <div className="gap-x-10 mb-4">
            {/* Form inputs for roll number and name */}
            <label
              htmlFor="rollno"
              className="block text-start text-gray-700 font-bold mb-2"
            >
              Roll No
              <input
                type="text"
                id="rollno"
                placeholder="Enter the student`s Roll No"
                className="shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <label
              htmlFor="name"
              className="block text-start text-gray-700 font-bold mb-2"
            >
              Name
              <input
                id="name"
                placeholder="Enter the student`s Name (comma-separated if multiple)"
                className="shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          </div>
          <div className=" flex justify-center gap-10">
            <button
              type="button"
              onClick={handleAddSubject}
              className="bg-blue-500 text-base rounded-md w-auto"
            >
              Add Subject
            </button>
            <button
              type="button"
              onClick={handleRemoveSubject}
              className="bg-blue-500 text-base  rounded-md w-auto"
            >
              Remove Subject
            </button>
          </div>
          {/* Dynamic subject and faculty input fields */}
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
                    Subject {index + 1}
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
                    Faculty {index + 1}
                    <input
                      type="text"
                      id={`faculty${index + 1}`}
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </label>
                  <label
                    htmlFor={`faculty${index + 1}`}
                    className="block text-start text-gray-700 font-bold"
                  >
                    Subject code {index + 1}
                    <input
                      type="text"
                      id={`subjectcode${index + 1}`}
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default AssignSubject;
