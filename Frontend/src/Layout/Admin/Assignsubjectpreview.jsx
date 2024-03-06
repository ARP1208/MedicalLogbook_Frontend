import React from 'react';

export default function Assignsubjectpreview({ open, onClose, csvData }) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/50" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
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
          <table className="w-50vw mx-10">
            <thead>
              <tr>
                <th className='border bg-blue-950 text-white px-4 py-2'>Academic year</th>
                <th className='border bg-blue-950 text-white px-4 py-2'>Program</th>
                <th className='border bg-blue-950 text-white px-4 py-2'>Semester</th>
                <th className='border bg-blue-950 text-white px-4 py-2'>Section</th>
                <th className='border bg-blue-950 text-white px-4 py-2'>Roll number</th>
                <th className='border bg-blue-950 text-white px-4 py-2'>Name</th>
                <th className='border bg-blue-950 text-white px-4 py-2'>Subject Details</th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((data, index) => (
                <tr key={index}>
                  <td className='border border-black px-4 py-2'>{data['Academic year']}</td>
                  <td className='border border-black px-4 py-2'>{data['Program']}</td>
                  <td className='border border-black px-4 py-2'>{data['Semester']}</td>
                  <td className='border border-black px-4 py-2'>{data['Section']}</td>
                  <td className='border border-black px-4 py-2'>{data['Roll number']}</td>
                  <td className='border border-black px-4 py-2'>{data['Name']}</td>
                  <td className='border border-black px-4 py-2'>
                    {/* Splitting and rendering multiple subject details */}
                    {data['Subject Details'].split(',').map((detail, index) => (
                      <div key={index}>{detail}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='py-3 pb-3'> 
          <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline"
            >
              Save CSV
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}
