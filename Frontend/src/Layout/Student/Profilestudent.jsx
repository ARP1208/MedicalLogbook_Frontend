import { useState } from "react";
import axios from "axios";


const Profilestudent = () => {
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
  const [parenterrors, setParentErrors] = useState({});
  
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
    setParentErrors({ ...parenterrors, [e.target.name]: null });
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
      setParentErrors({ ...parenterrors, [fieldName]: "Please enter a valid date." });
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
      setParentErrors({
        ...parenterrors,
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
      setParentErrors({
        ...parenterrors,
        dateOfJoining: "Age should be 16.",
      });
      return false;
    }

    setErrors({ ...errors, [fieldName]: "" });
    setParentErrors({ ...parenterrors, [fieldName]: "" });

    return true;
  };

  const handlestudentdetails = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!studentData.studentname.trim()) {
      newErrors.studentname = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(studentData.studentname)) {
      newErrors.studentname = "Invalid Name format";
    }

    if (!studentData.motherTongue.trim()) {
      newErrors.motherTongue = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(studentData.motherTongue)) {
      newErrors.motherTongue = "Invalid Mothertoungue";
    }

    if (!studentData.enrollmentNumber.trim()) {
      newErrors.enrollmentNumber = "required";
    } else if (!/^[A-Za-z0-9]{1,20}$/.test(studentData.enrollmentNumber)) {
      newErrors.enrollmentNumber = "Invalid Enrollment number";
    }

    if (!studentData.socialcategory.trim()) {
      newErrors.socialcategory = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(studentData.socialcategory)) {
      newErrors.socialcategory = "Invalid Social category";
    }

    if (!studentData.applicationNumber.trim()) {
      newErrors.applicationNumber = "required";
    } else if (!/^[0-9]{1,20}$/.test(studentData.applicationNumber)) {
      newErrors.applicationNumber = "Invalid Application number";
    }

    if (!studentData.regno.trim()) {
      newErrors.regno = "required";
    } else if (!/^[0-9]{1,20}$/.test(studentData.regno)) {
      newErrors.regno = "invalid format";
    }

    if (!studentData.academicYear.trim()) {
      newErrors.academicYear = "required";
    } else if (!/^\d{4}$/.test(studentData.academicYear)) {
      newErrors.academicYear = "Invalid Academic year";
    }

    if (!studentData.domicileStatus.trim()) {
      newErrors.domicileStatus = "required";
    } else if (!/^[A-Za-z\s'-]{1,20}$/.test(studentData.domicileStatus)) {
      newErrors.domicileStatus = "Invalid Domicile status";
    }

    if (!studentData.branch.trim()) {
      newErrors.branch = "required";
    } else if (!/^[A-Za-z0-9\s'-]{1,50}$/.test(studentData.branch)) {
      newErrors.branch = "Invalid Program/Branch";
    }

    if (!studentData.course.trim()) {
      newErrors.course = "required";
    } else if (!/^[A-Za-z\s'-]{1,20}$/.test(studentData.course)) {
      newErrors.course = "invalid format";
    }

    if (!studentData.adharCard.trim()) {
      newErrors.adharCard = "required";
    } else if (!/^\d{12}$/.test(studentData.adharCard)) {
      newErrors.adharCard = "Invalid Adhar number";
    }

    if (!studentData.dateOfJoining.trim()) {
      newErrors.dateOfJoining = "required";
    } else if (!isValidDate(studentData.dateOfBirth, "dateOfBirth")) {
      return;
    }

    if (!studentData.nameOnAdharCard.trim()) {
      newErrors.nameOnAdharCard = "required";
    } else if (!/^[A-Za-z\s'-]{1,50}$/.test(studentData.nameOnAdharCard)) {
      newErrors.nameOnAdharCard = "Invalid Adharcard name";
    }

    if (!studentData.maritialStatus.trim()) {
      newErrors.maritialStatus = "required";
    } else if (!/^[A-Za-z\s'-]{1,20}$/.test(studentData.maritialStatus)) {
      newErrors.maritialStatus = "Invalid format";
    }

    if (!studentData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "required";
    } else if (
      !/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(
        studentData.dateOfBirth
      )
    ) {
      newErrors.dateOfBirth = "Invalid Date of birth";
    }

    if (!studentData.officialCorrespondenceEmail.trim()) {
      newErrors.officialCorrespondenceEmail = "required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        studentData.officialCorrespondenceEmail
      )
    ) {
      newErrors.officialCorrespondenceEmail = "Invalid official mail address";
    }

    if (!studentData.officialCorrespondenceNumber.trim()) {
      newErrors.officialCorrespondenceNumber = "required";
    } else if (!/^[6-9]\d{9}$/.test(studentData.officialCorrespondenceNumber)) {
      newErrors.officialCorrespondenceNumber = "Invalid official Mobile number";
    }

    if (!studentData.presentMobileNumber.trim()) {
      newErrors.presentMobileNumber = "required";
    } else if (!/^[6-9]\d{9}$/.test(studentData.presentMobileNumber)) {
      newErrors.presentMobileNumber = "Invalid Present Mobile number";
    }

    if (!studentData.emergencyContactNumber.trim()) {
      newErrors.emergencyContactNumber = "required";
    } else if (!/^[6-9]\d{9}$/.test(studentData.emergencyContactNumber)) {
      newErrors.emergencyContactNumber = "Invalid Emergency Mobile number";
    }

    if (!studentData.previousMobileNumber.trim()) {
      newErrors.previousMobileNumber = "required";
    } else if (!/^[6-9]\d{9}$/.test(studentData.previousMobileNumber)) {
      newErrors.previousMobileNumber = "Invalid Previous Mobile number";
    }

    if (!studentData.socialMediaAccount.trim()) {
      newErrors.socialMediaAccount = "required";
    } else if (!/^[a-zA-Z0-9_.]{1,30}$/.test(studentData.socialMediaAccount)) {
      newErrors.socialMediaAccount = "Invalid Social media account";
    }

    if (!studentData.emailId.trim()) {
      newErrors.emailId = "required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        studentData.emailId
      )
    ) {
      newErrors.emailId = "Invalid Email id";
    }

    if (!studentData.numberOfCreditsEarned.trim()) {
      newErrors.numberOfCreditsEarned = "required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(studentData.numberOfCreditsEarned)) {
      newErrors.numberOfCreditsEarned = "Invalid Credits earned";
    }

    if (!studentData.bloodGroup.trim()) {
      newErrors.bloodGroup = "required";
    } else if (!/^(A|B|AB|O)[+-]$/.test(studentData.bloodGroup)) {
      newErrors.bloodGroup = "Invalid blood group";
    }

    if (!studentData.categoryOfAdmission.trim()) {
      newErrors.categoryOfAdmission = "required";
    } else if (
      !/^[A-Za-z0-9\s'-]{1,50}$/.test(studentData.categoryOfAdmission)
    ) {
      newErrors.categoryOfAdmission = "Invalid Admission category";
    }

    if (!studentData.nationality.trim()) {
      newErrors.nationality = "required";
    } else if (!/^[A-Za-z\s-]{1,50}$/.test(studentData.nationality)) {
      newErrors.nationality = "Invalid Nationality format";
    }

    if (!studentData.religion.trim()) {
      newErrors.religion = "required";
    } else if (!/^[A-Za-z\s-]{1,50}$/.test(studentData.religion)) {
      newErrors.religion = "Invalid Religion format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Data to be sent:", studentData);

    try {
      alert("Data saved");
      // Make a POST request to the backend API endpoint for login
      const Studentresponse = await axios.post(
        "http://localhost:8000/student/student-details",
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Reset the input fields by setting studentData to an empty object
      setStudentData({
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

      //I'm calling setErrors({}) to clear any previous validation errors.
      setErrors({});

      // Check if the request was successful (status code 2xx)
      if (Studentresponse.status >= 200 && Studentresponse.status < 300) {
        console.log(Studentresponse.data);

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
        const responseData = Studentresponse.data;
        setErrors(responseData.errors || {});
      }
    } catch (error) {
      console.error("Error during student data saving:", error);
    }

    // Add logic to handle login (e.g., send data to server)
    console.log("student data submitted:", studentData);
  };

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
      setParentErrors(newErrors);
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
      setParentErrors({});


      // Check if the request was successful (status code 2xx)
      if (Prarentresponse.status >= 200 && Prarentresponse.status < 300) {
        console.log(Prarentresponse.data);

        // You can perform additional actions here, such as redirecting the user
      } else {
        // Handle errors from the backend
        const responseData = Prarentresponse.data;
        setParentErrors(responseData.errors || {});
      }
    } catch (error) {
      console.error("Error during  parent data saving:", error);
    }

    // Add logic to handle login (e.g., send data to server)
    console.log("parent data submitted:", parentData);

    // console.log("father's data", parentData.fatherName);
  };

  

  const renderStudentForm = () => {
    return (
      <section className="flex justify-center">
        <form className="relative w-80 md:w-3/4 sm:w-3/4 md:h-auto lg:text-md md:text-md text-left" onSubmit={handlestudentdetails}>
        <div className="md:text-6 relative text-center pb-1 pt-5 sm:text-2xl">Student Details</div>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 md:gap-4 sm:gap-2 mt-8">
            <div className="flex flex-col">
               <label>Name as per 12th gradesheet:</label>
              <input
                type="text"
                className="border border-black  "
                name="studentname"
                value={studentData.studentname}
                onChange={handleChange}
                readOnly
              />
              {errors.studentname && (
                <div className="text-red-500">{errors.studentname}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Mother tongue:</label>
              <input
                type="text"
                className="border border-black  "
                name="motherTongue"
                value={studentData.motherTongue}
                onChange={handleChange}
              />
              {errors.motherTongue && (
                <div className="text-red-500">{errors.motherTongue}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Enrollment number:</label>
              <input
                type="text"
                className="border border-black  "
                name="enrollmentNumber"
                value={studentData.enrollmentNumber}
                onChange={handleChange}
                readOnly
              />
              {errors.enrollmentNumber && (
                <div className="text-red-500">{errors.enrollmentNumber}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Social category:</label>
              <input
                type="text"
                className="border border-black  "
                name="socialcategory"
                value={studentData.socialcategory}
                onChange={handleChange}
              />
              {errors.socialcategory && (
                <div className="text-red-500">{errors.socialcategory}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Application number:</label>
              <input
                type="text"
                className="border border-black  "
                name="applicationNumber"
                value={studentData.applicationNumber}
                onChange={handleChange}
                readOnly
              />
              {errors.applicationNumber && (
                <div className="text-red-500">{errors.applicationNumber}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>Maritial status:</label>
              <input
                type="text"
                className="border border-black  "
                name="maritialStatus"
                value={studentData.maritialStatus}
                onChange={handleChange}
              />
              {errors.maritialStatus && (
                <div className="text-red-500">{errors.maritialStatus}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>Registration number:</label>
              <input
                type="text"
                className="border border-black  "
                name="regno"
                value={studentData.regno}
                onChange={handleChange}
                readOnly
              />
              {errors.regno && (
                <div className="text-red-500">{errors.regno}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>Academic year:</label>
              <input
                type="text"
                className="border border-black  "
                name="academicYear"
                value={studentData.academicYear}
                onChange={handleChange}
                readOnly
              />
              {errors.academicYear && (
                <div className="text-red-500">{errors.academicYear}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>Branch:</label>
              <input
                type="text"
                className="border border-black  "
                name="branch"
                value={studentData.branch}
                onChange={handleChange}
                readOnly
              />
              {errors.branch && (
                <div className="text-red-500">{errors.branch}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>Domicile status:</label>
              <input
                type="text"
                className="border border-black  "
                name="domicileStatus"
                value={studentData.domicileStatus}
                onChange={handleChange}
              />
              {errors.domicileStatus && (
                <div className="text-red-500">{errors.domicileStatus}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Course:</label>
              <input
                type="text"
                className="border border-black  "
                name="course"
                value={studentData.course}
                onChange={handleChange}
                readOnly
              />
              {errors.course && (
                <div className="text-red-500">{errors.course}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>Adhar card:</label>
              <input
                type="text"
                className="border border-black  "
                name="adharCard"
                value={studentData.adharCard}
                onChange={handleChange}
              />
              {errors.adharCard && (
                <div className="text-red-500">{errors.adharCard}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Date of joining:</label>
              <input
                type="Date"
                className="border border-black  "
                name="dateOfJoining"
                value={studentData.dateOfJoining}
                onChange={handleChange}
                readOnly
              />
              {errors.dateOfJoining && (
                <div className="text-red-500">{errors.dateOfJoining}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Name as on Adhar card:</label>
              <input
                type="text"
                className="border border-black  "
                name="nameOnAdharCard"
                value={studentData.nameOnAdharCard}
                onChange={handleChange}
                readOnly
              />
              {errors.nameOnAdharCard && (
                <div className="text-red-500">{errors.nameOnAdharCard}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Date of birth:</label>
              <input
                type="Date"
                className="border border-black  "
                name="dateOfBirth"
                value={studentData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && (
                <div className="text-red-500">{errors.dateOfBirth}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Official correspondance email:</label>
              <input
                type="text"
                className="border border-black  "
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
            <div className="flex flex-col"> <label>Gender:</label>
              <select
                className="  border border-black"
                name="gender"
                value={studentData.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col"> <label>Official correspondance number:</label>
              <input
                type="text"
                className="border border-black  "
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
            <div className="flex flex-col"> <label>Present mobile number: </label>
              <input
                type="text"
                className="border border-black  "
                name="presentMobileNumber"
                value={studentData.presentMobileNumber}
                onChange={handlephoneChange}
              />
              {errors.presentMobileNumber && (
                <div className="text-red-500">{errors.presentMobileNumber}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Emergency contact number:</label>
              <input
                type="text"
                className="border border-black  "
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
            <div className="flex flex-col"> <label>Previous mobile number:</label>
              <input
                type="text"
                className="border border-black  "
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
            <div className="flex flex-col"> <label>Social media account:</label>
              <input
                type="text"
                className="border border-black  "
                name="socialMediaAccount"
                value={studentData.socialMediaAccount}
                onChange={handleChange}
              />
              {errors.socialMediaAccount && (
                <div className="text-red-500">{errors.socialMediaAccount}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Email id:</label>
              <input
                type="text"
                className="border border-black  "
                name="emailId"
                value={studentData.emailId}
                onChange={handleChange}
              />
              {errors.emailId && (
                <div className="text-red-500">{errors.emailId}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Number of credits earned:</label>
              <input
                type="text"
                className="border border-black  "
                name="numberOfCreditsEarned"
                value={studentData.numberOfCreditsEarned}
                onChange={handleChange}
                readOnly
              />
              {errors.numberOfCreditsEarned && (
                <div className="text-red-500">
                  {errors.numberOfCreditsEarned}
                </div>
              )}
            </div>
            <div className="flex flex-col"> <label>Blood group:</label>
              <input
                type="text"
                className="border border-black  "
                name="bloodGroup"
                value={studentData.bloodGroup}
                onChange={handleChange}
              />
              {errors.bloodGroup && (
                <div className="text-red-500">{errors.bloodGroup}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Category of admission:</label>
              <input
                type="text"
                className="border border-black  "
                name="categoryOfAdmission"
                value={studentData.categoryOfAdmission}
                onChange={handleChange}
                readOnly
              />
              {errors.categoryOfAdmission && (
                <div className="text-red-500">{errors.categoryOfAdmission}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Nationality:</label>
              <input
                type="text"
                className="border border-black  "
                name="nationality"
                value={studentData.nationality}
                onChange={handleChange}
              />
              {errors.nationality && (
                <div className="text-red-500">{errors.nationality}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Religion:</label>
              <input
                type="text"
                className="border border-black  "
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
              className="bg-blue-500 rounded-md w-20 h-auto text-white text-22"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    );
  };

  const renderParentForm = () => {
    return (

      <section class="flex justify-center">
        <form class="relative w-80 md:w-3/4 sm:w-3/4 md:h-auto lg:text-md md:text-md text-left"  onSubmit={handleparentdetails}>
    <div class="md:text-6 relative text-center pb-1 pt-5 sm:text-2xl">Parent Details</div>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 md:gap-4 sm:gap-2 mt-8">
            <div className="flex flex-col"> <label>Enrollment number:</label>
              <input
                type="text"
                className="border border-black  "
                name="enrollmentNumber"
                value={parentData.enrollmentNumber}
                onChange={handleparentChange}
                readOnly
              />
              {parenterrors.enrollmentNumber && (
                <div className="text-red-500">{parenterrors.enrollmentNumber}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Father`s Name:</label>
              <input
                type="text"
                className="border border-black  "
                name="fatherName"
                value={parentData.fatherName}
                onChange={handleparentChange}
                readOnly
              />
              {parenterrors.fatherName && (
                <div className="text-red-500">{parenterrors.fatherName}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Father`s contact number:</label>
              <input
                type="text"
                className="border border-black  "
                name="fatherContactNumber"
                value={parentData.fatherContactNumber}
                onChange={handleparentphoneChange}
              />
              {parenterrors.fatherContactNumber && (
                <div className="text-red-500">{parenterrors.fatherContactNumber}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Father`s Occupation:</label>
              <input
                type="text"
                className="border border-black  "
                name="fatherOccupation"
                value={parentData.fatherOccupation}
                onChange={handleparentChange}
              />
              {parenterrors.fatherOccupation && (
                <div className="text-red-500">{parenterrors.fatherOccupation}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Father`s email id:</label>
              <input
                type="text"
                className="border border-black  "
                name="fatherEmailId"
                value={parentData.fatherEmailId}
                onChange={handleparentChange}
              />
              {parenterrors.fatherEmailId && (
                <div className="text-red-500">{parenterrors.fatherEmailId}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>Mother`s Name:</label>
              <input
                type="text"
                className="border border-black  "
                name="motherName"
                value={parentData.motherName}
                onChange={handleparentChange}
                readOnly
              />
              {parenterrors.motherName && (
                <div className="text-red-500">{parenterrors.motherName}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Mother`s contact number:</label>
              <input
                type="text"
                className="border border-black  "
                name="motherContactNumber"
                value={parentData.motherContactNumber}
                onChange={handleparentphoneChange}
              />
              {parenterrors.motherContactNumber && (
                <div className="text-red-500">{parenterrors.motherContactNumber}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Mother`s Occupation:</label>
              <input
                type="text"
                className="border border-black  "
                name="motherOccupation"
                value={parentData.motherOccupation}
                onChange={handleparentChange}
              />
              {parenterrors.motherOccupation && (
                <div className="text-red-500">{parenterrors.motherOccupation}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Mother`s email id:</label>
              <input
                type="text"
                className="border border-black  "
                name="motherEmailId"
                value={parentData.motherEmailId}
                onChange={handleparentChange}
              />
              {parenterrors.motherEmailId && (
                <div className="text-red-500">{parenterrors.motherEmailId}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Guardian Name:</label>
              <input
                type="text"
                className="border border-black  "
                name="guardianName"
                value={parentData.guardianName}
                onChange={handleparentChange}
                readOnly
              />
              {parenterrors.guardianName && (
                <div className="text-red-500">{parenterrors.guardianName}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Guardian contact number:</label>
              <input
                type="text"
                className="border border-black  "
                name="guardianContactNumber"
                value={parentData.guardianContactNumber}
                onChange={handleparentphoneChange}
              />
              {parenterrors.guardianContactNumber && (
                <div className="text-red-500">
                  {parenterrors.guardianContactNumber}
                </div>
              )}
            </div>
            <div className="flex flex-col"> <label>Guardian Occupation:</label>
              <input
                type="text"
                className="border border-black  "
                name="guardianOccupation"
                value={parentData.guardianOccupation}
                onChange={handleparentChange}
              />
              {parenterrors.guardianOccupation && (
                <div className="text-red-500">{parenterrors.guardianOccupation}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Guardian email id:</label>
              <input
                type="text"
                className="border border-black  "
                name="guardianEmailId"
                value={parentData.guardianEmailId}
                onChange={handleparentChange}
              />
              {parenterrors.guardianEmailId && (
                <div className="text-red-500">{parenterrors.guardianEmailId}</div>
              )}
            </div>
            <div className="flex flex-col"> <label>Bank account number:</label>
              <input
                type="text"
                className="border border-black  "
                name="bankAccountNumber"
                value={parentData.bankAccountNumber}
                onChange={handleparentChange}
              />
              {parenterrors.bankAccountNumber && (
                <div className="text-red-500">{parenterrors.bankAccountNumber}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>Account holder Name:</label>
              <input
                type="text"
                className="border border-black  "
                name="accountHolderName"
                value={parentData.accountHolderName}
                onChange={handleparentChange}
              />
              {parenterrors.accountHolderName && (
                <div className="text-red-500">{parenterrors.accountHolderName}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>IFSC code:</label>
              <input
                type="text"
                className="border border-black  "
                name="ifscCode"
                value={parentData.ifscCode}
                onChange={handleparentChange}
              />
              {parenterrors.ifscCode && (
                <div className="text-red-500">{parenterrors.ifscCode}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>Branch:</label>
              <input
                type="text"
                className="border border-black  "
                name="branch"
                value={parentData.branch}
                onChange={handleparentChange}
              />
              {parenterrors.branch && (
                <div className="text-red-500">{parenterrors.branch}</div>
              )}
            </div>

            <div className="flex flex-col"> <label>PAN card number:</label>
              <input
                type="text"
                className="border border-black  "
                name="panCardNumber"
                value={parentData.panCardNumber}
                onChange={handleparentChange}
              />
              {parenterrors.panCardNumber && (
                <div className="text-red-500">{parenterrors.panCardNumber}</div>
              )}
            </div>
          </div>
          <div className="flex sm:justify-self-center md:justify-center mt-8 gap-5">
            <button
              type="submit"
              name="parentSave"
              value="parentSave"
              className=" bg-blue-500 rounded-md w-20 h-auto text-white text-22"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    );
  };

  return (
    <div className="absolute container">
      {/* Your other components go here */}
      <div className="absolute mt-10 left-60 lg:gap-10 sm:gap-1 flex justify-start sm:w-auto sm:h-auto">
        <button
          className={`w-48 h-10  pl-1 pt-1 text-lg md:text-md focus:outline-none ${
            addEditStudentClicked
              ? "bg-white text-blue-500 focus:ring-4 rounded-lg focus:outline-none focus:ring-blue-300"
              : "bg-blue-500 text-white rounded-lg"
          }`}
          onClick={handleAddEditStudentClick}
        >
          Student Details
        </button>

        <button
          className={`w-48 h-10  pl-1 pt-1 text-lg md:text-md focus:outline-none ${
            parentDetailsClicked
              ? "bg-white text-blue-500 focus:ring-4 rounded-lg focus:outline-none focus:ring-blue-300"
              : "bg-blue-500 text-white   rounded-lg "
          }`}
          onClick={handleParentDetailsClick}
        >
          Parent Details
        </button>
      </div>

      {showStudentCard && (
        <div className="overflow-auto absolute top-20 w-75vw mt-3 ml-60 h-60vh border-2 border-blue-500 rounded-2xl">
          {renderStudentForm()}
        </div>
      )}

      {showParentCard && (
        <div className="overflow-auto absolute top-20 w-75vw mt-3 ml-60 h-60vh border-2 border-blue-500 rounded-2xl">
          {renderParentForm()}
        </div>
      )}
    </div>
  );
};

export default Profilestudent;
