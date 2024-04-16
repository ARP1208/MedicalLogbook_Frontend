import React, { Component, useState } from "react";

const Facultydashboard = () => {
  return (
    <section className="left-50 top-33 absolute">
      <div className="absolute flex left-10 top-5 w-auto ">
        <button className="bg-sky-500 rounded-md text-lg w-auto">
          {" "}
          Dashboard
        </button>
      </div>

      <div className="border-1 h-auto rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10 -pb-5">
        <div className="p-10">
          <div className="flex mb-4 mt-10">
            <input
              type="text"
              placeholder="Search Registration number or Student name"
              className="placeholder:text-sky-500 px-2 border-2 w-40 text-md text-black rounded-md border-sky-500 flex-1 mr-2"
              name="searchTerm"
            />
            <button className=" text-lg px-6 py-1 bg-sky-500 text-white w-auto rounded-r-md rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Search 
            </button>
          </div>
          <div className="overflow-hidden block">
            <div className="flex w-70vw h-45vh border-2 rounded-tl-3xl rounded-tr-3xl overflow-auto border-sky-500 rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950 text-white px-1 py-2">
                      Reg no.
                    </th>
                    <th className="col-span-4 bg-blue-950 border-b border-r-0 text-white px-4 py-2">
                      Name
                    </th>
                    <th className="bg-blue-950 border-b  border-r-0 px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-20 border border-black px-1 py-1">1</td>
                    <td className="border-b border-black border-r-0 px-4 py-1 text-center">Student1</td>
                    <td className="w-20 border-b border-black border-r-0 px-1 py-1 text-center"><button className="w-auto h-10 rounded-xl bg-blue-500 text-lg py-1 px-3">Preview</button></td>
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

export default Facultydashboard;
