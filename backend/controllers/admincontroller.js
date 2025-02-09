// adminController.js
import { AdminAnnoucement, Assignedsubject } from '../models/admin.js';
import { connectDB, closeDB } from "../config/db.js";
import asyncHandler from "express-async-handler";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';




////////////Registration Component ////////////////////////
const saveAssignSubject = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);

  try {
    await connectDB();

    const { AcademicYear } = req.body;

    // Check if a document with the given AcademicYear already exists
    let existingDocument = await Assignedsubject.findOne({ 'AcademicYear.year': AcademicYear.year });

    if (existingDocument) {
      const existingProgram = existingDocument.AcademicYear.program.find(program => program.programname === AcademicYear.program[0].programname);
      if (existingProgram) {
        const semesterIndex = existingProgram.semesters.findIndex(semester => semester.semesterNumber === AcademicYear.program[0].semesters[0].semesterNumber);
        if (semesterIndex !== -1) {
          const sectionIndex = existingProgram.semesters[semesterIndex].sections.findIndex(section => section.sectionName === AcademicYear.program[0].semesters[0].sections[0].sectionName);
          if (sectionIndex !== -1) {
            // Section exists, update section data
            const existingSection = existingProgram.semesters[semesterIndex].sections[sectionIndex];
            existingSection.students.push(...AcademicYear.program[0].semesters[0].sections[0].students)
          } else {
            // Section doesn't exist, add a new section
            existingProgram.semesters[semesterIndex].sections.push(AcademicYear.program[0].semesters[0].sections[0]);
          }
        } else {
          // Semester doesn't exist, add a new semester
          existingProgram.semesters.push(AcademicYear.program[0].semesters[0]);
        }
      } else {
        // Program doesn't exist, add new program
        existingDocument.AcademicYear.program.push(AcademicYear.program[0]);
      }

     

      const options = {
        new: true,
      };

      const result = await existingDocument.save();
      console.log(result);

      res.status(200).json({ success: true, message: 'Assignsubject updated successfully' });
    } else {
      // If no document exists, create a new one
      const newAssignsubject = new Assignedsubject({
        AcademicYear,
      });

      const savedAssign = await newAssignsubject.save();
      console.log("Saved data is:", savedAssign);

      res.status(201).json({ message: 'Assignsubject saved successfully' });
    }
  } catch (error) {
    console.error('Error saving Assignsubject document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const saveCSVAssignSubject = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);

  try {
    await connectDB();

    const academicYears = Array.isArray(req.body.AcademicYear) ? req.body.AcademicYear : [req.body.AcademicYear]; // Ensure AcademicYear is an array

    for (const academicYear of academicYears) {
      let existingDocument = await Assignedsubject.findOne({
        'AcademicYear.year': academicYear.year
      });

      if (existingDocument) {
        // If document exists, update it

        const programIndex = existingDocument.AcademicYear.program.findIndex(program => program.programname === academicYear.program[0].programname);
        if (programIndex !== -1) {
          // Program exists, update it

          const semesterIndex = existingDocument.AcademicYear.program[programIndex].semesters.findIndex(semester => semester.semesterNumber === academicYear.program[0].semesters[0].semesterNumber);
          if (semesterIndex !== -1) {
            // Semester exists, update it

            const sectionIndex = existingDocument.AcademicYear.program[programIndex].semesters[semesterIndex].sections.findIndex(section => section.sectionName === academicYear.program[0].semesters[0].sections[0].sectionName);
            if (sectionIndex !== -1) {
              // Section exists, add only new students to that section
              for (const student of academicYear.program[0].semesters[0].sections[0].students) {
                const existingStudentIndex = existingDocument.AcademicYear.program[programIndex].semesters[semesterIndex].sections[sectionIndex].students.findIndex(existingStudent => existingStudent.regNo === student.regNo);
                if (existingStudentIndex === -1) {
                  // Student not found, add it
                  existingDocument.AcademicYear.program[programIndex].semesters[semesterIndex].sections[sectionIndex].students.push(student);
                } else {
                  // Student found, update subjects
                  const existingSubjects = new Set(existingDocument.AcademicYear.program[programIndex].semesters[semesterIndex].sections[sectionIndex].students[existingStudentIndex].subjects.map(subject => subject.subjectName));
                  for (const subject of student.subjects) {
                    if (!existingSubjects.has(subject.subjectName)) {
                      existingDocument.AcademicYear.program[programIndex].semesters[semesterIndex].sections[sectionIndex].students[existingStudentIndex].subjects.push(subject);
                    }
                  }
                }
              }
            } else {
              // Section doesn't exist, add a new section with students
              existingDocument.AcademicYear.program[programIndex].semesters[semesterIndex].sections.push(academicYear.program[0].semesters[0].sections[0]);
            }
          } else {
            // Semester doesn't exist, add a new semester with sections and students
            existingDocument.AcademicYear.program[programIndex].semesters.push(academicYear.program[0].semesters[0]);
          }
        } else {
          // Program doesn't exist, add new program with semesters, sections, and students
          existingDocument.AcademicYear.program.push(academicYear.program[0]);
        }

        // Save the updated document
        existingDocument = await existingDocument.save();
        console.log(existingDocument);
      } else {
        // If no document exists, create a new one
        const newAssignsubject = new Assignedsubject({
          AcademicYear: academicYear,
        });

        // Save the new document
        const savedAssign = await newAssignsubject.save();
        console.log("Saved data is:", savedAssign);
      }
    }

    // Send success response
    res.status(200).json({ success: true, message: 'Assignsubject saved/updated successfully' });

  } catch (error) {
    console.error('Error saving Assignsubject document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//////////Announcement Component//////////////

const announcement = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  try {
    await connectDB();
    const newAnnouncement = new AdminAnnoucement(req.body);
    if (req.file) {
      newAnnouncement.file = req.file.path;
    }
    const savedAnnouncement = await newAnnouncement.save();
    console.log("saved data is: ", savedAnnouncement);

    res.status(201).json({ message: "savedAnnouncement" });
  } catch (error) {
    console.error("Error saving Announcement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await closeDB();
  }
});

const fetchAllAnnouncement = asyncHandler(async (req, res) => {
  try {
    await connectDB();
    let announcements = await AdminAnnoucement.find({});
    console.log()
    res.json(announcements); // Assuming you want to send the announcements as a response
  } catch (error) {
    console.error("Error fetching Announcement:", error);
    res.status(500).json({ message: "Error fetching Announcement" });
  }
});

const getFilebyAnnouncement = asyncHandler(async (req, res) => {
  let { announcementTitle } = req.body;
  const announcement_Title = announcementTitle

  console.log("Requested announcement is ", announcement_Title)

  try {
    await connectDB();
    const announcement = await AdminAnnoucement.findOne({ announcementTitle: announcement_Title });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    console.log("Fetched Announcement:", announcement);

    const currentFilePath = new URL(import.meta.url);
    const currentDirPath = path.dirname(currentFilePath.pathname);

    const filePath = path.join('backend/uploads', announcement.uploadedFileName);
    const fileData = fs.readFileSync(filePath);
    console.log("File for the given announcement is ", announcement.uploadedFileName)

    // Set the appropriate headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${announcement.uploadedFileName}"`);

    // Send the PDF file data as the response body
    res.send(fileData)
  } catch (error) {
    console.error("Error fetching Announcement:", error);
    res.status(500).json({ message: "Error fetching Announcement" });
  }
});

const deleteFile = asyncHandler(async (req, res) => {
  const { file } = req.body;
  const outdatedFile = file;

  console.log("Requested file to delete is ", outdatedFile);
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // Construct the file path relative to the root of your server application
  const filePath = path.join(__dirname, '../uploads', outdatedFile);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Error accessing file:", err);
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ success: false, message: 'Failed to delete file' });
      }
      
      console.log('File deleted successfully');
      return res.status(200).json({ success: true, message: 'File deleted successfully' });
    });
  });
});

