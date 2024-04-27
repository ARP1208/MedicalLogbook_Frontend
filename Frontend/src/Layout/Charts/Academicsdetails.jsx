import React, { useState, useEffect } from "react";
import Academicschart from "./Academicschart";
import Dashboardfilter from "./Dashboardfilter";

const Academicsdetails = () => {
  const [semester, setSemester] = useState(null);
  const [marks, setMarks] = useState(null);
  const [visibleExamMarks, setVisibleExamMarks] = useState(null);
  const regno = 220970062;
  const year = "2020-2021";

  const getMarks = async () => {
    const url = "http://localhost:8000/student/fetchMarks";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          regno: regno,
          AcademicYear: year,
        }),
      });
      const data = await response.json();
      setMarks(data);

      if (!response.ok) {
        console.log("Error fetching internal/external marks");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMarks();
  }, []);

  useEffect(() => {
    if (semester !== null && marks !== null && marks.length > 0) {
      const filteredExamMarks = marks.filter(
        (item) =>
          item.semesterNumber === semester && item.internalMarks !== null
      );
      setVisibleExamMarks(filteredExamMarks);
    } else {
      setVisibleExamMarks(null);
    }
  }, [semester, marks]);

  return (
    <>
      <Dashboardfilter onSemesterChange={setSemester} />

      <section className="mt-24 scale-125 absolute left-40 ml-40 flex flex-col justify-center items-center text-center">
        <Academicschart examMarks={visibleExamMarks} />
      </section>

      <div className="text-center relative py-3" style={{ top: "60vh" }}>
        <h3>Academics details</h3>
        {visibleExamMarks ? (
          <table className="border-collapse border border-black mx-auto">
            <thead>
              <tr>
                <th className="border bg-blue-950 text-white px-4 py-2">Exam type</th>
                <th className="border bg-blue-950 text-white px-4 py-2">Semester</th>
                <th className="border bg-blue-950 text-white px-4 py-2">Subject</th>
                <th className="border bg-blue-950 text-white px-4 py-2">Marks obtained</th>
              </tr>
            </thead>
            <tbody>
              {visibleExamMarks.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black px-4 py-2">
                    {item.examType}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {item.semesterNumber}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {item.subjectName}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {item.examType === "Final" ? item.externalMarks : item.internalMarks}
                  </td>
                </tr>
              ))}
              {/* Additional row for total marks */}
              <tr>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2">Total</td>
                <td className="border border-black px-4 py-2">{visibleExamMarks.reduce((total, item) => total + (item.examType === "Final" ? (item.externalMarks || 0) : item.internalMarks), 0)}</td>
              </tr>

              <tr>
              <td colSpan="5" className="border border-black px-4 py-2"></td>
              

              </tr>

              <tr>
                <td className="border border-black px-4 py-2">Final Marks</td>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2"></td>
                <td className="border border-black px-4 py-2">{visibleExamMarks.reduce((total, item) => total + (item.externalMarks || 0), 0)}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default Academicsdetails;




// import React, { useState, useEffect } from "react";
// import Academicschart from "./Academicschart";
// import Dashboardfilter from "./Dashboardfilter";

// const Academicsdetails = () => {
//   const [semester, setSemester] = useState(null);
//   const [marks, setMarks] = useState(null);
//   const [visibleExamMarks, setVisibleExamMarks] = useState(null);
//   const regno = 220970062;
//   const year = "2020-2021";

//   const getMarks = async () => {
//     const url = "http://localhost:8000/student/fetchMarks";
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           regno: regno,
//           AcademicYear: year,
//         }),
//       });
//       const data = await response.json();
//       // console.log("Internal/External Marks: ",data);
//       setMarks(data);

//       if (!response.ok) {
//         console.log("Error fetching internal/external marks");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     getMarks();
//   }, []);

//   useEffect(() => {
//     if (semester !== null && marks !== null && marks.length > 0) {
//       // Filtering out internal/external marks
//       const filteredExamMarks = marks.filter(
//         (item) =>
//           item.semesterNumber === semester && item.internalMarks !== null
//       );
//       // console.log("Filtered internal/external marks: ", filteredExamMarks);
//       setVisibleExamMarks(
//         filteredExamMarks.length > 0 ? filteredExamMarks : null
//       );
//     } else {
//       setVisibleExamMarks(null);
//     }
//   }, [semester, marks]);

//   return (
//     <>
//       <Dashboardfilter onSemesterChange={setSemester} />

//       <section className="mt-24 scale-125 absolute left-40 ml-40 flex flex-col justify-center items-center text-center">
//         <Academicschart examMarks={visibleExamMarks} />
//       </section>
//       <div className="text-center relative py-3" style={{ top: "60vh" }}>
//         <h3>Academics details</h3>
//         {visibleExamMarks ? (
//           <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
//             {visibleExamMarks.map((item) => (
//               <li key={`${item.semesterNumber}-${item.subjectCode}`}>
//                 <h4 style={{ fontWeight: "bold" }}>
//                   SEMESTER {item.semesterNumber}
//                 </h4>
//                 <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
//                   <li>
//                     <p style={{ fontSize: "1.2em", marginBottom: "0.5em" }}>
//                       {item.subjectName}:
//                     </p>
//                     <p style={{ fontSize: "1em", marginBottom: "0.2em" }}>
//                       Internal Marks: {item.internalMarks}
//                     </p>
//                     <p style={{ fontSize: "1em", marginBottom: "0.2em" }}>
//                       External Marks: {item.externalMarks != null? item.externalMarks : '-'}
//                     </p>
//                   </li>
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No data available</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Academicsdetails;
