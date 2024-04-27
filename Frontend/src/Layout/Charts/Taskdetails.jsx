import React, { useState, useEffect } from "react";
import Taskchart from "../Charts/Taskchart";
import Dashboardfilter from "./Dashboardfilter";

const Taskdetails = () => {
  const [semester, setSemester] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const name = "Luffy";

  const getTaskData = async () => {
    const url = "http://localhost:8000/faculty/searchTask";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          searchTerm: name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      const tasks = responseData.taskData;

      // Calculate counts of tasks based on status
      const assignedCount = tasks.filter((task) => task.Status === 0).length;
      const acceptedCount = tasks.filter((task) => task.Status === 1).length;
      const completedCount = tasks.filter((task) => task.Status === 2).length;
      const approvedCount = tasks.filter((task) => task.Status === 3).length;

      // Set task data state
      setTaskData([
        { name: "Assigned task", value: assignedCount },
        { name: "Accepted task", value: acceptedCount },
        { name: "Completed task", value: completedCount },
        { name: "Approved task", value: approvedCount },
      ]);

      if (!response.ok) {
        console.log("Error fetching student's task details");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  return (
    <section className="flex flex-row">
      <Dashboardfilter onSemesterChange={setSemester} />

      <div className="mt-10 flex relative left-2 scale-125">
        <Taskchart data={taskData} />
      </div>
      <div className="relative text-nowrap py-3" style={{ top: "50vh", right: "28%" }}>
        <h3>Task details</h3>
        {taskData && (
          <table className="border border-black">
            <thead>
              <tr>
                <th className="border bg-blue-950 text-white px-4 py-2">Assigned task</th>
                <th className="border bg-blue-950 text-white px-4 py-2">Accepted task</th>
                <th className="border bg-blue-950 text-white px-4 py-2">Completed task</th>
                <th className="border bg-blue-950 text-white px-4 py-2">Approved task</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {taskData.map((task, index) => (
                  <td key={index} className="border border-black px-4 py-2">{task.value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Taskdetails;




// import React, { useState, useEffect } from "react";
// import Taskchart from "../Charts/Taskchart";
// import Dashboardfilter from "./Dashboardfilter";

// const Taskdetails = () => {
//   const [semester, setSemester] = useState(null);
//   const [taskData, setTaskData] = useState(null);
//   const name = "Luffy";

//   const getTaskData = async () => {
//     const url = "http://localhost:8000/faculty/searchTask";

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         body: JSON.stringify({
//           searchTerm: name,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const responseData = await response.json();
//       const tasks = responseData.taskData;

//       // Calculate counts of tasks based on status
//       const yetToStartCount = tasks.filter((task) => task.Status === 0).length;
//       const startedCount = tasks.filter((task) => task.Status === 1).length;
//       const completedCount = tasks.filter((task) => task.Status === 2).length;
//       const approvedCount = tasks.filter((task) => task.Status === 3).length;

//       // Set task data state
//       setTaskData([
//         { name: "Yet to Start", value: yetToStartCount },
//         { name: "Started", value: startedCount },
//         { name: "Completed", value: completedCount },
//         { name: "Approved", value: approvedCount },
//       ]);

//       if (!response.ok) {
//         console.log("Error fetching student's task details");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     getTaskData();
//   }, []);

//   return (
//     <section className="flex flex-row ">
//       <Dashboardfilter onSemesterChange={setSemester} />

//       <div className="mt-10 flex  relative left-2 scale-125 ">
//         <Taskchart data={taskData} />
//       </div>
//       <div
//         className="relative text-nowrap py-3"
//         style={{ top: "50vh", right: "18%" }}
//       >
//         <h3>Task details</h3>
//         {taskData &&
//           taskData.map((task, index) => (
//             <p key={index}>
//             You currently have {task.value} {task.name.toLowerCase()} tasks.
//             </p>
//           ))}
//       </div>
//     </section>
//   );
// };

// export default Taskdetails;
