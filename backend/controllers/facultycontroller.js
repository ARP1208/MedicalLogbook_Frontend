import { FacultyDetails, FacultyLogin } from '../models/faculty.js';
import { connectDB, closeDB } from '../config/db.js';
import nodemailer from 'nodemailer';

import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();


const faculty = asyncHandler(async (req, res) => {

  console.log("Received data:", req.body);
  try {

    await connectDB();
    const newfaculty = new FacultyDetails(req.body);
    const savedfaculty = await newfaculty.save();
    console.log("saved data is: ", savedfaculty)

    res.status(201).json({ message: 'savedfaculty' });
  } catch (error) {
    console.error('Error saving faculty document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {

    await closeDB();
  }
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shettytejas96@gmail.com',
    pass: 'ndhg gltd onks xuan',
  },
});


const facultymail = asyncHandler(async (req, res) => {
  const { emailId, applicationNumber, } = req.body;
  console.log('Received credentials:', emailId);
  const password = applicationNumber;
  try {
    const mailOptions = {
      from: 'prajwalshetty@gmail.com',
      to: emailId,
      subject: 'Welcome to Your App',
      text: `Thank you for registering! Your login credentials:\n\nEmail: ${emailId}\nPassword: ${applicationNumber}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });


    await connectDB();
    const newFacultyLogin = new FacultyLogin({ emailId, password });
    const savedFacultyLogin = await newFacultyLogin.save();
    console.log("successfully login data saved data is: ", savedFacultyLogin)


    console.log("sent email is: ", emailId)

    res.status(200).json({ success: true, message: 'Faculty email sent successfully and also saved in the database' });
  } catch (error) {
    console.error('Error saving faculty details:', error);
    res.status(500).json({ success: false, message: 'Error saving faculty' });
  }


});

const searchfaculty = asyncHandler(async (req, res) => {
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

  console.log("Received credentials:", {
    searchTerm
  });


  try {
    await connectDB();

    // Build the $or array dynamically based on the provifacultynameded parameters
    const orConditions = [];
    const facultyid = parseFloat(searchTerm);

    if (!isNaN(facultyid) && Number.isInteger(facultyid)) {
      orConditions.push({ facultyid });
    } else {
      // If searchTerm is not a valid number, search by name or programBranch
      orConditions.push({ facultyname: { $regex: String(searchTerm), $options: "i" } });
      orConditions.push({ department: { $regex: searchTerm, $options: "i" } });
    }




    // Use the dynamically built $or array in the query
    const query = { $or: orConditions };

    console.log("Query:", query);

    // Find faculty that match any of the specified conditions
    const srhfaculty = await FacultyDetails.find(query);
    console.log("data to be sent to frontend:", srhfaculty);


    if (!srhfaculty || srhfaculty.length === 0) {
      return res.status(404).json({ success: false, message: "faculty not found" });
    }

    res.status(200).json({
      success: true,
      message: "faculty found",
      facultyData: srhfaculty,
    });
  } catch (error) {
    console.error("Error searching student:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

});
const UpdateFacultyDetails = asyncHandler(async (req, res) => {
  console.log("Received data for update:", req.body);
  const { facultyid } = req.body;
  try {
    await connectDB();
    const Facultydetail = facultyid;
    console.log("student ID", Facultydetail);
    const newUpdatefaculty = { ...req.body };


    const UpdatedFaculty = await FacultyDetails.updateOne({ facultyid: Facultydetail }, { $set: newUpdatefaculty });
    console.log("saved data is: ", UpdatedFaculty);

    res.status(201).json({ message: "UpdatedFaculty" });
  } catch (error) {
    console.error("Error saving student document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});








export { faculty, facultymail, searchfaculty, UpdateFacultyDetails };