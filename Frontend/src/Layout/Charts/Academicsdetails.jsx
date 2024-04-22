import React from "react";
import Academicschart from "./Academicschart";
import Dashboardfilter from "./Dashboardfilter";

const Academicsdetails = () => {
  return (
    <>
    
    <Dashboardfilter/>
    
      <section className="mt-24 scale-125 absolute left-40 ml-40 flex flex-col justify-center items-center text-center">
        
        <Academicschart />
        
      </section>
      <div className="text-center relative py-3" style={{top:"60vh"}}>
        <h3 >Academics details</h3>
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

export default Academicsdetails;
