import {
  FacultyDetails,
  FacultyLogin,
  TaskAssign,
  PreviewTask,
  AssignMarks,
} from "../models/faculty.js";
import { Assignedsubject } from "../models/admin.js";
import { connectDB, closeDB } from "../config/db.js";
import nodemailer from "nodemailer";

import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

/////////faculty login and fetching the data to display in faculty profile./////////////
const Facultylogin = asyncHandler(async (req, res) => {
  const { emailId, password } = req.body;

  console.log("Received credentials:", { emailId, password });

  try {
    // Find the admin with the provided email
    const facultylog = await FacultyLogin.findOne({ emailId, password });

    console.log(facultylog);

    if (!facultylog) {
      console.log("Invalid credentials:", { emailId, password });
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      // Passwords match, send a success message
      console.log("Faculty successfully logged in");

      // Fetch faculty details data
      const facultyDetails = await FacultyDetails.findOne({ emailId });

      if (facultyDetails) {
        // Faculty details found, send the details to the client
        console.log("Faculty details fetched:", facultyDetails);

        // Fetch all the academic years from the indican database
        const academicYears = await Assignedsubject.find().distinct(
          "AcademicYear.year"
        );

        // Send the academic years to the frontend
        res.json({
          message: "Successfully logged in!",
          facultyDetails,
          academicYears,
        });
      } else {
        // Faculty details not found
        console.log("Faculty details not found for email:", emailId);
        res.status(404).json({ error: "Faculty details not found" });
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const faculty = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  try {
    await connectDB();
    const newfaculty = new FacultyDetails(req.body);
    const savedfaculty = await newfaculty.save();
    console.log("saved data is: ", savedfaculty);

    res.status(201).json({ message: "savedfaculty" });
  } catch (error) {
    console.error("Error saving faculty document:", error);
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

const facultymail = asyncHandler(async (req, res) => {
  const { emailId, applicationNumber } = req.body;
  console.log("Received credentials:", emailId);
  const password = applicationNumber;
  try {
    const mailOptions = {
      from: "prajwalshetty@gmail.com",
      to: emailId,
      subject: "Welcome to Your App",
      text: `Thank you for registering! Your login credentials:\n\nEmail: ${emailId}\nPassword: ${applicationNumber}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    await connectDB();
    const newFacultyLogin = new FacultyLogin({ emailId, password });
    const savedFacultyLogin = await newFacultyLogin.save();
    console.log("successfully login data saved data is: ", savedFacultyLogin);

    console.log("sent email is: ", emailId);

    res.status(200).json({
      success: true,
      message: "Faculty email sent successfully and also saved in the database",
    });
  } catch (error) {
    console.error("Error saving faculty details:", error);
    res.status(500).json({ success: false, message: "Error saving faculty" });
  }
});

const searchfaculty = asyncHandler(async (req, res) => {
  const { searchTerm } = req.body;
  console.log("Received credentials:", {
    searchTerm,
  });
  // Check if searchTerm is empty
  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Please provide a non-empty search parameter",
    });
  }

  console.log("Received credentials:", {
    searchTerm,
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
      orConditions.push({
        facultyname: { $regex: String(searchTerm), $options: "i" },
      });
      orConditions.push({ department: { $regex: searchTerm, $options: "i" } });
    }

    // Use the dynamically built $or array in the query
    const query = { $or: orConditions };

    console.log("Query:", query);

    // Find faculty that match any of the specified conditions
    const srhfaculty = await FacultyDetails.find(query);
    console.log("data to be sent to frontend:", srhfaculty);

    if (!srhfaculty || srhfaculty.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "faculty not found" });
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
    console.log("faculty ID", Facultydetail);
    const newUpdatefaculty = { ...req.body };

    const UpdatedFaculty = await FacultyDetails.updateOne(
      { facultyid: Facultydetail },
      { $set: newUpdatefaculty }
    );
    console.log("saved data is: ", UpdatedFaculty);

    res.status(201).json({ message: "UpdatedFaculty" });
  } catch (error) {
    console.error("Error saving student document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const saveTaskAssign = asyncHandler(async (req, res) => {
  try {
    const newTask = new TaskAssign(req.body);
    const savedTask = await newTask.save();
    console.log("saved data is: ", savedTask);

    res.status(201).json({ message: "savedTaskAssigned" });
  } catch (error) {
    console.error("Error saving savedTaskAssigned document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const searchTask = asyncHandler(async (req, res) => {
  const { searchTerm } = req.body;
  console.log("Received credentials:", { searchTerm });

  // Check if searchTerm is empty
  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Please provide a non-empty search parameter",
    });
  }

  try {
    await connectDB();

    // Split the searchTerm string into an array of individual terms
    const searchTermsArray = searchTerm.split(",").map((term) => term.trim());

    // Build the $or array dynamically for each search term
    const orConditions = [];

    searchTermsArray.forEach((term) => {
      orConditions.push({ "Students.Name": { $regex: term, $options: "i" } });
      orConditions.push({ Task_Name: { $regex: term, $options: "i" } });
      orConditions.push({ Task_ID: { $regex: term, $options: "i" } });
    });

    // Use the dynamically built $or array in the query
    const query = { $or: orConditions };
    console.log("Query:", query);

    // Find tasks that match any of the specified conditions
    const srhTask = await TaskAssign.find(query);
    console.log("Data to be sent to frontend:", srhTask);

    if (!srhTask || srhTask.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Records found",
      taskData: srhTask,
    });
  } catch (error) {
    console.error("Error searching records:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    await closeDB();
  }
});

//updatation code for Task Assignments

const updateTaskAssign = asyncHandler(async (req, res) => {
  console.log("Received data for update:", req.body);
  const { Task_ID } = req.body;
  try {
    await connectDB();
    const Taskdetail = Task_ID;
    console.log("updated task ID", Taskdetail);
    const newUpdateTask = { ...req.body };

    const UpdatedTask = await TaskAssign.updateOne(
      { Task_ID: Taskdetail },
      { $set: newUpdateTask }
    );
    console.log("saved data is: ", UpdatedTask);

    res.status(201).json({ message: "UpdatedTaskAssign" });
  } catch (error) {
    console.error("Error saving UpdatedTaskAssign document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//saving a Preview Task  in the database
const savePreviewTask = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  try {
    await connectDB();
    const newTask = new PreviewTask(req.body);
    const savedTask = await newTask.save();
    console.log("saved Tasked is: ", savedTask);

    res.status(201).json({ message: "savedTask" });
  } catch (error) {
    console.error("Error saving savedTask document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const fetchDetails = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const { AcademicYear, program, semesterNumber, sectionnames } = req.body;

    // Build a dynamic query based on provided parameters
    let query = {};
    if (AcademicYear) {
      query['AcademicYear.year'] = AcademicYear.year;
    }
    if (program) {
      query['AcademicYear.program.programname'] = program.programname;
    }

    // Check if data is available before accessing properties
    const data = await Assignedsubject.findOne(query);
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    // If semesterNumber is not provided, return the list of semester numbers for the program
    if (!program) {
      const programNames = data.AcademicYear.program.map(s => s.programname);
      return res.json({ programNames });
    }


    // Find the requested program
    const requestedProgram = data.AcademicYear.program.find(p => p.programname === program.programname);
    if (!requestedProgram) {
      return res.status(404).json({ error: `Program '${program.programname}' data not found` });
    }

    // If semesterNumber is not provided, return the list of semester numbers for the program
    if (!semesterNumber) {
      const semesterNumbers = requestedProgram.semesters.map(s => s.semesterNumber);
      return res.json({ semesterNumbers });
    }

    // Find the requested semester
    const requestedSemester = requestedProgram.semesters.find(s => s.semesterNumber === semesterNumber);
    if (!requestedSemester) {
      return res.status(404).json({ error: `Semester '${semesterNumber}' data not found` });
    }

    // If sectionnames is provided, filter out sections that match the provided section name
    let filteredSections = requestedSemester.sections;
    if (sectionnames) {
      filteredSections = requestedSemester.sections.filter(sec => sectionnames.includes(sec.sectionName));
    }

    // Extract section names of the requested semester
    const sectionNames = filteredSections.map(sec => sec.sectionName);
    console.log("Section Names:", sectionNames);
    if (!sectionNames) {
      return res.json({ error: `No sections found for the provided section names '${sectionnames}'` });
    }
    if (!sectionnames) {
      return res.json({ sectionNames }); // Only return section names if sectionnames is not provided
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


const saveAssignMarks = asyncHandler(async (req, res) => {
  console.log("Received marks data:", req.body);

  try {
    await connectDB();

    const { AcademicYear } = req.body;

    // Check if a document with the given AcademicYear already exists
    const existingDocument = await AssignMarks.findOne({ 'AcademicYear.year': AcademicYear.year });

    if (existingDocument) {
      const existingProgram = existingDocument.AcademicYear.program.find(program => program.programname === AcademicYear.program[0].programname);
      if (existingProgram) {
        const semesterIndex = existingProgram.semesters.findIndex(semester => semester.semesterNumber === AcademicYear.program[0].semesters[0].semesterNumber);
        if (semesterIndex !== -1) {
          const sectionIndex = existingProgram.semesters[semesterIndex].sections.findIndex(section => section.sectionName === AcademicYear.program[0].semesters[0].sections[0].sectionName);
          if (sectionIndex !== -1) {
            // Section exists, add or update marks for existing students
            const section = existingProgram.semesters[semesterIndex].sections[sectionIndex];
            AcademicYear.program[0].semesters[0].sections[0].subjects.forEach(subject => {
              const existingSubject = section.subjects.find(sub => sub.subjectcode === subject.subjectcode);
              if (existingSubject) {
                subject.students.forEach(student => {
                  const existingStudentIndex = existingSubject.students.findIndex(s => s.regNo === student.regNo);
                  if (existingStudentIndex !== -1) {
                    // Student already exists, update marks
                    student.Test.forEach(test => {
                      const existingTestIndex = existingSubject.students[existingStudentIndex].Test.findIndex(t => t.testname === test.testname);
                      if (existingTestIndex !== -1) {
                        existingSubject.students[existingStudentIndex].Test[existingTestIndex].marks = test.marks;
                      } else {
                        existingSubject.students[existingStudentIndex].Test.push(test);
                      }
                    });
                  } else {
                    // Student doesn't exist, add to the list
                    existingSubject.students.push(student);
                  }
                });
              } else {
                // Subject doesn't exist, add new subject with students
                section.subjects.push(subject);
              }
            });
          } else {
            // Section doesn't exist, add new section with subjects and students
            existingProgram.semesters[semesterIndex].sections.push(AcademicYear.program[0].semesters[0].sections[0]);
          }
        } else {
          // Semester doesn't exist, add new semester with sections, subjects, and students
          existingProgram.semesters.push(AcademicYear.program[0].semesters[0]);
        }
      } else {
        // Program doesn't exist, add new program with semesters, sections, subjects, and students
        existingDocument.AcademicYear.program.push(AcademicYear.program[0]);
      }

      const options = {
        new: true,
      };

      const result = await existingDocument.save();
      console.log(result);

      res.status(200).json({ success: true, message: 'Marks updated successfully' });
    } else {
      // If no document exists, create a new one
      const newMarksDocument = new AssignMarks({
        AcademicYear,
      });

      const savedMarksDocument = await newMarksDocument.save();
      console.log("Saved marks data is:", savedMarksDocument);

      res.status(201).json({ message: 'Marks saved successfully' });
    }
  } catch (error) {
    console.error('Error saving marks document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const updateAssignMarks = asyncHandler(async (req, res) => {
  console.log("Received updated marks data:", req.body);
  try {
    await connectDB();

    const { AcademicYear } = req.body;

    // Check if a document with the given AcademicYear already exists
    const existingDocument = await AssignMarks.findOne({
      "AcademicYear.year": AcademicYear.year,
    });

    if (existingDocument) {
      const { program } = AcademicYear;

      // Iterate through each program in the AcademicYear
      for (const programData of program) {
        const { programname, semesters } = programData;

        // Find the existing program or add a new one
        let existingProgram = existingDocument.AcademicYear.program.find(
          (prog) => prog.programname === programname
        );
        if (!existingProgram) {
          existingProgram = { programname, semesters: [] };
          existingDocument.AcademicYear.program.push(existingProgram);
        }

        // Iterate through each semester in the program
        for (const semesterData of semesters) {
          const { semesterNumber, sections } = semesterData;

          // Find the existing semester or add a new one
          let existingSemester = existingProgram.semesters.find(
            (sem) => sem.semesterNumber === semesterNumber
          );
          if (!existingSemester) {
            existingSemester = { semesterNumber, sections: [] };
            existingProgram.semesters.push(existingSemester);
          }

          // Iterate through each section in the semester
          for (const sectionData of sections) {
            const { sectionName, subjects } = sectionData;

            // Find the existing section or add a new one
            let existingSection = existingSemester.sections.find(
              (sec) => sec.sectionName === sectionName
            );
            if (!existingSection) {
              existingSection = { sectionName, subjects: [] };
              existingSemester.sections.push(existingSection);
            }

            // Iterate through each subject in the section
            for (const subjectData of subjects) {
              const { subjectcode, students } = subjectData;

              // Find the existing subject or add a new one
              let existingSubject = existingSection.subjects.find(
                (sub) => sub.subjectcode === subjectcode
              );
              if (!existingSubject) {
                existingSubject = { subjectcode, students: [] };
                existingSection.subjects.push(existingSubject);
              }

              // Iterate through each student in the subject
              for (const studentData of students) {
                const { regNo, Test } = studentData;

                // Find the existing student or add a new one
                let existingStudent = existingSubject.students.find(
                  (student) => student.regNo === regNo
                );
                if (existingStudent) {
                  // Update existing student's test marks
                  for (const test of Test) {
                    const existingTest = existingStudent.Test.find(
                      (t) => t.testname === test.testname
                    );
                    if (existingTest) {
                      existingTest.marks = test.marks;
                    } else {
                      existingStudent.Test.push(test);
                    }
                  }
                } else {
                  // Add new student
                  existingSubject.students.push(studentData);
                }
              }
            }
          }
        }
      }

      // Save the updated document
      const result = await existingDocument.save();
      console.log(result);

      res
        .status(200)
        .json({ success: true, message: "Marks updated successfully" });
    } else {
      res.status(404).json({ success: true, message: "Data not found" });
    }
  } catch (error) {
    console.error("Error updating marks document:", error);
    throw error;
  }
});









export {
  Facultylogin,
  faculty,
  facultymail,
  searchfaculty,
  UpdateFacultyDetails,
  saveTaskAssign,
  searchTask,
  updateTaskAssign,
  savePreviewTask,
  fetchDetails,
  saveAssignMarks,
  updateAssignMarks
};
