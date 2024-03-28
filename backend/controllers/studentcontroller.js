import { StudentDetails, StudentLogin, TaskAssignStudent, StudentAssessmentMark } from "../models/student.js";
import { Assignedsubject } from '../models/admin.js';
import { TaskAssign, AddAssessment } from "../models/faculty.js";
import { connectDB, closeDB } from "../config/db.js";
import nodemailer from "nodemailer";
import Parent from "../models/parentdetails.js";
import express from "express";
import asyncHandler from "express-async-handler";


/////////Student login and fetching the data to display in Student profile./////////////
// const Studentlogin = asyncHandler(async (req, res) => {
//   const { emailId, password } = req.body;

//   console.log("Received credentials:", { emailId, password });

//   try {
//     // Find the admin with the provided email
//     const studentlog = await StudentLogin.findOne({ emailId, password });

//     console.log(studentlog);

//     if (!studentlog) {
//       console.log("Invalid credentials:", { emailId, password });
//       res.status(401).json({ error: "Invalid credentials" });
//     } else {
//       // Passwords match, send a success message
//       console.log("Student successfully logged in");

//       // Fetch student details data
//       const studentDetails = await StudentDetails.findOne({ emailId });

//       if (studentDetails) {
//         // student details found, send the details to the client
//         console.log("Student details fetched:", studentDetails);

//         // // Fetch all the academic years from the indican database
//         // const academicYears = await Assignedsubject.find().distinct(
//         //   "AcademicYear.year"
//         // );

//         // Send the academic years to the frontend
//         res.json({
//           message: "Successfully logged in!",
//           studentDetails,
//           // academicYears,
//         });
//       } else {
//         // Student details not found
//         console.log("Student details not found for email:", emailId);
//         res.status(404).json({ error: "Student details not found" });
//       }
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

