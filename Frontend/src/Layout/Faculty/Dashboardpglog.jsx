import React, { Component, useState } from 'react'
import EditTaskFaculty from './EditTaskFaculty';

const  Dashboardpglog = () => {
const[showedittaskfaculty,setshowedittaskfaculty]=useState(false);

const handleedittaskfaculty = (component) =>{
  if(component === "Edit"){
    setshowedittaskfaculty(true);
  }
}

  return (
    <section className="left-50 absolute">
      {showedittaskfaculty ? (<EditTaskFaculty/>
      ):(
        <>
    <div className="absolute flex left-5 top-4 w-auto ">
      <button className="bg-sky-500 rounded-md w-auto text-lg">
        {" "}
        Dashboard
      </button>
    </div>

    <div className="border-1 h-70vh rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10 -pb-5">
      <div className="p-10">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search Task name, Task number, Student name"
            className="placeholder:text-sky-500 px-2 border-2 w-40 text-4 text-black rounded-md border-sky-950 flex-1 mr-2"
          />
          <button className="px-2 py-1 bg-sky-500 text-white w-auto rounded-r-md rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-lg">
            Search
          </button>
        </div>
        <div className="overflow-hidden block text-4">
          <div className="flex w-60vw h-40vh border-3 rounded-tl-3xl rounded-tr-3xl overflow-auto border-sky-500 rounded-xl">
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
                      Preview
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2" onClick={()=>handleedittaskfaculty("Edit")}>
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-20 border border-black px-1 py-1">1</td>
                    <td className="border border-black px-4 py-1 text-center">
                      Taskname 1
                    </td>
                    <td className="w-20 border border-black px-4 py-1 text-center">
                      <button
                        className="w-20 h-10 rounded-xl bg-blue-500 text-lg p-1">
                        Preview
                      </button>
                      </td>
                      <td className="w-20 border border-black px-4 py-1 text-center">
                      <button
                        className="w-20 h-10 rounded-xl bg-blue-500 text-lg p-1" onClick={()=>handleedittaskfaculty("Edit")}>
                        Edit
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
  )
}

export default Dashboardpglog;
