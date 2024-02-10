import React from "react";

const Facultyannouncement = () => {
  return (
    <section className="left-50 top-33 absolute">
      <div className="absolute flex left-5 top-5 w-auto">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Announcements
        </button>
      </div>

      <div className="border-1 h-auto rounded-xl border-black flex justify-center items-center mt-20 m-10 -mb-10">
        <div className="p-10">
          <div className="overflow-hidden block">
            <div className="flex w-80vw h-40vh mb-4 border-2 rounded-tl-3xl rounded-tr-3xl overflow-auto border-sky-500 rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950 text-white px-1 py-2">
                      Event
                    </th>
                    <th className="border col-span-4 bg-blue-950 text-white px-4 py-2">
                      Subject
                    </th>
                    <th className="border bg-blue-950 text-white px-4 py-2">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-20 border border-black px-1 py-1">Broadcast</td>
                    <td className="border border-black px-4 py-1 text-center">
                      Subject
                    </td>
                    <td className="w-20 border border-black px-4 py-1 text-center">
                      <button
                        className="w-20 h-10 rounded-xl bg-blue-500 text-lg p-1">
                        View
                      </button>
                      </td>
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

export default Facultyannouncement;
