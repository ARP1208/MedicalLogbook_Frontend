import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Internalmarkscsvpopup from './Internalmarkscsvpopup';
import Internalpreviewcsvpopup from './Internalpreviewcsvpopup';
import csvtojson from "csvtojson"; 

const GenrateInternalMarks = ({ subjectname, subcode, examination, max_marks }) => {
    const subjectOptions = [
      { value: "examination", label: "examination" },
      // Add more options if needed
    ];
    const [csvData, setCsvData] = useState([]);
  const [openCsvPopup, setOpenCsvPopup] = useState(false);
  const [openPreviewPopup, setOpenPreviewPopup] = useState(false);
  
    const initializeSelectedSubjects = (count, subjectCount) => {
      const subjects = [];
      for (let i = 0; i < count; i++) {
        const marks = {};
        for (let j = 0; j < subjectCount; j++) {
          marks[j] = ''; // Initialize marks for each subject
        }
        subjects.push({ marks });
      }
      return subjects;
    };

    const [selectedSubjects, setSelectedSubjects] = useState(
          initializeSelectedSubjects(6, subjectOptions.length)
        );
      
        const handleSubjectChange = (subjectIndex, studentIndex, newValue) => {
          setSelectedSubjects((prevSubjects) => {
            const updatedSubjects = [...prevSubjects];
            updatedSubjects[studentIndex] = {
              ...updatedSubjects[studentIndex],
              marks: {
                ...updatedSubjects[studentIndex].marks,
                [subjectIndex]: newValue,
              },
            };
            return updatedSubjects;
          });
        };
      
        const history = useNavigate();
        const uploadCSV = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target.result;
            parseCSVData(result);
          };
          reader.readAsText(file);
        };
      
        const parseCSVData = (csvData) => {
          const rows = csvData.split('\n').map(row => row.split(','));
      
          let index = -1;
          for (let i = 0; i < rows[0].length; i++) {
              if ( rows[0][i].match(examination) ) {
                break;
              } else {
              
                  index++;
                  console.log(index, "", rows[0][i])
              }
          }
      
          if (index === -1) {
              console.log("Column not found for", examination);
              return;
          } else {
              const newSelectedSubjects = [];
              for (let i = 1; i < rows.length; i++) {
                console.log("rows[i][index]",rows[i][index])
                  if (rows[i][index] !== undefined && rows[i][index] !== null) {
                    if(index === rows[0].length)
                    {
                      const marks = rows[i][index];
                      newSelectedSubjects.push({ marks });
      
                    }
                    
                    else
                    {
                      const marks = rows[i][index+1];
                      newSelectedSubjects.push({ marks });
                    }
                  }
              }
              console.log(newSelectedSubjects);
              setSelectedSubjects(newSelectedSubjects);
          }
      };
  

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const text = event.target.result;
      const parsedJsonArray = await csvtojson().fromString(text);
      console.log("Value are: ", parsedJsonArray); 
      setOpenCsvPopup(true);
      setCsvData(parsedJsonArray);
    };

    reader.readAsText(file);
  };

  const handlesaveclose = () => {
    setOpenCsvPopup(false);
  };

  const goToPreviousPage = () => {
    history('/Academicshomepage');
  };

  return (
    <section className="absolute overflow-hidden top-18 left-38 m-10">
      <div className="flex relative left-7 top-7 w-auto mb-10">
        <button className="bg-sky-500 rounded-md w-auto text-lg">Marks sheet</button>
      </div>
      <div className="border-2 px-10 py-4 h-auto h-60vh w-auto overflow-hidden rounded-md border-sky-500 flex flex-col justify-center items-center m-10">
        <div className="overflow-hidden block">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-10 text-balance">
            <h4>Subject: {subjectname}</h4>
            <h4>Subject code: {subcode}</h4>
            <h4>Max Marks: {max_marks}</h4>
          </div>
          <form action="#">
            <div className="flex w-60vw h-40vh border-1 mt-2 rounded-tl-3xl rounded-tr-3xl overflow-auto border-black rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-blue-950 text-white px-4 py-2">SL. No.</th>
                    <th className="border bg-blue-950 text-white px-4 py-2">Reg Number</th>
                    <th className="border bg-blue-950 text-white px-4 py-2">Student Name</th>
                    <th className="border bg-blue-950 text-white px-4 py-2">{examination}</th>
                  </tr>
                </thead>
                <tbody>
                {selectedSubjects.map((subject, studentIndex) => (
                    <tr key={studentIndex}>
                      <td className="border border-black px-4 py-2">{studentIndex + 1}</td>
                      <td className="border border-black px-4 py-2">Reg Number {studentIndex + 1}</td>
                      <td className="border border-black px-4 py-2">Student Name {studentIndex + 1}</td>
                      <td className="border border-black">
                        <input
                          type="number"
                          max="100"
                          placeholder="marks"
                          className="h-full w-full placeholder:text-center text-center"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-5 items-center mt-2">
              <button className="bg-blue-500 rounded-md w-20 h-auto text-white text-lg" onClick={goToPreviousPage}>
                Save
              </button>
              <div className="relative overflow-hidden">
                <button className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg cursor-pointer relative overflow-hidden">
                  Upload CSV
                  <input
                    type="file"
                    accept=".csv"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={handleFileChange}
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      <div style={{zIndex:9999}}>
      {openCsvPopup && (
        <Internalmarkscsvpopup open={openCsvPopup} onClose={handlesaveclose}>
          <div className="lg:w-50vw md:w-30vw sm:20vw lg:h-45vh md:60vh sm:70vh border-3 border-blue-500 rounded-lg overflow-auto">
            <div className="text-2xl font-black text-blue-950 justify-self-center m-20">
              Your csv has been Uploaded !!!
            </div>
            <h5>To view the more details, Please Click on preview</h5>
            <div className="flex gap-3 justify-center items-center py-2">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline"
                onClick={() => setOpenPreviewPopup(true)}
              >
                Preview
              </button>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 w-auto rounded focus:outline-none focus:shadow-outline"
                onClick={handlesaveclose}
              >
                Save
              </button>
            </div>
          </div>
        </Internalmarkscsvpopup>
      )}
     {openPreviewPopup && csvData.length > 0 && (
  <Internalpreviewcsvpopup
    open={openPreviewPopup}
    onClose={() => setOpenPreviewPopup(false)}
    csvData={csvData}
  />
)}
</div>
</div>
    </section>
  );
};

export default GenrateInternalMarks;