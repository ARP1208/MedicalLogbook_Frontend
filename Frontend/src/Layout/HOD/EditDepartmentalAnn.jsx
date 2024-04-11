import React, { useState, useEffect } from "react";

const EditDepartmentalAnn = ({ selectedAnnouncement, isEditable }) => {
  const [editedAnnouncement, setEditedAnnouncement] =
    useState(selectedAnnouncement);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(
    selectedAnnouncement.uploadedFileName
  );
  const [fileblob, setFileBlob] = useState(null);

  const [showsave, setShowsave] = useState(false);

  const getfile = async () => {
    try {
      let url = "http://127.0.0.1:8000/admin/fetchFile";
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          announcementTitle: selectedAnnouncement.announcementTitle,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let fileBlob = await response.blob();
      setFileBlob(fileBlob);

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setEditedAnnouncement({
          ...editedAnnouncement,
          uploadedFile: fileBlob,
          uploadedFileName: fileBlob.name,
        });
      };
      reader.readAsDataURL(fileBlob);
    } catch (e) {
      console.log(
        "Error fetching the announcement's previously uploaded file: ",
        e
      );
    }
  };

  useEffect(() => {
    getfile();
    setEditedAnnouncement(selectedAnnouncement);
  }, [selectedAnnouncement]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setUploadedFileName(file.name);
        setEditedAnnouncement({
          ...editedAnnouncement,
          uploadedFile: file,
          uploadedFileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
    setUploadedFileName(file.name);
    setUploadedImage(file);
  };

  const handleSaveChanges = async () => {
    let formData = new FormData();

    try {
      let formData = new FormData();
      formData.append("a_id", editedAnnouncement._id.toString());
      formData.append(
        "announcementTitle",
        editedAnnouncement.announcementTitle
      );
      formData.append("scheduleDate", editedAnnouncement.scheduleDate);

      if (uploadedImage instanceof File) {
        formData.append("uploadedFileName", uploadedImage);
      } else {
        const fileName = uploadedFileName;
        const lastModified = Date.now();
        const fileType = fileblob.type;

        const file = new File([fileblob], fileName, {
          type: fileType,
          lastModified,
        });

        console.log(file);
        setUploadedImage(file);
        setEditedAnnouncement({
          ...editedAnnouncement,
          uploadedFile: file,
        });
        formData.append("uploadedFileName", file);
      }

      formData.append("uploadedFileName", uploadedFileName);
      formData.append("scheduleTime", editedAnnouncement.scheduleTime);
      formData.append("department", editedAnnouncement.department);

      let response = await fetch(
        `http://127.0.0.1:8000/admin/UpdateAnnouncement`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Successfully Updated!");
        onSave();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreview = (name) => {
    console.log(name);
    const pdfWindow = window.open("", "_blank");
    if (uploadedImage) {
      pdfWindow.document.write(
        `<html><head><title>${name}</title></head><body>`
      );
      pdfWindow.document.write(
        `<embed width="100%" height="100%" src="${uploadedImage}" target = 'blank' type="application/pdf">`
      );
      pdfWindow.document.write("</body></html>");
    } else {
      alert("Please upload a PDF file first.");
    }
  };

  const goBack = () => {
    window.close();
  };

  return (
    <section className="relative top-0 inset-0">
      <div className="relative flex left-12 top-7 w-auto mb-5">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Edit Announcements
        </button>
      </div>
      <div className="border-2 w-65vw md:h-3/4 rounded-md border-sky-500 flex flex-col justify-center items-center sm:h-auto sm:mt-10 m-5">
        <div className="p-5 gap-4 grid-flow-row grid w-full md:w-3/4 lg:w-1/2">
          <form className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start">
              <label htmlFor="announcementTitle" className="text-lg">
                Announcement Title:
                <input
                  type="text"
                  id="announcementTitle"
                  value={editedAnnouncement.announcementTitle}
                  onChange={(e) =>
                    setEditedAnnouncement({
                      ...editedAnnouncement,
                      announcementTitle: e.target.value,
                    })
                  }
                  className="px-4 border-1 border-black w-full h-10 rounded-md mt-1"
                  placeholder="Enter the Announcement"
                  disabled={!isEditable}
                />
              </label>

              <label htmlFor="scheduleDate" className="text-lg">
                Schedule date:
                <input
                  type="date"
                  id="scheduleDate"
                  value={editedAnnouncement.scheduleDate}
                  onChange={(e) =>
                    setEditedAnnouncement({
                      ...editedAnnouncement,
                      scheduleDate: e.target.value,
                    })
                  }
                  pattern="[0-9]{2}"
                  className="border-1 px-4 border-black w-full h-10 rounded-md mt-1"
                  placeholder="Enter the Schedule date"
                  disabled={!isEditable}
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
                  disabled={!isEditable}
                />
              </label>
              {editedAnnouncement.department !== undefined && (
                <label htmlFor="dept" className="text-lg">
                  Department:{" "}
                  <input
                    type="text"
                    id="dept"
                    className="border-1 px-4 w-full h-10 rounded-md mt-1"
                    name="department"
                    value={editedAnnouncement.department}
                    disabled={!isEditable}
                    onChange={(e) =>
                      setEditedAnnouncement({
                        ...editedAnnouncement,
                        department: e.target.value,
                      })
                    }
                  />
                </label>
              )}

              <label htmlFor="scheduleTime" className="text-lg">
                Schedule Time :{" "}
                <input
                  type="time"
                  id="scheduleTime"
                  onChange={(e) =>
                    setEditedAnnouncement({
                      ...editedAnnouncement,
                      scheduleTime: e.target.value,
                    })
                  }
                  value={editedAnnouncement.scheduleTime}
                  className="border-1 px-4 border-black w-full h-10 rounded-md mt-1"
                  name="scheduleTime"
                  placeholder="Enter the Schedule Time"
                  //  validation added
                  disabled={!isEditable}
                />
              </label>

              <div className="flex justify-center items-center mt-4">
                <label htmlFor="fileInput" className="text-lg">
                  Upload PDF File :{" "}
                </label>
                <i
                  class="fa-solid fa-upload fa-lg pl-2"
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
                  //  validation added
                  disabled={!isEditable}
                />
              </div>
            </div>

            {isEditable ? (
              <div className="flex justify-center items-center mt-4 space-x-4">
                <button
                  className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center mt-4 space-x-4">
                <button
                  className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg"
                  onClick={goBack()}
                >
                  Go Back
                </button>
              </div>
            )}
          </form>

          <button
            className="bg-blue-500 rounded-md w-auto h-auto text-white text-lg"
            onClick={() => {
              handlePreview(selectedAnnouncement.uploadedFileName);
            }}
          >
            Preview
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditDepartmentalAnn;
