import React from 'react';

const subjectOptions = [
  { value: 'subject1', label: 'Subject 1' },
  { value: 'subject2', label: 'Subject 2' },
  { value: 'subject3', label: 'Subject 3' },
  { value: 'subject4', label: 'Subject 4' },
  { value: 'subject5', label: 'Subject 5' },
];

const generateRegNumbers = (count) => {
  const regNumbers = [];
  for (let i = 1; i <= count; i++) {
    regNumbers.push(String(i).padStart(6, '0'));
  }
  return regNumbers;
};

const EditGradeSheetMarks = () => {
  const regNumbers = generateRegNumbers(1);
  const [selectedSubjects, setSelectedSubjects] = React.useState(subjectOptions.map(subject => ({ ...subject, marks: '' })));

  return (
    <section className='overflow-hidden top-20 left-25'>
      <div className='flex relative left-7 top-7 w-auto mb-10'>
        <button className='bg-sky-500 rounded-md w-auto text-lg'>Edit Marks</button>
      </div>
      <div className='border-2 px-10 pb-3 h-auto w-auto overflow-hidden rounded-md border-sky-500 flex flex-col justify-center items-center m-10'>
        <div className='flex gap-7 relative top-0 w-auto mt-4'>

          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 text-start w-auto mt-4">

            <label htmlFor="name" className="lg:text-lg md:text-base sm:text-sm font-medium">
              Name:{" "}
              <input
                type="text"
                id="name"
                className="px-4 border-2 w-full h-10 rounded-md"
                required
                value={""}
                readOnly
              />
            </label>

            <label htmlFor="regno" className="lg:text-lg md:text-base sm:text-sm font-medium">
              Registration Number:{" "}
              <input
                type="text"
                id="regno"
                pattern="[0-9]{2}"
                className="border-2 px-4 w-full h-10 rounded-md"
                required
                value={""}
                readOnly
              />
            </label>

            <label htmlFor="academicyear" className="lg:text-lg md:text-base sm:text-sm font-medium">
              Academic Year:{" "}
              <input
                type="text"
                id="academicyear"
                className="border-2 px-4 w-full h-10 rounded-md"
                readOnly // Make the input read-only to prevent manual changes
                value={""}
              />
            </label>

            <label htmlFor="course" className="lg:text-lg md:text-base sm:text-sm font-medium">
              Course:{" "}
              <input
                type="text"
                id="course"
                className="border-2 px-4 w-full h-10 rounded-md"
                required
                value={""}
                readOnly
              />
            </label>

            <label htmlFor="section" className="lg:text-lg md:text-base sm:text-sm font-medium">
              Section:{" "}
              <input
                type="text"
                id="section"
                className="border-2 px-4  w-full h-10 rounded-md"
                required
                value={""}
                readOnly
              />
            </label>
          </div>
        </div>

        <div className='overflow-hidden block'>
          <form action="#">
            <div className="flex w-60vw h-auto border-1 mt-5 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950 text-white px-4 py-2">SL No</th>
                    <th className="border bg-blue-950 text-white px-4 py-2">Reg Number</th>
                    <th className="border bg-blue-950 text-white px-4 py-2">Student Name</th>
                    {selectedSubjects.map((subject, index) => (
                      <th key={index} className="border bg-blue-950 text-white px-4 py-2">{subject.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {regNumbers.map((regNumber, index) => (
                    <tr key={index}>
                      <td className="border border-black px-4 py-2">{index + 1}</td>
                      <td className="border border-black px-4 py-2">{regNumber}</td>
                      <td className="border border-black px-4 py-2">Student Name {index + 1}</td>
                      {selectedSubjects.map((_, subjectIndex) => (
                        <td key={subjectIndex} className="border border-black ">
                          <input type="number" max="100" placeholder='marks' className='h-full w-full placeholder:text-center text-center' />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center mt-2">
              <button className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditGradeSheetMarks;