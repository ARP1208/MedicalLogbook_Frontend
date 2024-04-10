import React, { useEffect, useState } from "react";
import EditDepartmentalAnn from "./EditDepartmentalAnn";
import axios from "axios";

const DepartmentalAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showEditDepartmentalAnn, setShowEditDepartmentalAnn] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [adminannoucements, setAnnouncement] = useState([]);
  const [error, setError] = useState(null);
  const [isAnnouncemtEditable, setIsAnnouncementEditable] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const customHeaders = new Headers();
      customHeaders.append("Content-Type", "application/json");
      customHeaders.append("Accept-Encoding", "gzip, deflate, br");

      const response = await axios.get(
        "http://localhost:8000/admin/fetchAllAnnouncements",
        {
          headers: customHeaders,
        }
      );

      setAnnouncement(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleDelete = async (announcementTitle) => {
    try {
      await axios.delete("http://127.0.0.1:8000/admin/DeleteAnnouncement", {
        headers: {
          "Content-Type": "application/json",
        },
        data: { announcementTitle: announcementTitle },
      });

      fetchAnnouncements(); // Fetch the updated list of announcements
    } catch (error) {
      console.error("Error deleting announcement:", error.message);
    }
  };

  const handleEditDepartmentalAnn = (selectedAnnouncement) => {
    setSelectedAnnouncement(selectedAnnouncement);
    setIsAnnouncementEditable(true);
    setShowEditDepartmentalAnn(true);
  };

  const handleShowAnnouncement = (selectedAnnouncement) => {
    console.log("Show announcement:", selectedAnnouncement);
    setSelectedAnnouncement(selectedAnnouncement);
    setIsAnnouncementEditable(false);
    setShowEditDepartmentalAnn(true);
  };

  return (
    <section className="left-50 top-33 absolute">
      <div className="relative flex left-12 top-7 w-auto z-10">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Announcements
        </button>
      </div>
      {showEditDepartmentalAnn ? (
        <EditDepartmentalAnn
          selectedAnnouncement={selectedAnnouncement}
          isEditable={isAnnouncemtEditable}
          onSave={() => {
            // setIsAnnouncementEditable(null);
            setShowEditDepartmentalAnn(false);
          }}
        />
      ) : (
        <>
          <div className="border-1 h-auto rounded-md border-black flex justify-center items-center mt-5 mx-12">
            <div className="p-10">
              <div className="overflow-hidden block">
                <div className="flex w-70vw h-50vh mb-4 border-3 rounded-tl-3xl rounded-tr-3xl overflow-auto  border-sky-500 rounded-xl">
                  <table className="w-full h-10 text-center rounded-md border-collapse">
                    <thead>
                      <tr>
                        <th className="border bg-blue-950  text-white px-4 py-2 w-12">
                          Sl. No.
                        </th>
                        <th className="border col-span-3 bg-blue-950 text-white px-4 py-2">
                          Events
                        </th>
                        <th className="border bg-blue-950 text-white px-4 py-2">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminannoucements.length === 0 ? (
                        <tr>
                          <td
                            className="border border-black px-4 py-2"
                            colSpan="6"
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            No announcements to be viewed
                          </td>
                        </tr>
                      ) : (
                        adminannoucements.map((announcement, index) => {
                          const isInFilteredAnnouncements =
                            announcement.department !== undefined;
                          return (
                            <tr key={index}>
                              <td className="border border-black px-4 py-2">
                                {index + 1}
                              </td>
                              <td className="border border-black px-4 py-2">
                                {announcement.announcementTitle}
                              </td>
                              <td className="border border-black px-4 py-2">
                                {isInFilteredAnnouncements ? (
                                  <>
                                    <button
                                      className="w-20 rounded-md bg-blue-500 text-lg mr-2"
                                      onClick={() =>
                                        handleEditDepartmentalAnn(announcement)
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="w-20 rounded-md bg-blue-500 text-lg"
                                      onClick={() =>
                                        handleDelete(
                                          announcement.announcementTitle
                                        )
                                      }
                                    >
                                      Delete
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="w-40 rounded-md bg-blue-500 text-lg"
                                    onClick={() =>
                                      handleShowAnnouncement(announcement)
                                    }
                                  >
                                    Show
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default DepartmentalAnnouncement;
