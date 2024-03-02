// adminController.js
import { Admin, AdminAnnoucement, Admingradesheet, Assignedsubject } from '../models/admin.js';
import { connectDB, closeDB } from "../config/db.js";
import asyncHandler from "express-async-handler";


const login = asyncHandler(async (req, res) => {
  const { emailId, password } = req.body;
  console.log('Received credentials:', { emailId, password });

  try {
    // Find the admin with the provided email
    const admin = await Admin.findOne({ emailId, password });
    console.log(admin);

    if (admin) {
      // Passwords match, send a success message
      console.log('Admin successfully logged in');
      res.json({ message: 'Successfully logged in!' });
    } else {
      // Invalid credentials
      console.log('Invalid credentials:', { emailId, password });
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const announcement = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  try {
    await connectDB();
    const newAnnouncement = new AdminAnnoucement(req.body);
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

const fetchAnnouncementByTitle = asyncHandler(async (req, res) => {
  const { announcementTitle } = req.params; // Assuming title is passed as a route parameter

  try {
    await connectDB();
    const announcement = await AdminAnnoucement.findOne({ title: announcementTitle });

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
  const {announcementTitle } = req.body;
  try {
    await connectDB();
    const announcementId = announcementTitle;
    console.log("announcementID",announcementId);
    const newUpdateAnnouncement = {...req.body};
  

    const UpdatedAnnouncement = await AdminAnnoucement.updateOne({ announcementTitle: announcementId }, { $set: newUpdateAnnouncement });
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
    await connectDB();
    const announcementId = announcementTitle;
    console.log("announcementID", announcementId);

    // Assuming AdminAnnoucement is your Mongoose model
    const deletedAnnouncement = await AdminAnnoucement.deleteOne({ announcementTitle: announcementId });
    
    // Check if the document was deleted successfully
    if (deletedAnnouncement.deletedCount === 1) {
      console.log("Deleted announcement with title:", announcementId);
      res.status(200).json({ message: "Announcement deleted successfully" });
    } else {
      console.log("Announcement not found for deletion");
      res.status(404).json({ error: "Announcement not found for deletion" });
    }
  } catch (error) {
    console.error("Error deleting announcement document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await closeDB();
  }
});

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
  console.log("Received data for update:", req.body);
  const { marks } = req.body;
  try {
    await connectDB();
    const Adminmarkgradesheet = marks;
    console.log("Admin gradesheeet ID", Admingradesheet);
    const newUpdategradesheet = { ...req.body };

    const Updatedmarks = await Admingradesheet.updateOne({ marks: Adminmarkgradesheet }, { $set: newUpdategradesheet });
    console.log("saved data is: ", Updatedmarks);

    res.status(201).json({ message: "UpdatedMarks" });
  } catch (error) {
    console.error("Error saving Admingradesheet document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const saveAssignSubject = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);

  try {
    await connectDB();

    const { AcademicYear } = req.body;

    // Check if a document with the given AcademicYear already exists
    const existingDocument = await Assignedsubject.findOne({ 'AcademicYear.year': AcademicYear.year });

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
    const data = await Admingradesheet.findOne(query);
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
      return res.status(404).json({ error: `Program '${program.programname}' data not found `});
    }

    // If semesterNumber is not provided, return the list of semester numbers for the program
    if (!semesterNumber) {
      const semesterNumbers = requestedProgram.semesters.map(s => s.semesterNumber);
      return res.json({ semesterNumbers });
    }

    // Find the requested semester
    const requestedSemester = requestedProgram.semesters.find(s => s.semesterNumber === semesterNumber);
    if (!requestedSemester) {
      return res.status(404).json({ error: `Semester '${semesterNumber}' data not found `});
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
        regNo: student.regNo,
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








export { login, announcement,fetchAnnouncementByTitle , UpdateAnnouncement, DeleteAnnouncement, saveAdminGradesheet, updateAdminGradesheet, saveAssignSubject, getAdminGradesheet }; 