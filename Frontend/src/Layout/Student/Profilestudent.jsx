import React, { useState, useEffect } from "react";
import userIcon from '../../Components/Assets/photo/user-icon.png'

const Profilestudent = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Function to handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Convert the file to a base64 string
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      // Store the base64 string in local storage
      localStorage.setItem("profilePhoto", base64String);
      // Update the state to reflect the changes
      setProfilePhoto(base64String);
    };
  };

  // Function to load profile photo from local storage
  const loadProfilePhotoFromLocalStorage = () => {
    const storedPhoto = localStorage.getItem("profilePhoto");
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  };

  // Load profile photo from local storage when the component mounts
  useEffect(() => {
    loadProfilePhotoFromLocalStorage();
  }, []);

  return (
    <section className="absolute top-18 left-38 m-10">
      <div className="flex relative left-7 top-10 w-auto mb-10">
        <button className="bg-sky-500 rounded-md w-auto text-lg">
          Profile
        </button>
      </div>
      <div className="overflow-auto border-2 p-5 lg:h-60vh md:h-60vh sm:h-70vh w-70vw rounded-md border-sky-500 flex flex-col justify-center items-center ml-7">
        <div className="grid grid-cols-3 w-60vw h-50vh gap-3">
       
          <div className="mt-3 flex flex-col gap-2">
            <label className="text-start">
              Name :
              </label>
              <input
                type="text"
                value="Deepa"
                className="border border-gray px-2"
                readOnly
              ></input>
           
            <label className="text-start">
              Registration Number :
              </label>
              <input
                type="text"
                value="220970012"
                className="border border-gray px-2"
                readOnly
              ></input>
           
            <label className="text-start">
              Gender :
              </label>
              <input
                type="text"
                value="Female"
                className="border border-gray px-2"
                readOnly
              ></input>
           
            <label className="text-start">
              Date of Birth :
              </label>
              <input
                type="date"
                value="2001-04-01"
                className="border border-gray px-2"
                readOnly
              ></input>
            
            <label className="text-start">
              Academic year :
              </label>
              <input
                type="text"
                value="2022-2024"
                className="border border-gray px-2"
                readOnly
              ></input>
           
            <label className="text-start">
              Course :
              </label>
              <input
                type="text"
                value="MCA"
                className="border border-gray px-2"
                readOnly
              ></input>
            
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <label className="text-start">
              Date of joining :
              </label>
              <input
                type="date"
                value="2022-06-12"
                className="border border-gray px-2"
                readOnly
              ></input>
          
            <label className="text-start">
              Branch :
              </label>
              <input
                type="text"
                value="Computer Application"
                className="border border-gray px-2"
                readOnly
              ></input>
          
            <label className="text-start">
              Contact number :
              </label>
              <input
                type="number"
                value="9988877660"
                className="border border-gray px-2"
                readOnly
              ></input>
          
            <label className="text-start">
              Email :
              </label>
              <input
                type="email"
                value="Deepa@gmail.com"
                className="border border-gray px-2"
                readOnly
              ></input>
          
            <label className="text-start">
              Blood group :
              </label>
              <input
                type="text"
                value="B+"
                className="border border-gray px-2"
                readOnly
              ></input>
            
          </div>
          <div className="mt-25">
            {/* Display icon or uploaded photo */}
            <label htmlFor="upload-photo" className="cursor-pointer">
              <div
                className="w-40 h-40 rounded-full overflow-hidden flex justify-center items-center"
                style={{ backgroundColor: "#f0f0f0" }}
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={userIcon}
                    alt="User Icon"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            </label>
            {/* Input field for uploading photo */}
            <input
              type="file"
              accept="image/*"
              id="upload-photo"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profilestudent;
