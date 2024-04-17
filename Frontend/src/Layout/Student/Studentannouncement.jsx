import React, { useEffect, useState } from "react";
import axios from "axios";



const Studentannouncement = () => {
  const [announcements, setAnnouncements] = useState([]);

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [editedAnnouncement, setEditedAnnouncement] = useState(selectedAnnouncement);

  const [adminannoucements, setAnnouncement] = useState([]);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const getfile = async (title) => {
    console.log("Fetching file for announcement with title: ", title);
    try {
      let url = "http://127.0.0.1:8000/admin/fetchFile";
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          announcementTitle: title
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Extract the Blob data from the response
      let fileBlob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log(reader.result)
        setUploadedImage(reader.result);
        setUploadedFileName(fileBlob.name);
      };
      reader.readAsDataURL(fileBlob);
    } catch (e) {
      console.log("Error fetching the announcement's previously uploaded file: ", e);
    }
  }

  const fetchAnnouncements = async () => {
    try {
      const customHeaders = new Headers();
      customHeaders.append('Content-Type', 'application/json');
      customHeaders.append('Accept-Encoding', 'gzip, deflate, br');

      const response = await axios.get('http://localhost:8000/admin/fetchAllAnnouncements', { headers: customHeaders });

      console.log(response.data)
      console.log(response.headers)
      setAnnouncement(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

 

  useEffect(() => {
    if (uploadedImage) {
      const pdfWindow = window.open("", "_blank");
      pdfWindow.document.write(
        `<html><head><title>${uploadedFileName}</title></head><body>`
      );
      pdfWindow.document.write(
        `<embed width="100%" height="100%" src="${uploadedImage}" target="_blank" type="application/pdf">`
      );
      pdfWindow.document.write("</body></html>");

      // Clear the uploaded file state when the window is closed
      pdfWindow.addEventListener("beforeunload", () => {
        setUploadedImage(null);
        setUploadedFileName("");
        setUploadedFile(null);
      });
    }
  }, [uploadedImage, uploadedFileName]);

  const handlePreview = async (title, name) => {
    try {
      await getfile(title);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return (
    <section className="left-50 top-33 absolute">
      <div className="absolute flex left-10 top-5 w-auto">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Announcements
        </button>
        &nbsp;&nbsp;
        <button className="bg-sky-500 rounded-md w-auto text-lg" onClick={fetchAnnouncements}>
          <i class="fa-solid fa-arrows-rotate" />
        </button>
      </div>

      <div className="border-1 h-auto rounded-xl border-black flex justify-center items-center mt-20 m-10 -mb-10">
        <div className="p-10">
          <div className="overflow-hidden block">
            <div className="flex w-70vw h-40vh mb-4 border-2 rounded-tl-3xl rounded-tr-3xl overflow-auto border-sky-500 rounded-xl">
              <table className="w-full h-10 text-center rounded-md border-collapse">
                <thead>
                  <tr>
                    <td className="font-bold w-20 border bg-blue-950 text-white px-2 py-1">Broadcast</td>
                    <td className="font-bold border bg-blue-950 text-white px-4 py-1 text-center">
                      Subject
                    </td>
                    <td className="font-bold w-20 border bg-blue-950 text-white px-4 py-2 text-center">
                      View
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {adminannoucements.length === 0 ? (
                    <tr>
                      <td className="border border-black px-4 py-2" colSpan="6" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        No announcements to be viewed
                      </td>
                    </tr>
                  ) : (
                    adminannoucements.map((announcement, index) => (
                      <tr key={index}>
                        <td className="border border-black px-4 py-2">{index + 1}</td>
                        <td className="border border-black px-4 py-2">
                          {announcement.announcementTitle}
                        </td>
                        <td className="border border-black px-4 py-2 w-10">
                          <button
                            className="w-20 rounded-md bg-blue-500 text-lg"
                            id="viewButton"
                            onClick={() => { handlePreview(announcement.announcementTitle, announcement.uploadedFileName) }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studentannouncement;