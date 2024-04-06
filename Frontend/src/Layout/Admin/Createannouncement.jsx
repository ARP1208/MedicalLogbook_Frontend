import React, { useState } from "react";
import axios from "axios";

const Createannouncement = () => {
  const [adminData, setAdminData] = useState({
    announcementTitle: "",
    scheduleDate: "",
    uploadedFileName: "",
    scheduleTime: "",
  })

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);


  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setUploadedFile(file);
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    } z
  };

  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreview = (pdfName) => {

    const pdfWindow = window.open("", "_blank");
    if (uploadedImage) {
      // const pdfWindow = window.open("", "_blank");
      pdfWindow.document.write(
        `<html><head><title>${pdfName}</title></head><body>`
      );
      pdfWindow.document.write(
        `<embed width="100%" height="100%" src="${uploadedImage}" target = 'blank' type="application/pdf">`
      );
      pdfWindow.document.write("</body></html>");
    } else {
      alert("Please upload a PDF file first.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    //   console.log('handlesubmit')
    let formData = new FormData();
    //   let date = new Date(adminData.scheduleDate)
    //   // const formattedDate = date.toLocaleDateString('en-UK');
    //   console.log(formattedDate);

    try {
      alert("Data saved");
      console.log(uploadedFileName);
      formData.append("announcementTitle", adminData.announcementTitle);
      formData.append("scheduleDate", adminData.scheduleDate);
      formData.append("uploadedFileName", uploadedFile);
      formData.append("uploadedFileName", uploadedFileName);
      formData.append("scheduleTime", adminData.scheduleTime);
      console.log(formData);

      const announcementResponse = await axios.post(
        "http://localhost:8000/admin/announcement",
        formData,
        // {
        //   ...adminData,
        //   uploadedFileName: uploadedFile, // Add uploadedFileName to the payload
        // },
        {
          headers: {
            "Content-Type": 'multipart/form-data',
          },
        }
      );
      console.log(announcementResponse);

      // Reset the adminData state after the request is processed
      setAdminData({
        announcementTitle: "",
        scheduleDate: "",
        uploadedFileName: "",
        scheduleTime: "",
      });

      setUploadedFileName("");
      setUploadedFile(null);
      setUploadedImage(null);

      // if (announcementResponse.status >= 200 && announcementResponse.status < 300) {
      //   console.log(announcementResponse.data);
      //   // Successful response handling
      // } else {
      //   // Handle errors from the backend
      //   const responseData = announcementResponse.data;
      //   console.error("Backend Error:", responseData.error || "Unknown error");
      //   // Assuming setErrors is a state updater function
      //   setErrors(responseData.errors || {});
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="relative top-0 m-0 left-40 overflow-hidden">
      <div className="relative flex left-12 top-7 w-auto mb-10 z-10">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Create Announcement
        </button>
      </div>

      <div className="border-2 md:h-3/4 w-70vw rounded-md border-sky-500 relative flex flex-col justify-center items-center m-5 sm:mt-10 sm:h-auto md:mt-20 z-10">
        <div className="p-5 gap-2 grid-flow-row grid w-full md:w-3/4 lg:w-1/2 mx-auto">
          <form action="" className="relative" >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-start">
              <label htmlFor="announcementTitle" className="text-lg">
                Announcement Title :{" "}
                <input
                  type="text"
                  id="announcementTitle"
                  className="px-4 border-1 border-black w-full h-10 rounded-md mt-1"
                  name="announcementTitle"
                  value={adminData.announcementTitle}
                  onChange={handleChange}
                  required // Required validation added
                  maxLength="50" // Maximum length of 50 characters
                />
              </label>

              <label htmlFor="scheduleDate" className="text-lg">
                Schedule date :{" "}
                <input
                  type="date"
                  id="scheduleDate"
                  className="border-1 px-4 border-black w-full h-10 rounded-md mt-1"
                  name="scheduleDate"
                  value={adminData.scheduleDate}
                  onChange={handleChange}
                  placeholder="Enter the Schedule date "
                  required // Required validation added
                  min={new Date().toISOString().split("T")[0]} // Minimum value is today's date
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 text-start w-auto mt-4">
              <label htmlFor="uploadedFileName" className="text-lg">
                Uploaded File:{" "}
                <input
                  type="string"
                  id="uploadedFileName"
                  className="border-1 px-4 w-full h-10 rounded-md mt-1"
                  name="uploadedFileName"
                  onChange={handleChange}
                  value={uploadedFileName}
                  // readOnly // Make the input read-only to prevent manual changes
                  required // Required validation added
                />
              </label>

              <label htmlFor="scheduleTime" className="text-lg">
                Schedule Time :{" "}
                <input
                  type="time"
                  id="scheduleTime"
                  className="border-1 px-4 border-black w-full h-10 rounded-md mt-1"
                  name="scheduleTime"
                  value={adminData.scheduleTime}
                  onChange={handleChange}
                  placeholder="Enter the Schedule Time"
                  required // Required validation added
                />
              </label>
            </div>

            <div className="flex justify-center items-center mt-4">
              <label htmlFor="fileInput" className="text-lg">
                Upload PDF File :{" "}
              </label>
              <i class="fa-solid fa-upload fa-lg pl-2"
                onClick={() => document.getElementById("fileInput").click()}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                id="fileInput"
                className="border-2 px-4 w-full h-10 rounded-md mt-1"
                placeholder="Upload the file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                required // Required validation added
              />
            </div>

            <div className="flex justify-center items-center mt-4 space-x-4">
              <button className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg"
                type="submit"
                onClick={handleSubmit}>
                Create
              </button>

            </div>
          </form>

          <button
            onClick={() => handlePreview(uploadedFileName)}
            className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg"
          >
            Preview
          </button>

        </div>
      </div>
    </section>
  );
};

export default Createannouncement;