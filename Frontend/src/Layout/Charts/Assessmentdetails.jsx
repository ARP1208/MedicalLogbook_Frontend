import React from "react";
import Assessmentchart from "../Charts/Assessmentchart";
import Dashboardfilter from "./Dashboardfilter";

const Assessmentdetails = () => {
  return (
    <>
    
    <Dashboardfilter/>
    
      <section className="mt-10 scale-125 absolute  left-40 ml-40 flex items-center">
        <Assessmentchart />
      </section>
      <div className="text-center relative" style={{top:"60vh"}}>
        <h3 >Assessment details</h3>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data</p>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data </p>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data </p>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data</p>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data </p>
          <p>the form of a circular chart or pie where the slices of the pie show the size of the data </p>
        </div>
    </>
  );
};

export default Assessmentdetails;
