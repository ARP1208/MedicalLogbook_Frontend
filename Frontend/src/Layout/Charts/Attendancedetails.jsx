import React from "react";
import Attendancechart from "../Charts/Attendancechart";
import Dashboardfilter from "./Dashboardfilter";

const Attendancedetails = () => {
  return (
    <section className="flex flex-row ">
      
    <Dashboardfilter/>
  
  <div className="mt-40 flex justify-center items-center relative left-2 scale-125 ">
    <Attendancechart />
  </div>
  <div className="relative text-nowrap py-3" style={{top:"50vh", right:"28%"}}>
        <h3 >Attendance details</h3>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data</p>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data </p>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data </p>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data</p>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data </p>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data </p>
        </div>
</section>

  );
};

export default Attendancedetails;
