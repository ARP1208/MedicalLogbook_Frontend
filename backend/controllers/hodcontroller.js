import express from "express";
import asyncHandler from "express-async-handler";
import { hodlogin } from "../models/hod.js";
import { FacultyDetails } from "../models/faculty.js";
import { Assignedsubject } from '../models/admin.js';
const router = express.Router();


/////////HOD  login and fetching the data to display in faculty profile./////////////
const hodlogindata = asyncHandler(async (req, res) => {
  const { emailId, password } = req.body;

  console.log("Received credentials:", { emailId, password });

  try {
    // Find the user with the provided email and designation of HOD
    const facultylog = await hodlogin.findOne({ emailId, password });

    console.log(facultylog);

    if (!facultylog) {
      console.log("Invalid credentials or not HOD:", { emailId, password });
      res.status(401).json({ error: "Invalid credentials or not HOD" });
    } else {
      // Passwords match, send a success message
      console.log("HOD successfully logged in");

      // Fetch HOD details data
      const facultyDetails = await FacultyDetails.findOne({ emailId });

      if (facultyDetails) {
        // HOD details found, send the details to the client
        console.log("HOD details fetched:", facultyDetails);

        // Fetch all the academic years from the indican database
        const academicYears = await Assignedsubject.find().distinct("AcademicYear.year");

        // Send the academic years to the frontend
        res.json({
          message: "Successfully logged in as HOD!",
          facultyDetails,
          academicYears,
        });
      } else {
        // HOD details not found
        console.log("HOD details not found for email:", emailId);
        res.status(404).json({ error: "HOD details not found" });
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


////////////Registration Component ////////////////////////


export { hodlogindata }