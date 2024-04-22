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

      <div className="flex flex-col w-fit h-auto overflow-hidden relative left-40">
        <div className="flex flex-row justify-between gap-20 relative ">
          <div className="scale-75">
            <Assessmentchart />
            <div className="ml-70 py-3 font-medium text-xl">Assessment detail</div>
          </div>

          <div className="scale-125">
            <Taskchart />
            <div className="left-20 -top-56 py-3 font-medium text-lg relative scale-75">Task detail</div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-20 relative">
          <div className="scale-75">
            <Academicschart />
            <div className=" ml-70 relative -top-32 font-medium text-xl">Academics detail</div>
          </div>
          <div className="scale-125">
            <Attendancechart />
            <div className="left-20 -top-80 py-3 font-medium text-lg relative scale-75">Attendance detail</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCharts;
