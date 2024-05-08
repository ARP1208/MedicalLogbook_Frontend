import React, { useState, useEffect } from "react";
import userIcon from '../../Components/Assets/photo/user-icon.png'
import { getLoginResponse } from '../Login/Logged_user';

const Profilestudent = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const responseData = getLoginResponse();

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

  const [studentData, setStudentData] = useState({
    studentname: "",
    enrollmentNumber: "",
    branch: "",
    course: "",
    regno: "",
    dateOfJoining: "",
    dateOfBirth: "",
    gender: "Male",
    presentMobileNumber: "",
    emailId: "",
    bloodGroup: "",

  });

  useEffect(() => {
    if (location.state && location.state.studentData) {
      const studentData = location.state.studentData;
      setStudentData({
        studentname: studentData.studentname,

        enrollmentNumber: studentData.enrollmentNumber,

        academicYear: studentData.academicYear,

        branch: studentData.branch,
        course: studentData.course,
        regno: studentData.regno,

        dateOfJoining: studentData.dateOfJoining ? studentData.dateOfJoining.slice(0, 10) : "",
        dateOfBirth: studentData.dateOfBirth ? studentData.dateOfBirth.slice(0, 10) : "",


        gender: studentData.gender,

        presentMobileNumber: studentData.presentMobileNumber,


        emailId: studentData.emailId,

        bloodGroup: studentData.bloodGroup,

      });
    }
  }, [location]);


  const getDetails = async () => {
    const url = "http://localhost:8000/student/getstudentdetails"; // Your backend API endpoint
    console.log("Fetching details for: ", responseData.email);
    let data = {
      "email": responseData.email,

    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const studentDetails = await response.json();
        setStudentData(studentDetails);
      } else {
        console.error("Failed to fetch Student details:", response.status);
      }
    } catch (error) {
      console.error("Error while fetching student details:", error);
    }
  };








  useEffect(() => {
    getDetails();
  }, [])

  const handlephoneChange = (e) => {
    const truncatedValue = e.target.value.slice(0, 10);
    setStudentData({ ...studentData, [e.target.name]: truncatedValue });
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
              value={studentData.studentname}
              className="border border-gray px-2"
              readOnly
            ></input>

            <label className="text-start">
              Registration Number :
            </label>
            <input
              type="text"
              value={studentData.enrollmentNumber}
              className="border border-gray px-2"
              readOnly
            ></input>

            <label className="text-start">
              Gender :
            </label>
            <input
              type="text"
              value={studentData.gender}
              className="border border-gray px-2"
              readOnly
            ></input>

            <label className="text-start">
              Date of Birth :
            </label>
            <input
              type="date"
              value={studentData.dateOfBirth}
              className="border border-gray px-2"
              readOnly
            ></input>

            <label className="text-start">
              Academic year :
            </label>
            <input
              type="text"
              value={studentData.academicYear}
              className="border border-gray px-2"
              readOnly
            ></input>

            <label className="text-start">
              Course :
            </label>
            <input
              type="text"
              value={studentData.course}
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
              value={studentData.dateOfJoining}
              className="border border-gray px-2"
              readOnly
            ></input>

            <label className="text-start">
              Branch :
            </label>
            <input
              type="text"
              value={studentData.branch}
              className="border border-gray px-2"
              readOnly
            ></input>

            <label className="text-start">
              Contact number :
            </label>
            <input
              type="number"
              value={studentData.presentMobileNumber}
              className="border border-gray px-2"
              readOnly
            ></input>

            <label className="text-start">
              Email :
            </label>
            <input
              type="email"
              value={studentData.emailId}
              className="border border-gray px-2"
              readOnly
            ></input>

            <label className="text-start">
              Blood group :
            </label>
            <input
              type="text"
              value={studentData.bloodGroup}
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