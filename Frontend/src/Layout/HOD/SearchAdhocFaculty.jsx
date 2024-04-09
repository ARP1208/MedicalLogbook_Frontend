import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Editfaculty from "./Editfaculty";

const SearchAdhocFaculty = () => {
  const[showeditfacultypage,setshoweditfacultypage]=useState(false);
  const[showsearchpage,setshowsearchpage]=useState(false);
  const[searchResults,setSearchResults]=useState([]);


  const history = useNavigate();
  const [selectedFacultyData, setSelectedFacultyData] = useState(null);
  const [searchfacultytData, setSearchFacultyData] = useState({
    searchTerm: "",
  });
  

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSearchFacultyData({
      ...searchfacultytData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // const handleeditfaculty = (component) =>{
  //   if(component === "Edit"){
  //     setshoweditfacultypage(true);
  //     setshowsearchpage(false);
  //   }
  // }


  const Searchfacultydetails = async (e) => {
    e.preventDefault();
    const cleanedFormData = {
      searchTerm: searchfacultytData.searchTerm.trim(),
    };

    if (!cleanedFormData.searchTerm) {
      alert("Please enter a search term.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/faculty/faculty-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedFormData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.facultyData.length === 0) {
          alert("Faculty not found.");
        } else {
          setSearchResults(responseData.facultyData);
          console.log('Faculty search successful');
        }
      } else {
        const responseData = await response.json();
        if (responseData.message === "faculty not found") {
          setSearchResults([]);
          alert("No faculty found.");
        } else {
          setErrors(responseData.errors || {});
        }
      }
    } catch (error) {
      console.error('Error during faculty search:', error);
    }

    console.log("Faculty data submitted:", cleanedFormData);
  };


  const handleeditfaculty =  (selectedFaculty) => {
    setSelectedFacultyData(selectedFaculty);
    history("/Editfaculty", {
      state: { facultyData: selectedFaculty },
    });
  };


  return (
    <section className="left-50 top-33 absolute">
      <div className="absolute flex left-5 top-5 w-auto ">
        <button
          className="bg-sky-500 rounded-md text-lg w-auto"
        >
          {" "}
          Search Faculty
        </button>
      </div>

      <div className="border-1 h-auto rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10 -pb-5">
        <div className="p-10">
          <div className="flex mb-4 mt-10">
            <input
              type="text"
              placeholder=" Enter Faculty id, Name or Department"
              className="placeholder:text-sky-500 px-2 border-2 w-40 text-md text-black rounded-md border-sky-500 flex-1 mr-2"
              value={searchfacultytData.searchTerm}
              name="searchTerm"
              onChange={handleChange}
            />
            <button
              className=" text-lg px-2 py-1 bg-sky-500 text-white w-auto rounded-r-md rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={Searchfacultydetails}
            >
              Search Faculty
            </button>
          </div>
          <div className="overflow-hidden block">
            <div className="flex w-60vw h-40vh border-3 rounded-tl-3xl rounded-tr-3xl overflow-auto  border-sky-500 rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950  text-white px-4 py-2">
                      SL No
                    </th>

                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Faculty ID
                    </th>

                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Faculty Name
                    </th>

                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Department
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((faculty, index) => (
                    <tr key={index}>
                      <td className="border border-black px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {faculty.facultyid}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {faculty.facultyname}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {faculty.department}
                      </td>
                      <td className="border border-black px-4 py-2">
                        <button
                          className="w-20 h-10 rounded-xl bg-blue-500 text-lg p-1"
                          onClick={() => handleeditfaculty(faculty)}
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
    </section>
  );
};

export default SearchAdhocFaculty;
