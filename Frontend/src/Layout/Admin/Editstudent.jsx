import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Admin/Navbar";
import LogoNav from "../../Components/Admin/LogoNav";
import Regback from "../../Components/Admin/Regback";

const Editstudent = () => {
  const [showStudentCard, setShowStudentCard] = useState(false);
  const [showParentCard, setShowParentCard] = useState(false);
  const [addEditStudentClicked, setAddEditStudentClicked] = useState(false);
  const [parentDetailsClicked, setParentDetailsClicked] = useState(false);

  const handleAddEditStudentClick = () => {
    setShowStudentCard(true);
    setShowParentCard(false);
    setAddEditStudentClicked(!addEditStudentClicked);
    setParentDetailsClicked(false);
  };

  const handleParentDetailsClick = () => {
    setShowStudentCard(false);
    setShowParentCard(true);
    setParentDetailsClicked(!parentDetailsClicked);
    setAddEditStudentClicked(false);
  };

  const [errors, setErrors] = useState({});
  const location = useLocation();

  useEffect(() => {
    handleAddEditStudentClick();

    if (location.state && location.state.studentData) {
      const studentData = location.state.studentData;
      setStudentData({
        studentname: studentData.studentname,
        motherTongue: studentData.motherTongue,
        enrollmentNumber: studentData.enrollmentNumber,
        socialcategory: studentData.socialcategory,
        applicationNumber: studentData.applicationNumber,
        maritialStatus: studentData.maritialStatus,
        academicYear: studentData.academicYear,
        domicileStatus: studentData.domicileStatus,
        branch: studentData.branch,
        course: studentData.course,
        regno: studentData.regno,
        adharCard: studentData.adharCard,
        dateOfJoining: studentData.dateOfJoining
          ? studentData.dateOfJoining.slice(0, 10)
          : "",
        dateOfBirth: studentData.dateOfBirth
          ? studentData.dateOfBirth.slice(0, 10)
          : "",
        nameOnAdharCard: studentData.nameOnAdharCard,
        officialCorrespondenceEmail: studentData.officialCorrespondenceEmail,
        gender: studentData.gender,
        officialCorrespondenceNumber: studentData.officialCorrespondenceNumber,
        presentMobileNumber: studentData.presentMobileNumber,
        emergencyContactNumber: studentData.emergencyContactNumber,
        previousMobileNumber: studentData.previousMobileNumber,
        socialMediaAccount: studentData.socialMediaAccount,
        emailId: studentData.emailId,
        numberOfCreditsEarned: studentData.numberOfCreditsEarned,
        bloodGroup: studentData.bloodGroup,
        categoryOfAdmission: studentData.categoryOfAdmission,
        nationality: studentData.nationality,
        religion: studentData.religion,
      });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "dateOfBirth" || name === "dateOfJoining") {
      // Convert the date value to the format "YYYY-MM-DD"
      const dateObject = new Date(value);
      formattedValue = dateObject.toISOString().split("T")[0];
    }

    setStudentData({ ...studentData, [name]: formattedValue });
    setErrors({ ...errors, [name]: "" });

    if (name === "dateOfBirth" || name === "dateOfJoining") {
      isValidDate(formattedValue, name);
    }
  };

  const handleparentChange = (e) => {
    setParentData({ ...parentData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const [studentData, setStudentData] = useState({
    studentname: "",
    motherTongue: "",
    enrollmentNumber: "",
    socialcategory: "",
    applicationNumber: "",
    maritialStatus: "",
    academicYear: "",
    domicileStatus: "",
    branch: "",
    course: "",
    regno: "",
    adharCard: "",
    dateOfJoining: "",
    nameOnAdharCard: "",
    dateOfBirth: "",
    officialCorrespondenceEmail: "",
    gender: "Male",
    officialCorrespondenceNumber: "",
    presentMobileNumber: "",
    emergencyContactNumber: "",
    previousMobileNumber: "",
    socialMediaAccount: "",
    emailId: "",
    numberOfCreditsEarned: "",
    bloodGroup: "",
    categoryOfAdmission: "",
    nationality: "",
    religion: "",
  });

  const [parentData, setParentData] = useState({
    enrollmentNumber: "",
    fatherName: "",
    fatherContactNumber: "",
    fatherOccupation: "",
    fatherEmailId: "",
    motherName: "",
    motherContactNumber: "",
    motherOccupation: "",
    motherEmailId: "",
    guardianName: "",
    guardianContactNumber: "",
    guardianOccupation: "",
    guardianEmailId: "",
    bankAccountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    branch: "",
    panCardNumber: "",
  });

  const handlephoneChange = (e) => {
    const truncatedValue = e.target.value.slice(0, 10);
    setStudentData({ ...studentData, [e.target.name]: truncatedValue });
  };

  const handleparentphoneChange = (e) => {
    const truncatedValue = e.target.value.slice(0, 10);
    setParentData({ ...parentData, [e.target.name]: truncatedValue });
  };

  const isValidDate = (dateString, fieldName) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      setErrors({ ...errors, [fieldName]: "Please enter a valid date." });
      return false;
    }

    if (
      fieldName === "dateOfJoining" &&
      date <= new Date(studentData.dateOfBirth)
    ) {
      setErrors({
        ...errors,
        dateOfJoining:
          "Date of joining cannot be less than or equal to date of birth.",
      });
      return false;
    }

    // Ensure that the difference between doj and dob is at least 16 years
    const dob = new Date(studentData.dateOfBirth);
    const sixteenYearsAgo = new Date(dob);
    sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() + 16);

    if (fieldName === "dateOfJoining" && date <= sixteenYearsAgo) {
      setErrors({
        ...errors,
        dateOfJoining: "Age should be 16.",
      });
      return false;
    }

    setErrors({ ...errors, [fieldName]: "" });

    return true;
  };

  // const handlestudentdetails = async (e) => {
  //   e.preventDefault();
  //   const newErrors = {};

  //   if (!studentData.studentname.trim()) {
  //     newErrors.studentname = "required";
  //   } else if (!/^[A-Za-z\s'-]{1,50}$/.test(studentData.studentname)) {
  //     newErrors.studentname = "Invalid Name format";
  //   }

  //   if (!studentData.motherTongue.trim()) {
  //     newErrors.motherTongue = "required";
  //   } else if (!/^[A-Za-z\s'-]{1,50}$/.test(studentData.motherTongue)) {
  //     newErrors.motherTongue = "Invalid Mothertoungue";
  //   }

  //   if (!studentData.enrollmentNumber.trim()) {
  //     newErrors.enrollmentNumber = "required";
  //   } else if (!/^[A-Za-z0-9]{1,20}$/.test(studentData.enrollmentNumber)) {
  //     newErrors.enrollmentNumber = "Invalid Enrollment number";
  //   }

  //   if (!studentData.socialcategory.trim()) {
  //     newErrors.socialcategory = "required";
  //   } else if (!/^[A-Za-z\s'-]{1,50}$/.test(studentData.socialcategory)) {
  //     newErrors.socialcategory = "Invalid Social category";
  //   }

  //   if (!studentData.applicationNumber.trim()) {
  //     newErrors.applicationNumber = "required";
  //   } else if (!/^[0-9]{1,20}$/.test(studentData.applicationNumber)) {
  //     newErrors.applicationNumber = "Invalid Application number";
  //   }

  //   if (!studentData.regno.trim()) {
  //     newErrors.regno = "required";
  //   } else if (!/^[0-9]{1,20}$/.test(studentData.regno)) {
  //     newErrors.regno = "invalid format";
  //   }

  //   if (!studentData.academicYear.trim()) {
  //     newErrors.academicYear = "required";
  //   } else if (!/^\d{4}$/.test(studentData.academicYear)) {
  //     newErrors.academicYear = "Invalid Academic year";
  //   }

  //   if (!studentData.domicileStatus.trim()) {
  //     newErrors.domicileStatus = "required";
  //   } else if (!/^[A-Za-z\s'-]{1,20}$/.test(studentData.domicileStatus)) {
  //     newErrors.domicileStatus = "Invalid Domicile status";
  //   }

  //   if (!studentData.branch.trim()) {
  //     newErrors.branch = "required";
  //   } else if (!/^[A-Za-z0-9\s'-]{1,50}$/.test(studentData.branch)) {
  //     newErrors.branch = "Invalid Program/Branch";
  //   }

  //   if (!studentData.course.trim()) {
  //     newErrors.course = "required";
  //   } else if (!/^[A-Za-z\s'-]{1,20}$/.test(studentData.course)) {
  //     newErrors.course = "invalid format";
  //   }

  //   if (!studentData.adharCard.trim()) {
  //     newErrors.adharCard = "required";
  //   } else if (!/^\d{12}$/.test(studentData.adharCard)) {
  //     newErrors.adharCard = "Invalid Adhar number";
  //   }

  //   if (!studentData.dateOfJoining.trim()) {
  //     newErrors.dateOfJoining = "required";
  //   } else if (!isValidDate(studentData.dateOfBirth, "dateOfBirth")) {
  //     return;
  //   }

  //   if (!studentData.nameOnAdharCard.trim()) {
  //     newErrors.nameOnAdharCard = "required";
  //   } else if (!/^[A-Za-z\s'-]{1,50}$/.test(studentData.nameOnAdharCard)) {
  //     newErrors.nameOnAdharCard = "Invalid Adharcard name";
  //   }

  //   if (!studentData.maritialStatus.trim()) {
  //     newErrors.maritialStatus = "required";
  //   } else if (!/^[A-Za-z\s'-]{1,20}$/.test(studentData.maritialStatus)) {
  //     newErrors.maritialStatus = "Invalid format";
  //   }

  //   if (!studentData.dateOfBirth.trim()) {
  //     newErrors.dateOfBirth = "required";
  //   } else if (
  //     !/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(
  //       studentData.dateOfBirth
  //     )
  //   ) {
  //     newErrors.dateOfBirth = "Invalid Date of birth";
  //   }

  //   if (!studentData.officialCorrespondenceEmail.trim()) {
  //     newErrors.officialCorrespondenceEmail = "required";
  //   } else if (
  //     !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
  //       studentData.officialCorrespondenceEmail
  //     )
  //   ) {
  //     newErrors.officialCorrespondenceEmail = "Invalid official mail address";
  //   }

  //   if (!studentData.officialCorrespondenceNumber.trim()) {
  //     newErrors.officialCorrespondenceNumber = "required";
  //   } else if (!/^[6-9]\d{9}$/.test(studentData.officialCorrespondenceNumber)) {
  //     newErrors.officialCorrespondenceNumber = "Invalid official Mobile number";
  //   }

  //   if (!studentData.presentMobileNumber.trim()) {
  //     newErrors.presentMobileNumber = "required";
  //   } else if (!/^[6-9]\d{9}$/.test(studentData.presentMobileNumber)) {
  //     newErrors.presentMobileNumber = "Invalid Present Mobile number";
  //   }

  //   if (!studentData.emergencyContactNumber.trim()) {
  //     newErrors.emergencyContactNumber = "required";
  //   } else if (!/^[6-9]\d{9}$/.test(studentData.emergencyContactNumber)) {
  //     newErrors.emergencyContactNumber = "Invalid Emergency Mobile number";
  //   }

  //   if (!studentData.previousMobileNumber.trim()) {
  //     newErrors.previousMobileNumber = "required";
  //   } else if (!/^[6-9]\d{9}$/.test(studentData.previousMobileNumber)) {
  //     newErrors.previousMobileNumber = "Invalid Previous Mobile number";
  //   }

  //   if (!studentData.socialMediaAccount.trim()) {
  //     newErrors.socialMediaAccount = "required";
  //   } else if (!/^[a-zA-Z0-9_.]{1,30}$/.test(studentData.socialMediaAccount)) {
  //     newErrors.socialMediaAccount = "Invalid Social media account";
  //   }

  //   if (!studentData.emailId.trim()) {
  //     newErrors.emailId = "required";
  //   } else if (
  //     !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
  //       studentData.emailId
  //     )
  //   ) {
  //     newErrors.emailId = "Invalid Email id";
  //   }

  //   if (!studentData.numberOfCreditsEarned.trim()) {
  //     newErrors.numberOfCreditsEarned = "required";
  //   } else if (!/^\d+(\.\d{1,2})?$/.test(studentData.numberOfCreditsEarned)) {
  //     newErrors.numberOfCreditsEarned = "Invalid Credits earned";
  //   }

  //   if (!studentData.bloodGroup.trim()) {
  //     newErrors.bloodGroup = "required";
  //   } else if (!/^(A|B|AB|O)[+-]$/.test(studentData.bloodGroup)) {
  //     newErrors.bloodGroup = "Invalid blood group";
  //   }

  //   if (!studentData.categoryOfAdmission.trim()) {
  //     newErrors.categoryOfAdmission = "required";
  //   } else if (
  //     !/^[A-Za-z0-9\s'-]{1,50}$/.test(studentData.categoryOfAdmission)
  //   ) {
  //     newErrors.categoryOfAdmission = "Invalid Admission category";
  //   }

  //   if (!studentData.nationality.trim()) {
  //     newErrors.nationality = "required";
  //   } else if (!/^[A-Za-z\s-]{1,50}$/.test(studentData.nationality)) {
  //     newErrors.nationality = "Invalid Nationality format";
  //   }

  //   if (!studentData.religion.trim()) {
  //     newErrors.religion = "required";
  //   } else if (!/^[A-Za-z\s-]{1,50}$/.test(studentData.religion)) {
  //     newErrors.religion = "Invalid Religion format";
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   console.log("Data to be sent:", studentData);

  //   try {
  //     alert("Data saved");
  //     // Make a POST request to the backend API endpoint for login
  //     const Studentresponse = await axios.post(
  //       "http://localhost:8000/student/student-details",
  //       studentData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     // Reset the input fields by setting studentData to an empty object
  //     setStudentData({
  //       studentname: "",
  //       motherTongue: "",
  //       enrollmentNumber: "",
  //       socialcategory: "",
  //       applicationNumber: "",
  //       maritialStatus: "",
  //       academicYear: "",
  //       domicileStatus: "",
  //       branch: "",
  //       course: "",
  //       regno: "",
  //       adharCard: "",
  //       dateOfJoining: "",
  //       nameOnAdharCard: "",
  //       dateOfBirth: "",
  //       officialCorrespondenceEmail: "",
  //       gender: "Male",
  //       officialCorrespondenceNumber: "",
  //       presentMobileNumber: "",
  //       emergencyContactNumber: "",
  //       previousMobileNumber: "",
  //       socialMediaAccount: "",
  //       emailId: "",
  //       numberOfCreditsEarned: "",
  //       bloodGroup: "",
  //       categoryOfAdmission: "",
  //       nationality: "",
  //       religion: "",
  //     });

  //     //I'm calling setErrors({}) to clear any previous validation errors.
  //     setErrors({});

  //     // Check if the request was successful (status code 2xx)
  //     if (Studentresponse.status >= 200 && Studentresponse.status < 300) {
  //       console.log(Studentresponse.data);

  //       console.log("Data to be sent:", studentData.emailId);
  //       // Make a POST request to the backend API endpoint for login
  //       const Studentemailresponse = await axios.post(
  //         "http://localhost:8000/student/send-mail",
  //         studentData,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       // Check if the request was successful (status code 2xx)
  //       if (
  //         Studentemailresponse.status >= 200 &&
  //         Studentemailresponse.status < 300
  //       ) {
  //         console.log(Studentemailresponse.data);

  //         // You can perform additional actions here, such as redirecting the user
  //       } else {
  //         // Handle errors from the backend
  //         const responseData = Studentemailresponse.data;
  //         setErrors(responseData.errors || {});
  //       }

  //       console.log("student email data sent:", studentData.emailId);

  //       // You can perform additional actions here, such as redirecting the user
  //     } else {
  //       // Handle errors from the backend
  //       const responseData = Studentresponse.data;
  //       setErrors(responseData.errors || {});
  //     }
  //   } catch (error) {
  //     console.error("Error during student data saving:", error);
  //   }

  //   // Add logic to handle login (e.g., send data to server)
  //   console.log("student data submitted:", studentData);
  // };

  const handleparentdetails = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!parentData.enrollmentNumber.trim()) {
      newErrors.enrollmentNumber = "required";
    } else if (!/^[A-Za-z0-9]{1,20}$/.test(parentData.enrollmentNumber)) {
      newErrors.enrollmentNumber = "Invalid Enrollment number";
    }

    if (!parentData.fatherName.trim()) {
      newErrors.fatherName = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(parentData.fatherName)) {
      newErrors.fatherName = "Invalid Name format";
    }

    if (!parentData.fatherContactNumber.trim()) {
      newErrors.fatherContactNumber = "required";
    } else if (!/^[6-9]\d{9}$/.test(parentData.fatherContactNumber)) {
      newErrors.fatherContactNumber = "Invalid mobile number format";
    }

    if (!parentData.bankAccountNumber.trim()) {
      newErrors.bankAccountNumber = "required";
    } else if (!/^\d+$/.test(parentData.bankAccountNumber)) {
      newErrors.bankAccountNumber = "Invalid account number format";
    }

    if (!parentData.fatherOccupation.trim()) {
      newErrors.fatherOccupation = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(parentData.fatherOccupation)) {
      newErrors.fatherOccupation = "Invalid format";
    }

    if (!parentData.accountHolderName.trim()) {
      newErrors.accountHolderName = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(parentData.accountHolderName)) {
      newErrors.accountHolderName = "Invalid Name format";
    }

    if (!parentData.fatherEmailId.trim()) {
      newErrors.fatherEmailId = "required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        parentData.fatherEmailId
      )
    ) {
      newErrors.fatherEmailId = "Invalid email format";
    }

    if (!parentData.ifscCode.trim()) {
      newErrors.ifscCode = "required";
    } else if (!/^[A-Z]{4}[0-9]{7}$/.test(parentData.ifscCode)) {
      newErrors.ifscCode = "Invalid ifsc code format";
    }

    if (!parentData.motherName.trim()) {
      newErrors.motherName = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(parentData.motherName)) {
      newErrors.motherName = "Invalid Name format";
    }

    if (!parentData.branch.trim()) {
      newErrors.branch = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(parentData.branch)) {
      newErrors.branch = "Invalid branch name";
    }

    if (!parentData.motherContactNumber.trim()) {
      newErrors.motherContactNumber = "required";
    } else if (!/^[6-9]\d{9}$/.test(parentData.motherContactNumber)) {
      newErrors.motherContactNumber = "Invalid mobile number format";
    }

    // if (!parentData.panCardNumber.trim()) {
    //   newErrors.panCardNumber = "required";
    // } else if (!/^[A-Za-z]{5}\d{4}[A-Za-z]$/.test(parentData.panCardNumber)) {
    //   newErrors.panCardNumber = "Invalid PAN number format";
    // }

    // Validate PAN card number
    if (!parentData.panCardNumber.trim()) {
      newErrors.panCardNumber = "PAN card number is required";
    } else if (
      !/^[A-Za-z]{4}[A-Za-z]{1}\d{4}$/.test(parentData.panCardNumber)
    ) {
      newErrors.panCardNumber = "Invalid PAN card number format";
    }

    if (!parentData.motherOccupation.trim()) {
      newErrors.motherOccupation = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(parentData.motherOccupation)) {
      newErrors.motherOccupation = "Invalid format";
    }

    if (!parentData.motherEmailId.trim()) {
      newErrors.motherEmailId = "required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        parentData.motherEmailId
      )
    ) {
      newErrors.motherEmailId = "Invalid email format";
    }

    if (!parentData.guardianName.trim()) {
      newErrors.guardianName = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(parentData.guardianName)) {
      newErrors.guardianName = "Invalid Name format";
    }

    if (!parentData.guardianContactNumber.trim()) {
      newErrors.guardianContactNumber = "required";
    } else if (!/^[6-9]\d{9}$/.test(parentData.guardianContactNumber)) {
      newErrors.guardianContactNumber = "Invalid mobile number format";
    }

    if (!parentData.guardianOccupation.trim()) {
      newErrors.guardianOccupation = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(parentData.guardianOccupation)) {
      newErrors.guardianOccupation = "Invalid format";
    }

    if (!parentData.guardianEmailId.trim()) {
      newErrors.guardianEmailId = "required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        parentData.guardianEmailId
      )
    ) {
      newErrors.guardianEmailId = "Invalid email format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Data to be sent:", parentData);

    try {
      // Make a POST request to the backend API endpoint for login

      alert("Data saved");
      const Prarentresponse = await axios.post(
        "http://localhost:8000/parent/parent-details",
        parentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Reset the input fields by setting studentData to an empty object
      setParentData({
        enrollmentNumber: "",
        fatherName: "",
        fatherContactNumber: "",
        fatherOccupation: "",
        fatherEmailId: "",
        motherName: "",
        motherContactNumber: "",
        motherOccupation: "",
        motherEmailId: "",
        guardianName: "",
        guardianContactNumber: "",
        guardianOccupation: "",
        guardianEmailId: "",
        bankAccountNumber: "",
        accountHolderName: "",
        ifscCode: "",
        branch: "",
        panCardNumber: "",
      });

      //I'm calling setErrors({}) to clear any previous validation errors.
      setErrors({});

      // Check if the request was successful (status code 2xx)
      if (Prarentresponse.status >= 200 && Prarentresponse.status < 300) {
        console.log(Prarentresponse.data);

        // You can perform additional actions here, such as redirecting the user
      } else {
        // Handle errors from the backend
        const responseData = Prarentresponse.data;
        setErrors(responseData.errors || {});
      }
    } catch (error) {
      console.error("Error during  parent data saving:", error);
    }

    // Add logic to handle login (e.g., send data to server)
    console.log("parent data submitted:", parentData);

    // console.log("father's data", parentData.fatherName);
  };

  const handleUpdateStudentDetails = async (e) => {
    e.preventDefault();

    console.log("Data to be sent:", studentData);

    try {
      alert("Data saved");
      // Make a POST request to the backend API endpoint for login
      const UpdatedStudentresponse = await axios.patch(
        "http://localhost:8000/student/updatestudent-details",
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the request was successful (status code 2xx)
      if (
        UpdatedStudentresponse.status >= 200 &&
        UpdatedStudentresponse.status < 300
      ) {
        console.log(UpdatedStudentresponse.data);

        console.log("Data to be sent:", studentData.emailId);
        // Make a POST request to the backend API endpoint for login
        const Studentemailresponse = await axios.post(
          "http://localhost:8000/student/send-mail",
          studentData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Check if the request was successful (status code 2xx)
        if (
          Studentemailresponse.status >= 200 &&
          Studentemailresponse.status < 300
        ) {
          console.log(Studentemailresponse.data);

          // You can perform additional actions here, such as redirecting the user
        } else {
          // Handle errors from the backend
          const responseData = Studentemailresponse.data;
          setErrors(responseData.errors || {});
        }

        console.log("student email data sent:", studentData.emailId);

        // You can perform additional actions here, such as redirecting the user
      } else {
        // Handle errors from the backend
        const responseData = UpdatedStudentresponse.data;
        setErrors(responseData.errors || {});
      }
    } catch (error) {
      console.error("Error during student data Updating:", error);
    }

    // Add logic to handle login (e.g., send data to server)
    console.log("student data Updated:", studentData);
  };

  const renderStudentForm = () => {
    return (
      <section className="md:p-4 sm:p-6">
        <div className="col-span-2 md:text-6 pb-1 pt-5 sm:text-2xl">
          Student Details
        </div>
        <form
          className="lg:w-275 md:w-3/4 sm:w-3/4 ml-10 md:h-auto md:text-4 sm:text-xl text-left"
          onSubmit={handleUpdateStudentDetails}
        >
          <div className="grid md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 md:gap-4 sm:gap-2 mt-8">
            <div>
              <label>Name as per 12th gradesheet:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="studentname"
                value={studentData.studentname}
                onChange={handleChange}
                readOnly
              />
              {errors.studentname && (
                <div className="text-red-500">{errors.studentname}</div>
              )}
            </div>
            <div>
              <label>Mother tongue:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="motherTongue"
                value={studentData.motherTongue}
                onChange={handleChange}
              />
              {errors.motherTongue && (
                <div className="text-red-500">{errors.motherTongue}</div>
              )}
            </div>
            <div>
              <label>Enrollment number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="enrollmentNumber"
                value={studentData.enrollmentNumber}
                onChange={handleChange}
                readOnly
              />
              {errors.enrollmentNumber && (
                <div className="text-red-500">{errors.enrollmentNumber}</div>
              )}
            </div>
            <div>
              <label>Social category:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="socialcategory"
                value={studentData.socialcategory}
                onChange={handleChange}
                readOnly
              />
              {errors.socialcategory && (
                <div className="text-red-500">{errors.socialcategory}</div>
              )}
            </div>
            <div>
              <label>Application number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="applicationNumber"
                value={studentData.applicationNumber}
                onChange={handleChange}
              />
              {errors.applicationNumber && (
                <div className="text-red-500">{errors.applicationNumber}</div>
              )}
            </div>

            <div>
              <label>Maritial status:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="maritialStatus"
                value={studentData.maritialStatus}
                onChange={handleChange}
              />
              {errors.maritialStatus && (
                <div className="text-red-500">{errors.maritialStatus}</div>
              )}
            </div>

            <div>
              <label>Registration number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="regno"
                value={studentData.regno}
                onChange={handleChange}
                readOnly
              />
              {errors.regno && (
                <div className="text-red-500">{errors.regno}</div>
              )}
            </div>

            <div>
              <label>Academic year:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="academicYear"
                value={studentData.academicYear}
                onChange={handleChange}
                readOnly
              />
              {errors.academicYear && (
                <div className="text-red-500">{errors.academicYear}</div>
              )}
            </div>

            <div>
              <label>Branch:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="branch"
                value={studentData.branch}
                onChange={handleChange}
              />
              {errors.branch && (
                <div className="text-red-500">{errors.branch}</div>
              )}
            </div>

            <div>
              <label>Domicile status:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="domicileStatus"
                value={studentData.domicileStatus}
                onChange={handleChange}
              />
              {errors.domicileStatus && (
                <div className="text-red-500">{errors.domicileStatus}</div>
              )}
            </div>
            <div>
              <label>Course:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="course"
                value={studentData.course}
                onChange={handleChange}
                readOnly
              />
              {errors.course && (
                <div className="text-red-500">{errors.course}</div>
              )}
            </div>

            <div>
              <label>Adhar card:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="adharCard"
                value={studentData.adharCard}
                onChange={handleChange}
              />
              {errors.adharCard && (
                <div className="text-red-500">{errors.adharCard}</div>
              )}
            </div>
            <div>
              <label>Date of joining:</label>
              <input
                type="Date"
                className="border border-gray-700 w-125"
                name="dateOfJoining"
                value={studentData.dateOfJoining}
                onChange={handleChange}
                readOnly
              />
              {errors.dateOfJoining && (
                <div className="text-red-500">{errors.dateOfJoining}</div>
              )}
            </div>
            <div>
              <label>Name as on Adhar card:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="nameOnAdharCard"
                value={studentData.nameOnAdharCard}
                onChange={handleChange}
              />
              {errors.nameOnAdharCard && (
                <div className="text-red-500">{errors.nameOnAdharCard}</div>
              )}
            </div>
            <div>
              <label>Date of birth:</label>
              <input
                type="Date"
                className="border border-gray-700 w-125"
                name="dateOfBirth"
                value={studentData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && (
                <div className="text-red-500">{errors.dateOfBirth}</div>
              )}
            </div>
            <div>
              <label>Official correspondance email:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="officialCorrespondenceEmail"
                value={studentData.officialCorrespondenceEmail}
                onChange={handleChange}
              />
              {errors.officialCorrespondenceEmail && (
                <div className="text-red-500">
                  {errors.officialCorrespondenceEmail}
                </div>
              )}
            </div>
            <div>
              <label>Gender:</label>
              <select
                className="w-125 border border-gray-700"
                name="gender"
                value={studentData.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label>Official correspondance number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="officialCorrespondenceNumber"
                value={studentData.officialCorrespondenceNumber}
                onChange={handlephoneChange}
              />
              {errors.officialCorrespondenceNumber && (
                <div className="text-red-500">
                  {errors.officialCorrespondenceNumber}
                </div>
              )}
            </div>
            <div>
              <label>Present mobile number: </label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="presentMobileNumber"
                value={studentData.presentMobileNumber}
                onChange={handlephoneChange}
              />
              {errors.presentMobileNumber && (
                <div className="text-red-500">{errors.presentMobileNumber}</div>
              )}
            </div>
            <div>
              <label>Emergency contact number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="emergencyContactNumber"
                value={studentData.emergencyContactNumber}
                onChange={handlephoneChange}
              />
              {errors.emergencyContactNumber && (
                <div className="text-red-500">
                  {errors.emergencyContactNumber}
                </div>
              )}
            </div>
            <div>
              <label>Previous mobile number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="previousMobileNumber"
                value={studentData.previousMobileNumber}
                onChange={handlephoneChange}
              />
              {errors.previousMobileNumber && (
                <div className="text-red-500">
                  {errors.previousMobileNumber}
                </div>
              )}
            </div>
            <div>
              <label>Social media account:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="socialMediaAccount"
                value={studentData.socialMediaAccount}
                onChange={handleChange}
              />
              {errors.socialMediaAccount && (
                <div className="text-red-500">{errors.socialMediaAccount}</div>
              )}
            </div>
            <div>
              <label>Email id:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="emailId"
                value={studentData.emailId}
                onChange={handleChange}
              />
              {errors.emailId && (
                <div className="text-red-500">{errors.emailId}</div>
              )}
            </div>
            <div>
              <label>Number of credits earned:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="numberOfCreditsEarned"
                value={studentData.numberOfCreditsEarned}
                onChange={handleChange}
              />
              {errors.numberOfCreditsEarned && (
                <div className="text-red-500">
                  {errors.numberOfCreditsEarned}
                </div>
              )}
            </div>
            <div>
              <label>Blood group:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="bloodGroup"
                value={studentData.bloodGroup}
                onChange={handleChange}
              />
              {errors.bloodGroup && (
                <div className="text-red-500">{errors.bloodGroup}</div>
              )}
            </div>
            <div>
              <label>Category of admission:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="categoryOfAdmission"
                value={studentData.categoryOfAdmission}
                onChange={handleChange}
                readOnly
              />
              {errors.categoryOfAdmission && (
                <div className="text-red-500">{errors.categoryOfAdmission}</div>
              )}
            </div>
            <div>
              <label>Nationality:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="nationality"
                value={studentData.nationality}
                onChange={handleChange}
              />
              {errors.nationality && (
                <div className="text-red-500">{errors.nationality}</div>
              )}
            </div>
            <div>
              <label>Religion:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="religion"
                value={studentData.religion}
                onChange={handleChange}
              />
              {errors.religion && (
                <div className="text-red-500">{errors.religion}</div>
              )}
            </div>
          </div>
          <div className="flex sm:justify-self-center md: justify-items-center lg:justify-center mt-8 gap-5">
            <button
              type="submit"
              name="studentSave"
              value="studentSave"
              className="bg-blue-500 rounded-md w-40 h-auto text-white text-22"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>
    );
  };

  const renderParentForm = () => {
    return (
      <section className="md:p-4 sm:p-6">
        <div className="col-span-2 md:text-6 pb-1 pt-5 sm:text-2xl">
          Parent Details
        </div>
        <form
          className="lg:w-275 md:3/4 h-99 ml-10 md:text-4 text-left sm:w-3/4"
          onSubmit={handleparentdetails}
        >
          <div className="grid md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 md:gap-4 sm:gap-2 mt-8">
            <div>
              <label>Enrollment number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="enrollmentNumber"
                value={parentData.enrollmentNumber}
                onChange={handleparentChange}
              />
              {errors.enrollmentNumber && (
                <div className="text-red-500">{errors.enrollmentNumber}</div>
              )}
            </div>
            <div>
              <label>Father`s Name:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="fatherName"
                value={parentData.fatherName}
                onChange={handleparentChange}
              />
              {errors.fatherName && (
                <div className="text-red-500">{errors.fatherName}</div>
              )}
            </div>
            <div>
              <label>Father`s contact number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="fatherContactNumber"
                value={parentData.fatherContactNumber}
                onChange={handleparentphoneChange}
              />
              {errors.fatherContactNumber && (
                <div className="text-red-500">{errors.fatherContactNumber}</div>
              )}
            </div>
            <div>
              <label>Father`s Occupation:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="fatherOccupation"
                value={parentData.fatherOccupation}
                onChange={handleparentChange}
              />
              {errors.fatherOccupation && (
                <div className="text-red-500">{errors.fatherOccupation}</div>
              )}
            </div>
            <div>
              <label>Father`s email id:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="fatherEmailId"
                value={parentData.fatherEmailId}
                onChange={handleparentChange}
              />
              {errors.fatherEmailId && (
                <div className="text-red-500">{errors.fatherEmailId}</div>
              )}
            </div>

            <div>
              <label>Mother`s Name:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="motherName"
                value={parentData.motherName}
                onChange={handleparentChange}
              />
              {errors.motherName && (
                <div className="text-red-500">{errors.motherName}</div>
              )}
            </div>
            <div>
              <label>Mother`s contact number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="motherContactNumber"
                value={parentData.motherContactNumber}
                onChange={handleparentphoneChange}
              />
              {errors.motherContactNumber && (
                <div className="text-red-500">{errors.motherContactNumber}</div>
              )}
            </div>
            <div>
              <label>Mother`s Occupation:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="motherOccupation"
                value={parentData.motherOccupation}
                onChange={handleparentChange}
              />
              {errors.motherOccupation && (
                <div className="text-red-500">{errors.motherOccupation}</div>
              )}
            </div>
            <div>
              <label>Mother`s email id:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="motherEmailId"
                value={parentData.motherEmailId}
                onChange={handleparentChange}
              />
              {errors.motherEmailId && (
                <div className="text-red-500">{errors.motherEmailId}</div>
              )}
            </div>
            <div>
              <label>Guardian Name:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="guardianName"
                value={parentData.guardianName}
                onChange={handleparentChange}
              />
              {errors.guardianName && (
                <div className="text-red-500">{errors.guardianName}</div>
              )}
            </div>
            <div>
              <label>Guardian contact number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="guardianContactNumber"
                value={parentData.guardianContactNumber}
                onChange={handleparentphoneChange}
              />
              {errors.guardianContactNumber && (
                <div className="text-red-500">
                  {errors.guardianContactNumber}
                </div>
              )}
            </div>
            <div>
              <label>Guardian Occupation:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="guardianOccupation"
                value={parentData.guardianOccupation}
                onChange={handleparentChange}
              />
              {errors.guardianOccupation && (
                <div className="text-red-500">{errors.guardianOccupation}</div>
              )}
            </div>
            <div>
              <label>Guardian email id:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="guardianEmailId"
                value={parentData.guardianEmailId}
                onChange={handleparentChange}
              />
              {errors.guardianEmailId && (
                <div className="text-red-500">{errors.guardianEmailId}</div>
              )}
            </div>
            <div>
              <label>Bank account number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="bankAccountNumber"
                value={parentData.bankAccountNumber}
                onChange={handleparentChange}
              />
              {errors.bankAccountNumber && (
                <div className="text-red-500">{errors.bankAccountNumber}</div>
              )}
            </div>

            <div>
              <label>Account holder Name:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="accountHolderName"
                value={parentData.accountHolderName}
                onChange={handleparentChange}
              />
              {errors.accountHolderName && (
                <div className="text-red-500">{errors.accountHolderName}</div>
              )}
            </div>

            <div>
              <label>IFSC code:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="ifscCode"
                value={parentData.ifscCode}
                onChange={handleparentChange}
              />
              {errors.ifscCode && (
                <div className="text-red-500">{errors.ifscCode}</div>
              )}
            </div>

            <div>
              <label>Branch:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="branch"
                value={parentData.branch}
                onChange={handleparentChange}
              />
              {errors.branch && (
                <div className="text-red-500">{errors.branch}</div>
              )}
            </div>

            <div>
              <label>PAN card number:</label>
              <input
                type="text"
                className="border border-gray-700 w-125"
                name="panCardNumber"
                value={parentData.panCardNumber}
                onChange={handleparentChange}
              />
              {errors.panCardNumber && (
                <div className="text-red-500">{errors.panCardNumber}</div>
              )}
            </div>
          </div>
          <div className="flex sm:justify-self-center md:justify-center mt-8 gap-5">
            <button
              type="submit"
              name="parentSave"
              value="parentSave"
              className=" bg-blue-500 rounded-md w-40 h-auto text-white text-22"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>
    );
  };

  return (
    <section>
      <LogoNav />
      <Navbar />
      {/* <Regsidebar/> */}
      <Regback />
      <div className="container">
        {/* Your other components go here */}
        <div className="fixed left-15 top-36 flex ml-40 sm:block sm:w-auto sm:h-auto">
          <button
            className={`w-48 h-10 ml-5 pl-1 pt-1 text-lg focus:outline-none ${
              addEditStudentClicked
                ? "bg-white text-blue-500 focus:ring-4 rounded-lg focus:outline-none focus:ring-blue-300"
                : "bg-blue-500 text-white rounded-lg"
            }`}
            onClick={handleAddEditStudentClick}
          >
            Edit Student Details
          </button>

          <button
            className={`w-48 h-10 ml-10 pl-1 pt-1 text-lg focus:outline-none ${
              parentDetailsClicked
                ? "bg-white text-blue-500 focus:ring-4 rounded-lg focus:outline-none focus:ring-blue-300"
                : "bg-blue-500 text-white   rounded-lg "
            }`}
            onClick={handleParentDetailsClick}
          >
            Edit Parent Details
          </button>
        </div>

        {showStudentCard && (
          <div className="fixed overflow-scroll w-auto h-100 top-56 ml-60 h-60vh pb-80 border-1 border-black rounded-2xl">
            {renderStudentForm()}
          </div>
        )}

        {showParentCard && (
          <div className="fixed overflow-scroll w-auto top-56 ml-60 h-100 pb-80 border-1 border-black rounded-2xl">
            {renderParentForm()}
          </div>
        )}
      </div>
    </section>
  );
};

export default Editstudent;
