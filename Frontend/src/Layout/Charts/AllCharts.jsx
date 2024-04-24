import React from "react";
import Taskchart from "./Taskchart";
import Academicschart from "./Academicschart";
import Assessmentchart from "./Assessmentchart";
import Attendancechart from "./Attendancechart";
import Dashboardfilter from "./Dashboardfilter";

const AllCharts = () => {
  return (
    <>
      <Dashboardfilter />

      <div className="flex flex-col w-fit h-auto relative left-40">
        <div className="flex flex-row justify-between gap-20 relative ">
          <div className="scale-75">
            <Assessmentchart />
          </div>
          <div className="scale-125">
            <Taskchart />
            <div className="text-center mb"><title>Task Chart</title></div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-20 relative">
          <div className="scale-75">
            <Academicschart />
          </div>
          <div className="scale-125">
            <Attendancechart />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCharts;
