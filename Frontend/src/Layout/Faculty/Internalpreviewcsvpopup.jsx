import React from "react";

const Internalpreviewcsvpopup = ({ open, onClose, csvData }) => {
  // Check if csvData exists and has at least one entry
  if (!csvData || csvData.length === 0) {
    return null; // Render nothing if csvData is empty or undefined
  }

  // Extract headers from the first row of csvData
  const headers = Object.keys(csvData[0]);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/50" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-6 w-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
        <div className="lg:w-70vw md:w-30vw sm:20vw lg:h-60vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
          <div className="text-2xl font-black text-blue-950 justify-self-center m-7">
            Preview
          </div>
          <table className="w-65vw mx-10">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="border bg-blue-950 text-white px-4 py-2"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((rowData, index) => (
                <tr key={index}>
                  {headers.map((header, index) => (
                    <td key={index} className="border border-black px-4 py-2">
                      {rowData[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="py-3 pb-3">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internalpreviewcsvpopup;