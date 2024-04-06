import React, { useState } from "react";
import Attemptassessment from "./Attemptassessment";

const Assessmentstudent = () => {
 
  const [showassessment, setshowassessment] = useState(false);
  const [showattempt,setshowattempt] = useState(false);
  const handleassessment = (component) => {
    if (component === "Attempt") {
      setshowassessment(true);
      setshowattempt(false);
    } 
  };
 
  return (
    <section className="left-50 absolute">
    { showassessment && <Attemptassessment/>}
    {!showassessment && (
      <>
          <div className="absolute flex left-10 top-4">
            <button className="bg-sky-500 rounded-md w-fit text-lg">
              {" "}
              Assessments
            </button>
          </div>

          <div className="border-1 h-70vh rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10 -pb-5">
            <div className="p-10 ">
              <div className="overflow-hidden block text-4">
                
                <div className="flex w-70vw h-60vh border-2 rounded-tl-3xl rounded-tr-3xl overflow-auto border-sky-500 rounded-xl">
                  <table className="w-full h-10 text-center rounded-md border-collapse">
                    <thead>
                      <tr>
                        <th className="border bg-blue-950 text-white px-3 py-2">
                          Assessment Id
                        </th>
                        <th className="col-span-4 bg-blue-950 border-b border-r-0 text-white px-4 py-2">
                          Assessment Name
                        </th>
                        <th className="bg-blue-950 border-b  border-r-0 px-4 py-2"></th>
                        <th className="bg-blue-950 border-b border-r-0 px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="w-20 border border-black px-1 py-1">
                          1
                        </td>
                        <td className="border-b border-black border-r-0 px-4 py-1 text-center">
                        Assessment 1
                         
                        </td>
                        <td className="w-20 border-b border-black border-r-0  px-4 py-1 text-center">
                         
                        </td>
                        <td className="w-20 border-b border-black border-r-0  px-4 py-1 text-center"> <button
                            className="w-auto h-10 rounded-xl bg-blue-500 text-lg py-1 px-3"
                            onClick={() => handleassessment("Attempt")}
                          >
                            Attempt
                          </button></td>
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
  );
};

export default Assessmentstudent;