const Studentlogin = asyncHandler(async (req, res) => {
  const { emailId, password } = req.body;

  console.log("Received credentials:", { emailId, password });

  try {
    // Find the student with the provided email and password
    const studentLog = await StudentLogin.findOne({ emailId, password });

    console.log(studentLog);

    if (!studentLog) {
      console.log("Invalid credentials:", { emailId, password });
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Fetch student details data
    const studentDetails = await StudentDetails.findOne({ emailId });

    if (!studentDetails) {
      console.log("Student details not found for email:", emailId);
      return res.status(404).json({ error: "Student details not found" });
    }

    // Extract regno from studentDetails
    const regno = studentDetails.regno;

    // Fetch data from Assignedsubject using regno
    const assignedSubjects = await Assignedsubject.findOne({
      "AcademicYear.program.semesters.sections.students.regno": regno
    });

    if (!assignedSubjects) {
      // Data not found in Assignedsubject
      console.log("Assigned subject details not found for regno:", regno);
      return res.status(404).json({ error: "Assigned subject details not found" });
    }

    // Data found, extract necessary information
    console.log("Assigned subject details fetched:", assignedSubjects);

    res.json({
      message: "Successfully logged in!",
      studentDetails,
      regno,
      assignedSubjects
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const student = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  try {
    await connectDB();
    const newStudent = new StudentDetails(req.body);
    const savedStudent = await newStudent.save();
    console.log("saved data is: ", savedStudent);

    res.status(201).json({ message: "savedStudent" });
  } catch (error) {
    console.error("Error saving student document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await closeDB();
  }
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shettytejas96@gmail.com",
    pass: "ndhg gltd onks xuan",
  },
});

const studentmail = asyncHandler(async (req, res) => {
  const { emailId, applicationNumber, enrollmentNumber } = req.body;
  console.log("Received credentials:", emailId);
  const password = applicationNumber;
  try {
    const mailOptions = {
      from: "shettytejas96@gmail.com",
      to: emailId,
      subject: "Welcome to Your App",
      text: `Thank you for registering! Your login credentials:\n\nEmail: ${emailId}\nPassword: ${applicationNumber}\n\n Update the password with your enrollement number:- ${enrollmentNumber}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    await connectDB();
    const newStudentLogin = new StudentLogin({ emailId, password });
    const savedStudentLogin = await newStudentLogin.save();
    console.log("successfully login data saved data is: ", savedStudentLogin);

    console.log("sent email is: ", emailId);

    res.status(200).json({
      success: true,
      message: "Student email sent successfully and also saved in the database",
    });
  } catch (error) {
    console.error("Error saving student details:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving student details" });
  }
});

const parent = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  try {
    // Connect to the MongoDB database
    await connectDB();

    const newParent = new Parent(req.body);

    const savedParent = await newParent.save();

    console.log("saved data is: ", savedParent);

    // Respond with the saved parent details
    res.status(201).json({ message: "data saved" });
  } catch (error) {
    console.error("Error saving parent document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    await closeDB();
  }
});

const searchStudent = asyncHandler(async (req, res) => {
  const { searchTerm } = req.body;
  console.log("Received credentials:", {
    searchTerm 
  });

  // Check if searchTerm is empty
  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Please provide a non-empty search parameter",
    });
  }



  try {
    await connectDB();

    // Build the $or array dynamically based on the provided search term
    const orConditions = [];

    // Check if searchTerm is a valid number (enrollmentNumber)
    const regno = parseFloat(searchTerm);
    if (!isNaN(regno) && Number.isInteger(regno)) {
      orConditions.push({ regno });
    } else {
      // If searchTerm is not a valid number, search by name or programBranch
      orConditions.push({ studentname: { $regex: String(searchTerm), $options: "i" } });
      orConditions.push({ course: { $regex: searchTerm, $options: "i" } });
    }

    // Use the dynamically built $or array in the query
    const query = { $or: orConditions };

    console.log("Query:", query);

    // Find students that match any of the specified conditions
    const srhStudent = await StudentDetails.find(query);
    console.log("data to be sent to frontend:", srhStudent);

    if (!srhStudent || srhStudent.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student found",
      studentData: srhStudent,
    });
  } catch (error) {
    console.error("Error searching student:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    await closeDB();
  }
});

const UpdateStudentDetails = asyncHandler(async (req, res) => {
  console.log("Received data for update:", req.body);
  const {enrollmentNumber } = req.body;
  try {
    await connectDB();
    const studentId = enrollmentNumber;
    console.log("student ID",studentId);
    const newUpdateStudent = {...req.body};
  

    const UpdatedStudent = await StudentDetails.updateOne({ enrollmentNumber: studentId }, { $set: newUpdateStudent });
    console.log("saved data is: ", UpdatedStudent);

    res.status(201).json({ message: "UpdatedStudent" });
  } catch (error) {
    console.error("Error updating student document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await closeDB();
  }
});


///////////PG log Component///////////////////////////////////////
const saveTaskAssignStudent = asyncHandler(async (req, res) => {
  console.log("Received data for saving task assignment:", req.body);
  const { Task_ID } = req.body;

  try {
    // Check if Task_ID already exists
    const existingTask = await TaskAssignStudent.findOne({ Task_ID });
    if (existingTask) {
      console.error("Task_ID already exists:", Task_ID);
      return res.status(400).json({ error: "Task_ID already exists" });
    }

    // Save the new task assignment
    const newTask = new TaskAssignStudent(req.body);
    const savedTask = await newTask.save();
    console.log("Saved task assignment:", savedTask);

    // Connect to DB
    await connectDB();
    console.log("updated task ID", Task_ID);

    // Define the update operation to set Task_Completed to "completed"
    const updateOperation = {
      $set: { Task_Completed: "completed" }
    };

    // Use TaskAssign.updateOne to update the specified task
    const UpdatedTask = await TaskAssign.updateOne(
      { Task_ID },
      updateOperation
    );

    console.log("saved data is: ", UpdatedTask);

    res.status(201).json({ message: "Task assigned successfully and faculty task updated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const onclickCheckInUpdateTaskAssign = asyncHandler(async (req, res) => {
  console.log("Received data for update:", req.body);
  const { Task_ID } = req.body;
  try {
    await connectDB();
    const Taskdetail = Task_ID;
    console.log("updated task ID", Taskdetail);

    // Define the update operation to set Task_Completed to "yet to complete"
    const updateOperation = {
      $set: { Task_Completed: "yet to complete" }
    };

    // Use TaskAssign.updateOne to update the specified task
    const UpdatedTask = await TaskAssign.updateOne(
      { Task_ID: Taskdetail },
      updateOperation
    );

    console.log("saved data is: ", UpdatedTask);

    res.status(201).json({ message: "UpdatedTaskAssign" });
  } catch (error) {
    console.error("Error saving UpdatedTaskAssign document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const fetchStudentAssessment = async (req, res) => {
  try {
    const { regno } = req.body;

    // Find the student details using the registration number
    const studentDetails = await StudentDetails.findOne({ regno });

    // If student details not found, return 404 error
    if (!studentDetails) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Find the assigned subject using the registration number
    const assignSubject = await Assignedsubject.findOne({ 'AcademicYear.program.semesters.sections.students.regno': regno });

    if (!assignSubject) {
      return res.status(404).json({ error: "AssignSubject not found" });
    }

    // Extract specific academic year, program, semester, section details
    const academicYear = assignSubject.AcademicYear.year;
    const programName = assignSubject.AcademicYear.program[0].programname;
    const semesterNumber = assignSubject.AcademicYear.program[0].semesters[0].semesterNumber;
    const sectionName = assignSubject.AcademicYear.program[0].semesters[0].sections[0].sectionName;

    // Find academic year in AddAssessment database
    const academicYearFound = await AddAssessment.findOne({
      'AcademicYear.year': academicYear
    });

    if (!academicYearFound) {
      return res.status(404).json({ error: "Academic year not found" });
    }

    // Find program inside academic year
    const programFound = academicYearFound.AcademicYear.program.find(program => program.programname === programName);

    if (!programFound) {
      return res.status(404).json({ error: "Program not found" });
    }

    // Find semester inside program
    const semesterFound = programFound.semesters.find(semester => semester.semesterNumber === semesterNumber);

    if (!semesterFound) {
      return res.status(404).json({ error: "Semester not found" });
    }

    // Find section inside semester
    const sectionFound = semesterFound.sections.find(section => section.sectionName === sectionName);

    if (!sectionFound) {
      return res.status(404).json({ error: "Section not found" });
    }

    // Extract assessments for the found section
    const assessments = sectionFound.assessment;

    // If assessments not found, return 404 error
    if (!assessments || assessments.length === 0) {
      return res.status(404).json({ error: "Assessments not found" });
    }

    // Send 200 success response with assessments
    return res.status(200).json({   academicYear,
      programName,
      semesterNumber,
      sectionName,
      assessments
     });
  } catch (error) {
    // Handle any errors and send 500 error response
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};






export { Studentlogin ,student, parent, studentmail, searchStudent, UpdateStudentDetails, saveTaskAssignStudent, onclickCheckInUpdateTaskAssign, fetchStudentAssessment};
