// adminController.js
import { Admin, AdminAnnoucement, Admingradesheet} from '../models/admin.js';
import { connectDB, closeDB } from "../config/db.js";
import asyncHandler from "express-async-handler";


const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('Received credentials:', { email, password });

  try {
    // Find the admin with the provided email
    const admin = await Admin.findOne({ email });
    console.log(admin);

    if (admin && admin.comparePassword(password)) {
      // Passwords match, send a success message
      console.log('Admin successfully logged in');
      res.json({ message: 'Successfully logged in!' });
    } else {
      // Invalid credentials
      console.log('Invalid credentials:', { email, password });
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







export { login, announcement, UpdateAnnouncement, DeleteAnnouncement, saveAdminGradesheet }; 