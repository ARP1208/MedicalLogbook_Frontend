import React, { useEffect, useState } from "react";
import EditDepartmentalAnn from "./EditDepartmentalAnn";
import axios from "axios";

const DepartmentalAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([
    // Your initial announcements data
  ]);
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is active
  const [showEditDepartmentalAnn, setShowEditDepartmentalAnn] = useState(false);
  const [showAnnouncementButton, setShowAnnouncementButton] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [adminannoucements, setAnnouncement] = useState([]);
  const [error, setError] = useState(null); // State to hold error information

  const fetchAnnouncements = async () => {
    try {
      const customHeaders = new Headers();
      customHeaders.append('Content-Type', 'application/json');
      customHeaders.append('Accept-Encoding', 'gzip, deflate, br');

      const response = await axios.get('http://localhost:8000/admin/fetchAllAnnouncements',
        {
          headers: customHeaders
        });

      console.log(response.data)
      console.log(response.headers)
      setAnnouncement(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => { // Fetch announcements when the component mounts
    fetchAnnouncements();
  }, []);


  const handleDelete = (announcementTitle) => {
    console.log(announcementTitle);
    let response = fetch(`http://127.0.0.1:8000/admin/DeleteAnnouncement`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ announcementTitle: announcementTitle }),
    });
    console.log(response);
  };

  const deleteAndRefresh = async (announcementTitle) => {

    // Delete the announcement
    handleDelete(announcementTitle);
    // Fetch the updated list of announcements
    setInterval(fetchAnnouncements, 200);

    console.error('Error deleting announcement and refreshing:', error.message);
  }

  const handleEditDepartmentalAnn = (selectedAnnouncement) => {
    setSelectedAnnouncement(selectedAnnouncement);
    // history("/EditDepartmentalAnn", {
    //   state: { Announcement: selectedAnnouncement },
    // });
    setShowEditDepartmentalAnn(true);
    setShowAnnouncementButton(false); // Set the state to hide the "Announcements" button

  };

  const handleSaveChanges = (updatedAnnouncement) => {
    // Find the index of the updated announcement in the array
    const index = announcements.findIndex((announcement) => announcement.id === updatedAnnouncement.id);
    // Create a new array with the updated announcement
    const updatedAnnouncements = [...announcements];
    updatedAnnouncements[index] = updatedAnnouncement;
    // Update the state with the new array
    setAnnouncements(updatedAnnouncements);
    // Exit editing mode
    setIsEditing(false);
    // Clear selected announcement
    setSelectedAnnouncement(null);
  };

  // Function to handle edit button click
  const handleEdit = (announcement) => {
    setIsEditing(true);
    setSelectedAnnouncement(announcement);
  };

  return (
    <section className="left-50 top-33 absolute">
      {showEditDepartmentalAnn ? (
        <EditDepartmentalAnn
          selectedAnnouncement={selectedAnnouncement}
          onSave={handleSaveChanges}
        />
      ) : (
        <>
          <div className="absolute flex left-10 top-5 w-auto ">
            {showAnnouncementButton && (
              <button
                className="bg-sky-500 rounded-md w-auto text-lg"
                onClick={() => handleOptions("EditDepartmentalAnn")}
              >
                Announcements
              </button>
            )}
          </div>

          <div className="border-1 h-auto rounded-md border-black flex justify-center items-center mt-20 m-10 -mb-10">
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
                          Edit
                        </th>
                        <th className="border bg-blue-950 text-white px-4 py-2">
                          Delete
                        </th>
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
                                onClick={() => handleEditDepartmentalAnn(announcement)}
                              >
                                Edit
                              </button>
                            </td>
                            <td className="border border-black px-4 py-2 w-10">
                              <button
                                className="w-20 rounded-md bg-blue-500 text-lg"
                                onClick={() => deleteAndRefresh(announcement.announcementTitle)}
                              >
                                Delete
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
        </>
      )}
    </section>
  );
};

export default DepartmentalAnnouncement;