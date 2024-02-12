import React, { useState } from "react";
import upload from "../../Components/Assets/icons/upload.png";
import Announcementhomepage from "./Announcementhomepage";

const EditAnnouncement = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [showeditAnnouncement, setShoweditAnnouncement] = useState(false);
  const [showsave, setShowsave] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOptions = (component) => {
    if (component === "Announcementhomepage") {
      // setShoweditAnnouncement(true);
      window.close();
    }
  };

  const handlePreview = () => {
    const pdfWindow = window.open("");
    pdfWindow.document.write(
      "<html><head><title>PDF Preview</title></head><body>"
    );
    pdfWindow.document.write(
      `<embed width="100%" height="100%" src="${uploadedImage}" type="application/pdf">`
    );
    pdfWindow.document.write("</body></html>");
  };

  return (
    <section className="relative top-0 inset-0">
      {!showsave && (
        <div className="relative flex left-2 top-4 w-auto mb-5">
          <button className="bg-sky-500 rounded-md w-auto text-lg">
            Edit Announcements
          </button>
        </div>
      )}
      {!showsave && (
        <div className="border-2 w-65vw md:h-3/4 rounded-md border-sky-500 flex flex-col justify-center items-center mt-2 sm:h-auto sm:mt-10 m-5">
          <div className="p-5 gap-4 grid-flow-row grid w-full md:w-3/4 lg:w-1/2">
            <form className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start">
                <label htmlFor="announcementTitle" className="text-lg">
                  Announcement Title:
                  <input
                    type="text"
                    id="announcementTitle"
                    className="px-4 border-1 border-black w-full h-10 rounded-md mt-1"
                    placeholder="Enter the Announcement"
                  />
                </label>

                <label htmlFor="scheduleDate" className="text-lg">
                  Schedule date:
                  <input
                    type="text"
                    id="scheduleDate"
                    pattern="[0-9]{2}"
                    className="border-1 px-4 border-black w-full h-10 rounded-md mt-1"
                    placeholder="Enter the Schedule date"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start mt-4">
                <label htmlFor="uploadedFileName" className="text-lg">
                  Uploaded File:
                  <input
                    type="text"
                    id="uploadedFileName"
                    className="border-1 px-4 w-full h-10 rounded-md mt-1"
                    value={uploadedFileName}
                    readOnly
                  />
                </label>

                <label htmlFor="scheduleTime" className="text-lg">
                  Schedule Time:
                  <input
                    type="text"
                    id="scheduleTime"
                    className="border-1 px-4 border-black w-full h-10 rounded-md mt-1"
                    placeholder="Enter the Schedule Time"
                  />
                </label>
              </div>

              <div className="flex justify-center items-center mt-4">
                <label htmlFor="fileInput" className="text-lg">
                  Upload PDF File:
                </label>
                <img
                  width="45"
                  height="45"
                  src={uploadedImage || upload}
                  alt="Uploaded File"
                  onClick={() => document.getElementById("fileInput").click()}
                  style={{ cursor: "pointer" }}
                />
                <input
                  type="file"
                  id="fileInput"
                  className="border-1 px-4 w-full h-10 rounded-md mt-1"
                  placeholder="Upload the file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>

              <div className="flex justify-center items-center mt-4 space-x-4">
                <button
                  className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg"
                  onClick={() => handleOptions("Announcementhomepage")}
                >
                  Save Changes
                </button>
                <button
                  onClick={handlePreview}
                  className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg"
                >
                  Preview
                </button>
              </div>
            </form>
            {showeditAnnouncement && <Announcementhomepage />}
          </div>
        </div>
      )}
    </section>
  );
};

export default EditAnnouncement;
