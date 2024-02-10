import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Editstudent from "./Editstudent";

const Searchstudent = () => {
  // const [showeditstudentpage, setshoweditstudentpage] = useState(false);
  // const [showsearchstudentpage, setshowsearchstudentpage] = useState(false);
  const history = useNavigate();
  const [selectedStudentData, setSelectedStudentData] = useState(null);
  const [searchstudentData, setSearchStudentData] = useState({
    searchTerm: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSearchStudentData({
      ...searchstudentData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlesearchstudent = async (e) => {
    e.preventDefault();
    const cleanedFormData = {
      searchTerm: searchstudentData.searchTerm.trim(),
    };

    if (!cleanedFormData.searchTerm) {
      alert("Please enter a search term.");
      return;
    }

    try {
      alert("data saved");
      const SearchStudentresponse = await fetch(
        "http://localhost:8000/student/search-student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanedFormData),
        }
      );

      if (SearchStudentresponse.ok) {
        const responseData = await SearchStudentresponse.json();
        if (responseData.studentData.length === 0) {
          alert("No student found.");
        } else {
          setSearchResults(responseData.studentData);
          console.log("student search successful");
        }
      } else {
        const responseData = await SearchStudentresponse.json();
        if (responseData.message === "Student not found") {
          alert("No student found.");
        } else {
          setErrors(responseData.errors || {});
        }
      }
    } catch (error) {
      console.error("Error during faculty login:", error);
    }

    console.log("student data submitted:", cleanedFormData);
  };

  const handleeditstudent = (selectedStudent) => {
    setSelectedStudentData(selectedStudent);
    history("/Editstudent", {
      state: { studentData: selectedStudent },
    });
  };

 
  

  return (
    <section className="left-50 top-33 absolute">
      {/* {showeditstudentpage ? (<Editstudent/>
      ) : (
        <> */}
      <div className="absolute flex left-5 top-4 w-auto ">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          {" "}
          Search Student
        </button>
      </div>
      <div className="border-1 h-auto rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10 -pb-5">
        <div className="p-10">
          <div className="flex mb-4 mt-10">
            <input
              type="text"
              placeholder=" Enter Reg no, Name or Course"
              className="placeholder:text-sky-500 px-2 border-2 w-40 text-4 text-black rounded-md border-sky-500 flex-1 mr-2"
              value={searchstudentData.searchTerm}
              name="searchTerm"
              onChange={handleChange}
            />
            <button
              className="px-2 py-1 bg-sky-500 text-white w-auto rounded-r-md rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-lg"
              onClick={handlesearchstudent}
            >
              Search student
            </button>
          </div>
          <div className="overflow-hidden block text-4">
            <div className="flex w-60vw h-40vh border-3 rounded-tl-3xl rounded-tr-3xl overflow-auto  border-sky-500 rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950  text-white px-4 py-2">
                      SL No
                    </th>

                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Registration number
                    </th>

                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Student Name
                    </th>

                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Course
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((students, index) => (
                    <tr key={index}>
                      <td className="border border-black px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {students.regno}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {students.studentname}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {students.course}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {" "}
                        <button
                          className="w-20 h-10 rounded-xl bg-blue-500 text-lg p-1"
                          onClick={() => handleeditstudent(students)}
                        >
                          Edit
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
      {/* </>
      ) */}
      
    </section>
  );
};

export default Searchstudent;