const fetchAnnouncementByTitle = asyncHandler(async (req, res) => {
  let { announcementTitle } = req.body;
  const announcement_Title = announcementTitle

  try {
    await connectDB();
    const announcement = await AdminAnnoucement.findOne({ announcementTitle: announcement_Title });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    console.log("Fetched Announcement:", announcement);
    res.status(200).json(announcement);
  } catch (error) {
    console.error("Error fetching Announcement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await closeDB();
  }
});

const UpdateAnnouncement = asyncHandler(async (req, res) => {
  console.log("Received data for update:", req.body);
  const { a_id } = req.body;
  try {
    await connectDB();
    const announcementId = a_id;
    console.log("announcementTitle", announcementId);
    const newUpdateAnnouncement = { ...req.body };
    if (req.file) {
      newUpdateAnnouncement.file = req.file.path;
    }
    const UpdatedAnnouncement = await AdminAnnoucement.updateOne({ _id: a_id }, { $set: newUpdateAnnouncement });
    console.log("saved data is: ", UpdatedAnnouncement);

    res.status(201).json({ message: "UpdatedAnnouncement" });
  } catch (error) {
    console.error("Error updating announcement document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await closeDB();
  }
});

const DeleteAnnouncement = asyncHandler(async (req, res) => {
  console.log("Received data for deletion:", req.body);
  const { announcementTitle } = req.body;

  try {
    // Connect to the database
    await connectDB();

    // Find the announcement by title
    const announcement = await AdminAnnoucement.findOne({ announcementTitle });

    // Check if the announcement exists
    if (!announcement) {
      console.log("Announcement not found for deletion");
      return res.status(404).json({ error: "Announcement not found for deletion" });
    }

    // Delete the associated file
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, '../uploads', announcement.uploadedFileName);

    // Delete the announcement document
    const deletedAnnouncement = await AdminAnnoucement.deleteOne({ announcementTitle });

    // Check if the document was deleted successfully
    if (deletedAnnouncement.deletedCount === 1) {
      fs.unlinkSync(filePath);
      console.log("Deleted announcement with title:", announcementTitle);
      return res.status(200).json({ message: "Announcement deleted successfully" });
    } else {
      console.log("Failed to delete announcement with title:", announcementTitle);
      return res.status(500).json({ error: "Failed to delete announcement" });
    }
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    await closeDB();
  }
});




//////////////// Grade Sheet //////////////////////////
const saveAdminGradesheet = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);

  try {
    await connectDB();

    const { AcademicYear } = req.body;

    // Check if a document with the given AcademicYear already exists
    const existingDocument = await Admingradesheet.findOne({ 'AcademicYear.year': AcademicYear.year });

    if (existingDocument) {
      const existingProgram = existingDocument.AcademicYear.program.find(program => program.programname === AcademicYear.program[0].programname);
      if (existingProgram) {
        const semesterIndex = existingProgram.semesters.findIndex(semester => semester.semesterNumber === AcademicYear.program[0].semesters[0].semesterNumber);
        if (semesterIndex !== -1) {
          const sectionIndex = existingProgram.semesters[semesterIndex].sections.findIndex(section => section.sectionName === AcademicYear.program[0].semesters[0].sections[0].sectionName);
          if (sectionIndex !== -1) {
            // Section exists, add only new students to that section
            const section = existingProgram.semesters[semesterIndex].sections[sectionIndex];
            const newStudents = AcademicYear.program[0].semesters[0].sections[0].students.filter(newStudent => {
              return !section.students.some(existingStudent => existingStudent.regNo === newStudent.regNo);
            });
            section.students.push(...newStudents);
          } else {
            // Section doesn't exist, add a new section with students
            existingProgram.semesters[semesterIndex].sections.push(AcademicYear.program[0].semesters[0].sections[0]);
          }
        } else {
          // Semester doesn't exist, add a new semester with sections and students
          existingProgram.semesters.push(AcademicYear.program[0].semesters[0]);
        }
      } else {
        // Program doesn't exist, add new program with semesters, sections, and students
        existingDocument.AcademicYear.program.push(AcademicYear.program[0]);
      }

      const options = {
        new: true,
      };

      const result = await existingDocument.save();
      console.log(result);

      res.status(200).json({ success: true, message: 'AdminGradesheet updated successfully' });
    } else {
      // If no document exists, create a new one
      const newAdminGradesheet = new Admingradesheet({
        AcademicYear,
      });

      const savedAdminGradesheet = await newAdminGradesheet.save();
      console.log("Saved data is:", savedAdminGradesheet);

      res.status(201).json({ message: 'AdminGradesheet saved successfully' });
    }
  } catch (error) {
    console.error('Error saving AdminGradesheet document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const updateAdminGradesheet = asyncHandler(async (req, res) => {
  try {
    console.log("Received data for update:", req.body);
    const { regno, subjects } = req.body;

    await connectDB();
    console.log("Connected to the database");

    // Validate that regno and subjects are provided
    if (!regno || !subjects || !Array.isArray(subjects)) {
      console.log("Invalid request format");
      return res.status(400).json({ error: "Invalid request format" });
    }

    // Find the student by regno
    console.log("Finding the student by regno:", regno);
    const existingStudent = await Assignedsubject.findOne({ 'AcademicYear.program.semesters.sections.students.regno': regno });

    if (!existingStudent) {
      console.log("Student not found");
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if AcademicYear, program, semesters, sections, and students exist
    if (
      existingStudent.AcademicYear &&
      existingStudent.AcademicYear.program &&
      existingStudent.AcademicYear.program.length > 0 &&
      existingStudent.AcademicYear.program[0].semesters &&
      existingStudent.AcademicYear.program[0].semesters.length > 0 &&
      existingStudent.AcademicYear.program[0].semesters[0].sections &&
      existingStudent.AcademicYear.program[0].semesters[0].sections.length > 0 &&
      existingStudent.AcademicYear.program[0].semesters[0].sections[0].students &&
      existingStudent.AcademicYear.program[0].semesters[0].sections[0].students.length > 0
    ) {
      console.log("Student data structure is valid");
      // Update marks for each subject based on the provided subjects array
      subjects.forEach(subject => {
        const { _id, marks } = subject; // Assuming _id is the unique identifier for the subject

        const studentToUpdate = existingStudent.AcademicYear.program[0].semesters[0].sections[0].students.find(student => student.regno === regno);

        if (studentToUpdate) {
          console.log("Updating marks for student:", regno);
          console.log("StudentToUpdate:", studentToUpdate);

          const subjectToUpdate = studentToUpdate.subjects.find(sub => sub._id.toString() === _id.toString());

          if (subjectToUpdate) {
            console.log("SubjectToUpdate:", subjectToUpdate);
            subjectToUpdate.marks = marks;
          }
        }
      });

      // Save the updated document
      console.log("Saving the updated document");
      const updatedDocument = await existingStudent.save();

      console.log("Updated document:", updatedDocument);


      res.status(200).json({ message: "Marks updated successfully" });
    } else {
      console.log("Student data structure is invalid or incomplete");
      return res.status(400).json({ error: "Student data structure is invalid or incomplete" });
    }
  } catch (error) {
    console.error("Error updating marks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAdminGradesheet = asyncHandler(async (req, res) => {
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
    if (!program) {
      const programNames = data.AcademicYear.program.map(p => p.programname);
      return res.json({ programNames });
    }

    // Find the requested program
    const requestedProgram = data.AcademicYear.program.find(p => p.programname === program.programname);
    if (!requestedProgram) {
      return res.status(404).json({ error: `Program '${program.programname}' data not found ` });
    }

    // If semesterNumber is not provided, return the list of semester numbers for the program
    if (!semesterNumber) {
      const semesterNumbers = requestedProgram.semesters.map(s => s.semesterNumber);
      return res.json({ semesterNumbers });
    }

    // Find the requested semester
    const requestedSemester = requestedProgram.semesters.find(s => s.semesterNumber === semesterNumber);
    if (!requestedSemester) {
      return res.status(404).json({ error: `Semester '${semesterNumber}' data not found ` });
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

    // Retrieve student data for all sections in the requested section names
    const students = [];
    filteredSections.forEach(section => {
      students.push(...section.students.map(student => ({
        regNo: student.regno,
        name: student.name,
        subjects: student.subjects
      })));
    });

    // Send the requested section names and student data in the response
    return res.json({

      students
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getAdminindividualGradesheet = asyncHandler(async (req, res) => {
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
    if (!program) {
      const programNames = data.AcademicYear.program.map(p => p.programname);
      return res.json({ programNames });
    }

    // Find the requested program
    const requestedProgram = data.AcademicYear.program.find(p => p.programname === program.programname);
    if (!requestedProgram) {
      return res.status(404).json({ error: `Program '${program.programname}' data not found ` });
    }

    // If semesterNumber is not provided, return the list of semester numbers for the program
    if (!semesterNumber) {
      const semesterNumbers = requestedProgram.semesters.map(s => s.semesterNumber);
      return res.json({ semesterNumbers });
    }

    // Find the requested semester
    const requestedSemester = requestedProgram.semesters.find(s => s.semesterNumber === semesterNumber);
    if (!requestedSemester) {
      return res.status(404).json({ error: `Semester '${semesterNumber}' data not found ` });
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

    // Retrieve student data for all sections in the requested section names
    const students = [];
    filteredSections.forEach(section => {
      students.push(...section.students.map(student => ({
        regNo: student.regno,
        name: student.name,
        // subjects: student.subjects
      })));
    });

    // Send the requested section names and student data in the response
    return res.json({

      students
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const filter_students = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  const { AcademicYear, programName, semesterNumber, sectionName } = req.body;
  try {
    await connectDB();
    const result = await Assignedsubject.findOne({
      "AcademicYear.year": AcademicYear,
    });

    if (result) {
      const existingProgram = result.AcademicYear.program.find(program => program.programname === programName);
      if (existingProgram) {
        const semesterIndex = existingProgram.semesters.findIndex(semester => semester.semesterNumber === semesterNumber);
        if (semesterIndex !== -1) {
          const sections = existingProgram.semesters[semesterIndex].sections.findIndex(section => section.sectionName === sectionName);
          if (sections !== -1) {
            const students = existingProgram.semesters[semesterIndex].sections[sections].students;
            console.log(students);
            res.status(200).json({ students });
          }
        }
      }
    }

  } catch (error) {
    console.error('Error filtering :', error);
  }
});

const setMarks = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  const { AcademicYear, programName, semesterNumber, sectionName, regno, marks } = req.body;

  try {
    // Ensure database connection is established
    await connectDB();

    // Query the database to find the relevant document
    const result = await Assignedsubject.findOne({
      "AcademicYear.year": AcademicYear,
    });

    console.log("Result:", result);

    // If document found, update marks for the student
    if (result) {
      const existingProgram = result.AcademicYear.program.find(program => program.programname === programName);

      if (existingProgram) {
        const semesterIndex = existingProgram.semesters.findIndex(semester => semester.semesterNumber === semesterNumber);

        if (semesterIndex !== -1) {
          const sectionIndex = existingProgram.semesters[semesterIndex].sections.findIndex(section => section.sectionName === sectionName);

          if (sectionIndex !== -1) {
            const studentIndex = existingProgram.semesters[semesterIndex].sections[sectionIndex].students.findIndex(student => student.regno === regno);

            if (studentIndex !== -1) {
              console.log("Setting marks for student:", existingProgram.semesters[semesterIndex].sections[sectionIndex].students[studentIndex]);

              // Update marks for each subject
              existingProgram.semesters[semesterIndex].sections[sectionIndex].students[studentIndex].subjects.forEach(subject => {
                if (marks.hasOwnProperty(subject.subjectName)) {
                  subject.marks = marks[subject.subjectName];
                }
              });

              // Save the updated document
              await result.save();
              console.log("Marks updated successfully.");

              // Respond with success message
              return res.status(200).json({ message: "Marks updated successfully" });
            }
          }
        }
      }
    }

    // If no matching data found, respond with 404 status
    console.log("No matching data found.");
    return res.status(404).json({ message: "No matching data found" });
  } catch (error) {
    // Log and respond with internal server error
    console.error('Error updating marks:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export { announcement, fetchAllAnnouncement, getFilebyAnnouncement, deleteFile, fetchAnnouncementByTitle, UpdateAnnouncement, DeleteAnnouncement, filter_students, setMarks, saveAdminGradesheet, updateAdminGradesheet, saveAssignSubject,saveCSVAssignSubject, getAdminGradesheet, getAdminindividualGradesheet }; 