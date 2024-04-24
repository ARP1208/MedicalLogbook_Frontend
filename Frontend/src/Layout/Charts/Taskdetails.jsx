import React from "react";
import Taskchart from "../Charts/Taskchart";
import Dashboardfilter from "./Dashboardfilter";

const Taskdetails = () => {
  return (
    <section className="flex flex-row">
      <Dashboardfilter />

      <div className="mt-10 flex relative left-10 scale-125 ">
        <Taskchart />
      </div>
      <div
        className="relative text-nowrap"
        style={{ top: "50vh", right: "27%" }}
      >
        <h3>Task details</h3>
        <p>
          the form of a circular chart or pie where the slices of the pie show
          the size of the data
        </p>
        <p>
          the form of a circular chart or pie where the slices of the pie show
          the size of the data{" "}
        </p>
        <p>
          the form of a circular chart or pie where the slices of the pie show
          the size of the data{" "}
        </p>
        <p>
          the form of a circular chart or pie where the slices of the pie show
          the size of the data
        </p>
        <p>
          the form of a circular chart or pie where the slices of the pie show
          the size of the data{" "}
        </p>
        <p>
          the form of a circular chart or pie where the slices of the pie show
          the size of the data{" "}
        </p>
      </div>
    </section>
  );
};

export default Taskdetails;
