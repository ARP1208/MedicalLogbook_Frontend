import {
  FacultyLogin,
  FacultyDetails,
  TaskAssign,
  AssignMarks,
  AddAssessment,
  attendance

} from "../models/faculty.js";
import { StudentDetails } from "../models/student.js";
import { Assignedsubject, AdminAnnoucement } from "../models/admin.js";
import { connectDB, closeDB } from "../config/db.js";
import nodemailer from "nodemailer";

import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();



const faculty = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);

  try {
    // Check if the user registering is an HOD
    if (req.body.designation === 'HOD') {
      const newHod = new FacultyLogin(req.body);
      const savedHod = await newHod.save();
      console.log("HOD credentials saved:", savedHod);
    }

    // Save faculty details to the FacultyDetails schema
    const newfaculty = new FacultyDetails(req.body);
    const savedfaculty = await newfaculty.save();
    console.log("Saved faculty data:", savedfaculty);

    res.status(201).json({ message: "Faculty data saved successfully" });
  } catch (error) {
    console.error("Error saving faculty document:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  const { emailId, applicationNumber, designation } = req.body;
  console.log("Received credentials:", emailId);
  const password = applicationNumber;
  try {
    const mailOptions = {
      from: "shettytejas96@gmail.com",
      to: emailId,
      subject: "Welcome to Medical Logbook",
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
    if (designation === 'HOD') {
      try {
        const existingHod = await FacultyLogin.findOneAndUpdate(
          { emailId },
          { $set: { password } },
          { new: true }
        );
        if (existingHod) {
          console.log("Existing HOD credentials updated:", existingHod);
        } else {
          const newHod = new FacultyLogin({ emailId, password });
          const savedHod = await newHod.save();
          console.log("New HOD credentials saved:", savedHod);
        }
      } catch (err) {
        console.error("Error updating HOD credentials:", err);
      }
    } else {
      const newFacultyLogin = new FacultyLogin({ emailId, password });
      const savedFacultyLogin = await newFacultyLogin.save();
      console.log("Faculty credentials saved:", savedFacultyLogin);
    }

    console.log("sent email is: ", emailId);

    res.status(200).json({
      success: true,
      message: "Faculty email sent successfully",
    });
  } catch (error) {
    console.error("Error saving credentials:", error);
    res.status(500).json({ success: false, message: "Error sending email or saving credentials" });
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

const facultyGetDetails = asyncHandler(async (req, res) => {
  const { email, designation } = req.body;
  console.log("Looking for: ", req.body)
  try {
    await connectDB();
    const faculty = await FacultyDetails.findOne({ emailId: email, designation: designation });
    console.log(faculty);
    if (faculty) {
      res.send(faculty);
    } else {
      res.status(404);
    }
  } catch (e) {
    console.log(e)
  }
})

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


////////////////Announcement///////////////////////////

// const FacultyfetchAllAnnouncement = asyncHandler(async (req, res) => {
//   try {
//     await connectDB();
//     let announcements = await AdminAnnoucement.find({});
//     console.log()
//     res.json(announcements); // Assuming you want to send the announcements as a response
//   } catch (error) {
//     console.error("Error fetching Announcement:", error);
//     res.status(500).json({ message: "Error fetching Announcement" });
//   }
// });







///////////Academic component //////////////////
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
                  const existingStudentIndex = existingSubject.students.findIndex(s => s.regno === student.regno);
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
                const { regno, Test } = studentData;

                // Find the existing student or add a new one
                let existingStudent = existingSubject.students.find(
                  (student) => student.regno === regno
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

/////// get the student details for attendance///////////////
const getStudentsDetails = asyncHandler(async (req, res) => {
  const { AcademicYear, programName, semesterNumber, sectionName } = req.body;

  console.log("data is: ", AcademicYear, programName, semesterNumber, sectionName )
  try {
    // Find the academic year
    let year = await Assignedsubject.findOne({
      'AcademicYear.year': AcademicYear
    });

    if (!year) {
      return res.status(404).json({ error: "No document with such Academic Year found!" });
    }

    // Find the program within the academic year
    const prog = year.AcademicYear.program.find(program => program.programname === programName);

    if (!prog) {
      return res.status(404).json({ error: "No such program in this Year" });
    }

    // Find the semester within the program
    const semester = prog.semesters.find(sem => sem.semesterNumber === semesterNumber);

    if (!semester) {
      return res.status(404).json({ error: "No such semester in this program" });
    }

    // Find the section within the semester
    const section = semester.sections.find(sec => sec.sectionName === sectionName);

    if (!section) {
      return res.status(404).json({ error: "No such section in this semester" });
    }

    // Extract student details with subject array
    const studentDetails = section.students.map(student => ({
      regno: student.regno,
      name: student.name,
      subjects: student.subjects.map(subject => subject.subjectName)
    }));

    return res.json(studentDetails);
  } catch (error) {
    console.error("Error fetching student details:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const saveAttendance = async (req, res) => {
  console.log("Received data:", req.body);

  try {
    await connectDB();

    const { AcademicYear } = req.body;

    // Check if a document with the given AcademicYear already exists
    let existingDocument = await attendance.findOne({ 'AcademicYear.year': AcademicYear.year });

    if (existingDocument) {
      console.log("Document found, updating...");

      const existingProgram = existingDocument.AcademicYear.program.find(program => program.programname === AcademicYear.program[0].programname);
      if (existingProgram) {
        const semesterIndex = existingProgram.semesters.findIndex(semester => semester.semesterNumber === AcademicYear.program[0].semesters[0].semesterNumber);
        if (semesterIndex !== -1) {
          const sectionIndex = existingProgram.semesters[semesterIndex].sections.findIndex(section => section.sectionName === AcademicYear.program[0].semesters[0].sections[0].sectionName);
          if (sectionIndex !== -1) {
            const existingStudentIndex = existingProgram.semesters[semesterIndex].sections[sectionIndex].students.findIndex(student => student.regno === AcademicYear.program[0].semesters[0].sections[0].students[0].regno);
            if (existingStudentIndex !== -1) {
              for (const subject of AcademicYear.program[0].semesters[0].sections[0].students[0].subjects) {
                const subjectIndex = existingProgram.semesters[semesterIndex].sections[sectionIndex].students[existingStudentIndex].subjects.findIndex(sub => sub.subjectName === subject.subjectName);
                if (subjectIndex !== -1) {
                  // Subject already exists, update its attendance and Totalclasses
                  for (const attendanceEntry of subject.attendance) {
                    if (attendanceEntry && attendanceEntry._id) { // Check if attendanceEntry is not undefined and has _id property
                      const existingAttendanceIndex = existingProgram.semesters[semesterIndex].sections[sectionIndex].students[existingStudentIndex].subjects[subjectIndex].attendance.findIndex(att => att._id && att._id.toString() === attendanceEntry._id.toString());
                      if (existingAttendanceIndex !== -1) {
                        existingProgram.semesters[semesterIndex].sections[sectionIndex].students[existingStudentIndex].subjects[subjectIndex].attendance[existingAttendanceIndex].date = attendanceEntry.date;
                        existingProgram.semesters[semesterIndex].sections[sectionIndex].students[existingStudentIndex].subjects[subjectIndex].attendance[existingAttendanceIndex].status = attendanceEntry.status;
                      } else {
                        existingProgram.semesters[semesterIndex].sections[sectionIndex].students[existingStudentIndex].subjects[subjectIndex].attendance.push(attendanceEntry);
                      }
                    }
                  }

                  // Calculate and update Totalclasses for the subject
                  let totalDaysPresent = 0;
                  let totalDaysAbsent = 0;
                  for (const attendanceEntry of existingProgram.semesters[semesterIndex].sections[sectionIndex].students[existingStudentIndex].subjects[subjectIndex].attendance) {
                    if (attendanceEntry.status === 1) {
                      totalDaysPresent++;
                    } else {
                      totalDaysAbsent++;
                    }
                  }
                  existingProgram.semesters[semesterIndex].sections[sectionIndex].students[existingStudentIndex].subjects[subjectIndex].Totalclasses = totalDaysPresent + totalDaysAbsent;
                } else {
                  // New subject added, calculate its attendance and Totalclasses
                  const newSubjectAttendance = subject.attendance.map(att => ({ ...att }));
                  let totalDaysPresent = newSubjectAttendance.filter(att => att.status === 1).length;
                  let totalDaysAbsent = newSubjectAttendance.filter(att => att.status === 0).length;

                  const newSubject = {
                    ...subject,
                    attendance: newSubjectAttendance,
                    Daypresent: totalDaysPresent,
                    DayAbsent: totalDaysAbsent,
                    Totalclasses: totalDaysPresent + totalDaysAbsent
                  };

                  existingProgram.semesters[semesterIndex].sections[sectionIndex].students[existingStudentIndex].subjects.push(newSubject);
                }
              }

              // Calculate total days present and absent for the entire attendance
              let totalDaysPresent = 0;
              let totalDaysAbsent = 0;
              for (const student of existingProgram.semesters[semesterIndex].sections[sectionIndex].students) {
                for (const subject of student.subjects) {
                  totalDaysPresent += subject.Daypresent;
                  totalDaysAbsent += subject.DayAbsent;
                }
              }

              existingDocument.DaysPresent = totalDaysPresent;
              existingDocument.DaysAbsent = totalDaysAbsent;

              const result = await existingDocument.save();
              console.log("Saved data is:", result);

              res.status(200).json({ success: true, message: 'Attendance updated successfully' });
            } else {
              res.status(404).json({ error: 'Student not found' });
            }
          } else {
            // Section doesn't exist, add a new section with students
            const newSection = {
              sectionName: AcademicYear.program[0].semesters[0].sections[0].sectionName,
              students: [
                {
                  regno: AcademicYear.program[0].semesters[0].sections[0].students[0].regno,
                  name: AcademicYear.program[0].semesters[0].sections[0].students[0].name,
                  subjects: AcademicYear.program[0].semesters[0].sections[0].students[0].subjects.map(subject => {
                    const newSubjectAttendance = subject.attendance.map(att => ({ ...att }));
                    const totalDaysPresent = newSubjectAttendance.filter(att => att.status === 1).length;
                    const totalDaysAbsent = newSubjectAttendance.filter(att => att.status === 0).length;

                    return {
                      ...subject,
                      attendance: newSubjectAttendance,
                      Daypresent: totalDaysPresent,
                      DayAbsent: totalDaysAbsent,
                      Totalclasses: totalDaysPresent + totalDaysAbsent
                    };
                  }),
                }
              ]
            };

            const programIndex = existingDocument.AcademicYear.program.findIndex(prog => prog.programname === AcademicYear.program[0].programname);
            if (programIndex !== -1) {
              existingDocument.AcademicYear.program[programIndex].semesters[semesterIndex].sections.push(newSection);

              const result = await existingDocument.save();
              console.log("Saved data is:", result);

              res.status(200).json({ success: true, message: 'Attendance updated successfully' });
            } else {
              res.status(404).json({ error: 'Program not found' });
            }
          }
        } else {
          // Semester doesn't exist, add a new semester with sections and students
          const newSemester = {
            semesterNumber: AcademicYear.program[0].semesters[0].semesterNumber,
            sections: [
              {
                sectionName: AcademicYear.program[0].semesters[0].sections[0].sectionName,
                students: [
                  {
                    regno: AcademicYear.program[0].semesters[0].sections[0].students[0].regno,
                    name: AcademicYear.program[0].semesters[0].sections[0].students[0].name,
                    subjects: AcademicYear.program[0].semesters[0].sections[0].students[0].subjects.map(subject => {
                      const newSubjectAttendance = subject.attendance.map(att => ({ ...att }));
                      const totalDaysPresent = newSubjectAttendance.filter(att => att.status === 1).length;
                      const totalDaysAbsent = newSubjectAttendance.filter(att => att.status === 0).length;

                      return {
                        ...subject,
                        attendance: newSubjectAttendance,
                        Daypresent: totalDaysPresent,
                        DayAbsent: totalDaysAbsent,
                        Totalclasses: totalDaysPresent + totalDaysAbsent
                      };
                    }),
                  }
                ]
              }
            ]
          };

          const programIndex = existingDocument.AcademicYear.program.findIndex(prog => prog.programname === AcademicYear.program[0].programname);
          if (programIndex !== -1) {
            existingDocument.AcademicYear.program[programIndex].semesters.push(newSemester);

            const result = await existingDocument.save();
            console.log("Saved data is:", result);

            res.status(200).json({ success: true, message: 'Attendance updated successfully' });
          } else {
            res.status(404).json({ error: 'Program not found' });
          }
        }
      } else {
        // Program doesn't exist, add new program with semesters, sections, and students
        const newProgram = {
          programname: AcademicYear.program[0].programname,
          semesters: [
            {
              semesterNumber: AcademicYear.program[0].semesters[0].semesterNumber,
              sections: [
                {
                  sectionName: AcademicYear.program[0].semesters[0].sections[0].sectionName,
                  students: [
                    {
                      regno: AcademicYear.program[0].semesters[0].sections[0].students[0].regno,
                      name: AcademicYear.program[0].semesters[0].sections[0].students[0].name,
                      subjects: AcademicYear.program[0].semesters[0].sections[0].students[0].subjects.map(subject => {
                        const newSubjectAttendance = subject.attendance.map(att => ({ ...att }));
                        const totalDaysPresent = newSubjectAttendance.filter(att => att.status === 1).length;
                        const totalDaysAbsent = newSubjectAttendance.filter(att => att.status === 0).length;

                        return {
                          ...subject,
                          attendance: newSubjectAttendance,
                          Daypresent: totalDaysPresent,
                          DayAbsent: totalDaysAbsent,
                          Totalclasses: totalDaysPresent + totalDaysAbsent
                        };
                      }),
                    }
                  ]
                }
              ]
            }
          ]
        };

        existingDocument.AcademicYear.program.push(newProgram);

        // Calculate total days present and absent for the new attendance
        let totalDaysPresent = 0;
        let totalDaysAbsent = 0;
        for (const subject of newProgram.semesters[0].sections[0].students[0].subjects) {
          totalDaysPresent += subject.Daypresent;
          totalDaysAbsent += subject.DayAbsent;
        }

        existingDocument.DaysPresent += totalDaysPresent;
        existingDocument.DaysAbsent += totalDaysAbsent;

        const result = await existingDocument.save();
        console.log("Saved data is:", result);

        res.status(200).json({ success: true, message: 'Attendance updated successfully' });
      }
    } else {
      console.log("Document not found, creating a new one.");

      // Calculate total days present and absent for the new attendance
      let totalDaysPresent = 0;
      let totalDaysAbsent = 0;
      for (const subject of AcademicYear.program[0].semesters[0].sections[0].students[0].subjects) {
        let subjectTotalDaysPresent = 0;
        let subjectTotalDaysAbsent = 0;

        for (const attendanceEntry of subject.attendance) {
          if (attendanceEntry.status === 1) {
            subjectTotalDaysPresent++;
          } else {
            subjectTotalDaysAbsent++;
          }
        }

        totalDaysPresent += subjectTotalDaysPresent;
        totalDaysAbsent += subjectTotalDaysAbsent;

        // Update day present and day absent for each attendance entry in the subject
        for (const attendanceEntry of subject.attendance) {
          attendanceEntry.Daypresent = subjectTotalDaysPresent;
          attendanceEntry.DayAbsent = subjectTotalDaysAbsent;
        }

        // Update Daypresent and DayAbsent for the subject itself
        subject.Daypresent = subjectTotalDaysPresent;
        subject.DayAbsent = subjectTotalDaysAbsent;

        // Calculate and set Totalclasses for the subject
        subject.Totalclasses = subjectTotalDaysPresent + subjectTotalDaysAbsent;
      }

      const newAttendance = new attendance({
        AcademicYear,
        program: [
          {
            programname: AcademicYear.program[0].programname,
            semesters: [
              {
                semesterNumber: AcademicYear.program[0].semesters[0].semesterNumber,
                sections: [
                  {
                    sectionName: AcademicYear.program[0].semesters[0].sections[0].sectionName,
                    students: [
                      {
                        regno: AcademicYear.program[0].semesters[0].sections[0].students[0].regno,
                        name: AcademicYear.program[0].semesters[0].sections[0].students[0].name,
                        subjects: AcademicYear.program[0].semesters[0].sections[0].students[0].subjects.map(subject => ({
                          ...subject,
                          Totalclasses: subject.Daypresent + subject.DayAbsent, // Calculate Totalclasses
                        })),
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });

      const savedAttendance = await newAttendance.save();
      console.log("Saved data is:", savedAttendance);

      res.status(201).json({ message: 'Attendance saved successfully' });
    }
  } catch (error) {
    console.error('Error saving attendance document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



/////////Assessment Component////////////////////////////////////////
const saveAddAssessment = asyncHandler(async (req, res) => {
  console.log("Received assessment data:", req.body);

  try {
    await connectDB();

    const { AcademicYear } = req.body;

    // Check if a document with the given AcademicYear already exists
    let existingDocument = await AddAssessment.findOne({ 'AcademicYear.year': AcademicYear.year });

    if (existingDocument) {
      // If document exists, append new data to existing data
      const { program } = AcademicYear;
      const existingProgramIndex = existingDocument.AcademicYear.program.findIndex(existingProgram => existingProgram.programname === program[0].programname);

      if (existingProgramIndex !== -1) {
        const { semesters } = program[0];
        const { sections } = semesters[0];

        const existingSemesterIndex = existingDocument.AcademicYear.program[existingProgramIndex].semesters.findIndex(existingSemester => existingSemester.semesterNumber === semesters[0].semesterNumber);

        if (existingSemesterIndex !== -1) {
          const existingSectionIndex = existingDocument.AcademicYear.program[existingProgramIndex].semesters[existingSemesterIndex].sections.findIndex(existingSection => existingSection.sectionName === sections[0].sectionName);

          if (existingSectionIndex !== -1) {
            const existingAssessmentIndex = existingDocument.AcademicYear.program[existingProgramIndex].semesters[existingSemesterIndex].sections[existingSectionIndex].assessment.findIndex(existingAssessment => existingAssessment.assessmentId === sections[0].assessment[0].assessmentId);

            if (existingAssessmentIndex !== -1) {
              // Assessment exists
              if (existingDocument.AcademicYear.program[existingProgramIndex].semesters[existingSemesterIndex].sections[existingSectionIndex].assessment[existingAssessmentIndex].assessmentName !== sections[0].assessment[0].assessmentName) {
                // If assessment ID exists but assessment name is new, display error
                return res.status(400).json({ error: 'Assessment ID already exists with a different name.' });
              } else {
                // Assessment ID and name both exist, append new assessment questions
                const newQuestions = sections[0].assessment[0].assessmentquestion;
                existingDocument.AcademicYear.program[existingProgramIndex].semesters[existingSemesterIndex].sections[existingSectionIndex].assessment[existingAssessmentIndex].assessmentquestion.push(...newQuestions);
              }
            } else {
              // ID is new, check if Name exists
              const nameExists = existingDocument.AcademicYear.program[existingProgramIndex].semesters[existingSemesterIndex].sections[existingSectionIndex].assessment.some(existingAssessment => existingAssessment.assessmentName === sections[0].assessment[0].assessmentName);
              if (nameExists) {
                // Name exists, display error
                return res.status(400).json({ error: 'Assessment Name already exists.' });
              } else {
                // Both ID and Name are new, save in the new array
                existingDocument.AcademicYear.program[existingProgramIndex].semesters[existingSemesterIndex].sections[existingSectionIndex].assessment.push(sections[0].assessment[0]);
              }
            }

          } else {
            // Section doesn't exist, add new section with assessments
            const newSection = {
              sectionName: sections[0].sectionName,
              assessment: sections[0].assessment
            };
            existingDocument.AcademicYear.program[existingProgramIndex].semesters[existingSemesterIndex].sections.push(newSection);
          }
        } else {
          // Semester doesn't exist, add new semester with sections and assessments
          const newSemester = {
            semesterNumber: semesters[0].semesterNumber,
            sections: [{
              sectionName: sections[0].sectionName,
              assessment: sections[0].assessment
            }]
          };
          existingDocument.AcademicYear.program[existingProgramIndex].semesters.push(newSemester);
        }
      } else {
        // Program doesn't exist, add new program with semesters, sections, and assessments
        const newProgram = {
          programname: program[0].programname,
          semesters: [{
            semesterNumber: AcademicYear.program[0].semesters[0].semesterNumber, // Access semesters from AcademicYear object
            sections: [{
              sectionName: AcademicYear.program[0].semesters[0].sections[0].sectionName,
              assessment: AcademicYear.program[0].semesters[0].sections[0].assessment
            }]
          }]
        };

        existingDocument.AcademicYear.program.push(newProgram);

      }

      const result = await existingDocument.save();
      console.log(result);

      res.status(200).json({ success: true, message: 'Assessments updated successfully' });
    } else {
      // If no document exists, create a new one
      const newAssessmentDocument = new AddAssessment({
        AcademicYear,
      });

      const savedAssessmentDocument = await newAssessmentDocument.save();
      console.log("Saved assessment data is:", savedAssessmentDocument);

      res.status(201).json({ message: 'Assessments saved successfully' });
    }
  } catch (error) {
    console.error('Error saving assessments document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getFacultyindividualAssessment = asyncHandler(async (req, res) => {
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
    const data = await AddAssessment.findOne(query);

    console.log("data is: ", data);
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

    // Extract assessmentId and assessmentName from the filtered sections
    const assessments = [];
    filteredSections.forEach(section => {
      section.assessment.forEach(assessment => {
        assessments.push({
          assessmentId: assessment.assessmentId,
          assessmentName: assessment.assessmentName
        });
      });
    });

    // Send the requested assessments in the response
    return res.json({ assessments });

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const getAssessmentByQuestionNumber = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const { assessmentId, assessmentName, assessmentquestion } = req.body;

    // Check if all necessary fields are provided
    if (!assessmentId || !assessmentName || !Number.isInteger(assessmentquestion)) {
      return res.status(400).json({ error: 'Assessment ID, assessment name, and valid question index are required' });
    }

    // Search for the assessment by the provided details
    const data = await AddAssessment.findOne({
      'AcademicYear.program': {
        $elemMatch: {
          'semesters.sections.assessment': {
            $elemMatch: {
              assessmentId: assessmentId,
              assessmentName: assessmentName
            }
          }
        }
      }
    });

    if (!data) {
      return res.status(404).json({ error: `Assessment with ID '${assessmentId}' and name '${assessmentName}' not found` });
    }

    // Get the specified question from the assessment
    const assessment = data.AcademicYear.program.flatMap(program => program.semesters.map(semester => semester.sections.flatMap(section => section.assessment.filter(assessment => assessment.assessmentId === assessmentId && assessment.assessmentName === assessmentName)))).flat()[0];

    if (!assessment) {
      return res.status(404).json({ error: `Assessment with ID '${assessmentId}' and name '${assessmentName}' does not contain questions` });
    }

    const questionIndex = parseInt(assessmentquestion);
    if (questionIndex >= 0 && questionIndex < assessment.assessmentquestion.length) {
      const selectedQuestion = assessment.assessmentquestion[questionIndex];
      return res.json({ assessmentId, assessmentName, question: selectedQuestion });
    } else {
      return res.status(404).json({ error: `Question index '${questionIndex}' is out of range for assessment with ID '${assessmentId}' and name '${assessmentName}'` });
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const showAssessment = asyncHandler(async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const { academicYear, program, semester, section, assessmentId, assessmentName } = req.body;

    // Check if all necessary fields are provided
    if (!academicYear || !program || !semester || !section || !assessmentId || !assessmentName) {
      return res.status(400).json({ error: 'Academic year, program, semester, section, assessment ID, and assessment name are required' });
    }

    // Search for the assessment by the provided details
    const data = await AddAssessment.findOne({
      'AcademicYear.year': academicYear,
      'AcademicYear.program.programname': program,
      'AcademicYear.program.semesters.semesterNumber': semester,
      'AcademicYear.program.semesters.sections.sectionName': section,
      'AcademicYear.program.semesters.sections.assessment.assessmentId': assessmentId,
      'AcademicYear.program.semesters.sections.assessment.assessmentName': assessmentName
    }, {
      'AcademicYear.program.semesters.sections.assessment.$': 1 // Projection to retrieve only the matched assessment
    });

    if (!data) {
      return res.status(404).json({ error: `Assessment with Academic year '${academicYear}', program '${program}', semester '${semester}', section '${section}', assessment ID '${assessmentId}', and assessment name '${assessmentName}' not found ` });
    }

    const assessment = data.AcademicYear.program[0].semesters[0].sections[0].assessment[0]; // Assuming only one assessment matches the query

    return res.json(assessment.assessmentquestion); // Send the assessment questions in the response

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const DeleteAssessment = asyncHandler(async (req, res) => {
  try {
    await connectDB();

    const { AcademicYear } = req.body;

    const existingDocument = await AddAssessment.findOne({ 'AcademicYear.year': AcademicYear.year });

    if (!existingDocument) {
      return res.status(404).json({ error: 'Assessment document not found' });
    }

    const { program } = AcademicYear;
    const { semesters } = program[0];
    const { sections } = semesters[0];

    const existingProgramIndex = existingDocument.AcademicYear.program.findIndex(existingProgram => existingProgram.programname === program[0].programname);

    if (existingProgramIndex === -1) {
      return res.status(404).json({ error: 'Program not found' });
    }

    const existingSemesterIndex = existingDocument.AcademicYear.program[existingProgramIndex].semesters.findIndex(existingSemester => existingSemester.semesterNumber === semesters[0].semesterNumber);

    if (existingSemesterIndex === -1) {
      return res.status(404).json({ error: 'Semester not found' });
    }

    const existingSectionIndex = existingDocument.AcademicYear.program[existingProgramIndex].semesters[existingSemesterIndex].sections.findIndex(existingSection => existingSection.sectionName === sections[0].sectionName);

    if (existingSectionIndex === -1) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const existingAssessmentIndex = existingDocument.AcademicYear.program[existingProgramIndex].semesters[existingSemesterIndex].sections[existingSectionIndex].assessment.findIndex(existingAssessment => existingAssessment.assessmentId === sections[0].assessment[0].assessmentId);

    if (existingAssessmentIndex === -1) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    existingDocument.AcademicYear.program[existingProgramIndex].semesters[existingSemesterIndex].sections[existingSectionIndex].assessment.splice(existingAssessmentIndex, 1);

    const result = await existingDocument.save();
    console.log(result);

    res.status(200).json({ success: true, message: 'Assessment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//////////////PG Log Component////////////////////////

const saveTaskAssignAndSendEmails = asyncHandler(async (req, res) => {
  console.log("Received data for saving task assignment:", req.body);
  const { semesterNumber, tasks } = req.body;

  try {

    // Connect to DB
    await connectDB();
    // Check if semester already exists
    let taskAssign = await TaskAssign.findOne({
      "semesters.semesterNumber": semesterNumber,
    });

    if (taskAssign) {
      // Semester exists, check for each task
      for (const task of tasks) {
        // Check if the task with the same Task_ID already exists in this semester
        if (
          taskAssign.semesters.tasks.find((t) => t.Task_ID === task.Task_ID)
        ) {
          console.error(
            "Task_ID already exists within the semester:",
            task.Task_ID
          );
          return res
            .status(400)
            .json({
              error: `Task_ID ${task.Task_ID} already exists in semester ${semesterNumber}`,
            });
        } else {
          // Add new task to existing semester
          taskAssign.semesters.tasks.push(task);
        }
      }
      await taskAssign.save(); // Save updated semester with new tasks
    } else {
      // Semester does not exist, create new semester with tasks
      taskAssign = new TaskAssign({
        semesters: {
          semesterNumber,
          tasks,
        },
      });
      await taskAssign.save();
    }

    // After DB operation, handle email sending
    const studentRegnos = tasks.flatMap((task) =>
      task.Students.map((student) => student.regno)
    );
    const students = await StudentDetails.find({
      regno: { $in: studentRegnos },
    });

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shettytejas96@gmail.com",
        pass: "ndhg gltd onks xuan",
      },
    });

    // Compose and send email to each student
    for (const task of tasks) {
      for (const studentDetail of students) {
        if (task.Students.some((s) => s.regno === studentDetail.regno)) {
          const mailOptions = {
            from: "shettytejas96@gmail.com",
            to: studentDetail.emailId,
            subject: "Task Assignment",
            html: `<p>You have been assigned the following task:</p>
<p>Task Name: ${task.Task_Name}</p>
<p>Task Description: ${task.Task_Description}</p>
<p>Start Date: ${task.start_Date}</p>
<p>End Date: ${task.End_Date}</p>

<p>Regards,</p>
<p>Your Faculty</p>`,
          };

          // Send email
          await transporter.sendMail(mailOptions);
          console.log("Task assignment email sent to:", studentDetail.emailId);
        }
      }
    }

    res
      .status(201)
      .json({
        message: "Tasks assigned successfully and emails sent to students",
      });
  } catch (error) {
    console.error("Error saving task assignment and sending emails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const approveTaskAssign = asyncHandler(async (req, res) => {
  console.log("Received data for update:", req.body);
  const { semesterNumber, Task_ID } = req.body;

  try {
    await connectDB();

    // First, find the semester
    const taskAssign = await TaskAssign.findOne({
      "semesters.semesterNumber": semesterNumber
    });

    // Check if the semester exists
    if (!taskAssign) {
      console.error("Semester does not exist:", semesterNumber);
      return res.status(404).json({ error: "Semester does not exist" });
    }

    // Semester exists, now find the task
    const task = taskAssign.semesters.tasks.find(t => t.Task_ID === Task_ID);

    // Check if the task exists
    if (!task) {
      console.error("Task ID does not exist within the semester:", Task_ID);
      return res.status(404).json({ error: "Task ID does not exist in the provided semester" });
    }

    // Task exists, update the status
    task.Status = 3; // Set status to "approved" which corresponds to status 3

    // Save the updated document
    await taskAssign.save();

    console.log("Updated task status for Task ID:", Task_ID);
    res.status(201).json({ message: "Task status updated successfully" });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await closeDB();
  }
});

const fetchAllTasks = asyncHandler(async (req, res) => {
  try {
    await connectDB();
    const tasks = await TaskAssign.find({Status: 2});
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// const DeleteTaskAssign = asyncHandler(async (req, res) => {
//   console.log("Received data for deletion:", req.body);
//   const { Task_ID } = req.body;

//   try {
//     await connectDB();
//     const taskId = Task_ID;
//     console.log("taskId", taskId);

//     // Assuming TaskAssign is your Mongoose model
//     const deletedtask = await TaskAssign.deleteOne({ Task_ID: taskId });

//     // Check if the document was deleted successfully
//     if (deletedtask.deletedCount === 1) {
//       console.log("Deleted task:", taskId);
//       res.status(200).json({ message: "task deleted successfully" });
//     } else {
//       console.log("task not found for deletion");
//       res.status(404).json({ error: "task not found for deletion" });
//     }
//   } catch (error) {
//     console.error("Error deleting task document:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   } finally {
//     await closeDB();
//   }
// });

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
  }
});

// //updatation code for Task Assignments

// const updateTaskAssign = asyncHandler(async (req, res) => {
//   console.log("Received data for update:", req.body);
//   const { Task_ID } = req.body;
//   try {
//     await connectDB();
//     const Taskdetail = Task_ID;
//     console.log("updated task ID", Taskdetail);
//     const newUpdateTask = { ...req.body };

//     const UpdatedTask = await TaskAssign.updateOne(
//       { Task_ID: Taskdetail },
//       { $set: newUpdateTask }
//     );
//     console.log("saved data is: ", UpdatedTask);

//     res.status(201).json({ message: "UpdatedTaskAssign" });
//   } catch (error) {
//     console.error("Error saving UpdatedTaskAssign document:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


export {
  faculty,
  facultymail,
  searchfaculty,
  facultyGetDetails,
  UpdateFacultyDetails,
  saveTaskAssignAndSendEmails,
  approveTaskAssign,
  fetchAllTasks,
  searchTask,
  //updateTaskAssign,
  fetchDetails,
  saveAssignMarks,
  updateAssignMarks,
  saveAddAssessment,
  getFacultyindividualAssessment,
  getAssessmentByQuestionNumber,
  showAssessment,
  //DeleteTaskAssign,
  DeleteAssessment,
  getStudentsDetails,
  saveAttendance
};