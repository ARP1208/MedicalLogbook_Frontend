import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextareaAutosize from "react-textarea-autosize";

const Generateteam = () => {
  return [
    { value: "Student1", label: "Student1  -  REG001" },
    { value: "Student2", label: "Student2  -  REG002" },
    { value: "Student3", label: "Student3  -  REG003" },
    { value: "Student4", label: "Student4  -  REG004" },
    { value: "Student5", label: "Student5  -  REG005" },
    { value: "Student6", label: "Student6  -  REG006" },
    { value: "Student7", label: "Student7  -  REG007" },
    { value: "Student8", label: "Student8  -  REG008" },
    { value: "Student9", label: "Student9  -  REG009" },
    { value: "Student10", label: "Student10  -  REG010" },
    { value: "Student11", label: "Student11  -  REG011" },
    { value: "Student12", label: "Student12  -  REG012" }
  ];
};

const Studenttaskcheckin = () => {
  const [selectedstudent, setselectedstudent] = useState({
    value: "Team Member/s",
    label: "Team Member/s",
  });

  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setUploadedFile(file);
      setUploadedFileName(file.name); // Set the uploaded file name
      console.log("File uploaded");
    }
  };

  return (
    <section className="left-4 absolute">
      <div className="absolute flex left-10 top-4 w-auto">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          View Task
          
        </button>
      </div>

      <div className="border-1 h-70vh rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10 -pb-5">
        <div className="p-10 ">
          <div className="overflow-hidden block text-4">
            <div className="justify-center items-center grid grid-cols-2 pb-4">
              <h5>
                Start Date:<span className="pl-3">13/03/2024</span>
              </h5>
              <h5>
                End Date:
                <span className="pl-3">15/03/2024</span>
              </h5>
            </div>
            <div className="w-60vw h-51vh border-2 border-sky-500 rounded-xl">
              <div className="flex flex-row justify-center mt-5">
                <h5 className="font-bold pr-1">Task Id:</h5>
                <h5 className="font-bold pr-7">T001</h5>
                <h5 className="font-bold pl-7 pr-1">Task Name:</h5>
                <h5 className="font-bold ">Task1</h5>
              </div>

              <div className="p-7">
                <div className="py-2 w-55vw pl-2">
                  <Select
                    value={selectedstudent}
                    onChange={setselectedstudent}
                    options={Generateteam()}
                    required
                  />
                </div>
                <label className="block text-start text-gray-700 font-bold mb-2">
                  Task Description
                </label>
                <TextareaAutosize
                  id="Description"
                  className="border rounded py-2 w-55vw text-gray-700 leading-tight focus:outline-none min-h-10 "
                />

                <label className="block text-start text-gray-700 font-bold mb-2">
                  Student Description
                </label>
                <TextareaAutosize
                  id="Remarks"
                  className="border rounded py-2 w-55vw text-gray-700 leading-tight focus:outline-none min-h-10 "
                />
                <div className="flex flex-row gap-5 py-3 justify-center">
                  <p className="mt-2">{uploadedFileName}</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileUpload"
                    style={{ display: "none" }} // Hide the input
                  />
                  <button
                    onClick={() =>
                      document.getElementById("fileUpload").click()
                    }
                    className="bg-blue-500 rounded-md w-auto h-auto px-4 py-2 text-white cursor-pointer"
                  >
                    Upload File
                  </button>
                  <button className="bg-blue-500 rounded-md w-auto h-auto px-4 py-2 text-white">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studenttaskcheckin;
