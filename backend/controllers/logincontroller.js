import { Admin } from '../models/admin.js';
import { FacultyLogin, FacultyDetails } from "../models/faculty.js";
import { StudentLogin, StudentDetails } from "../models/student.js";
import { Parent } from "../models/parentdetails.js";

import { connectDB, closeDB } from "../config/db.js";
import asyncHandler from "express-async-handler";



// Unified login route handler
const unifiedLogin = asyncHandler(async (req, res) => {
  const { emailId, password } = req.body;
  console.log("Received credentials:", { emailId, password });

  try {
    // Try Admin login
    const admin = await Admin.findOne({ emailId, password });
    if (admin) {
      console.log("Admin successfully logged in");
      return res.json({ message: "Admin" });
    }

    // Try Faculty login
    const faculty = await FacultyLogin.findOne({ emailId, password });
    if (faculty) {
      const facultyDetails = await FacultyDetails.findOne({ emailId });
      if (facultyDetails && facultyDetails.designation === "HOD") {
        console.log("HOD logged in");
        return res.json({
          message: "HOD",
          email: emailId,
          designation: "HOD",
        });
      }
      console.log("Faculty successfully logged in");
      return res.json({ message: "Faculty" });
    }

    // Try Student login
    const student = await StudentLogin.findOne({ emailId, password });
    if (student) {
      const studentDetails = await StudentDetails.findOne({ emailId });
      if (!studentDetails) {
        console.log("Student details not found for email:", emailId);
        return res.status(404).json({ error: "Student details not found" });
      }
      console.log("Student successfully logged in");
      return res.json({
        message: "Student",
        enrollmentNumber: Parent.enrollmentNumber,
        email: emailId,
      });
    }
  } catch (error) {
    // If no user is found in any category
    console.log("Invalid credentials:", { emailId, password });
    res.status(401).json({ error: "Invalid credentials" });
  }
});

export {
  unifiedLogin
};
