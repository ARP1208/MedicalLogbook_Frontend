import {
  StudentDetails,
  TaskAssignStudent,
  StudentAssessmentMark,
} from "../models/student.js";
import { Assignedsubject } from "../models/admin.js";
import {
  TaskAssign,
  AddAssessment,
  AssignMarks,
  attendance,
} from "../models/faculty.js";
import { connectDB, closeDB } from "../config/db.js";
import nodemailer from "nodemailer";
import Parent from "../models/parentdetails.js";
import express from "express";
import asyncHandler from "express-async-handler";

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
    searchTerm,
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
      orConditions.push({
        studentname: { $regex: String(searchTerm), $options: "i" },
      });
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

const getStudent = asyncHandler(async(req, res) => {
  const { AcademicYear, program: programName, semester: semesterNumber, section: sectionName } = req.body;
  console.log("Receiving: ",AcademicYear, programName, semesterNumber, sectionName)
  try {
    await connectDB();
    const year = await Assignedsubject.findOne({
      "AcademicYear.year": AcademicYear,
    });

    if(!year) {
      return res.status(404).json({"Error": "No Academic Year found!"});
    }
    console.log(year.AcademicYear.program);

    const prog = year.AcademicYear.program.find(
      (prog) => prog.programname === programName
    );

    if (!prog) {
      return res.status(404).json({ error: "Program not found" });
    }
    const semesterFound = prog.semesters.find(
      (semester) => semester.semesterNumber == semesterNumber
    );

    if (!semesterFound) {
      return res.status(404).json({ error: "Semester not found" });
    }

    // Find section inside semester
    const sectionFound = semesterFound.sections.find(
      (section) => section.sectionName == sectionName
    );

    if (!sectionFound) {
      return res.status(404).json({ error: "Section not found" });
    }

    // Extracting name and regno of each student
    const studentsData = sectionFound.students.map(student => ({
      name: student.name,
      regno: student.regno
    }));

    res.status(200).json(studentsData);
  } catch(e) {
    console.log(e);
    res.status(500).json({ error: "Server error" });
  }
});

const UpdateStudentDetails = asyncHandler(async (req, res) => {
  console.log("Received data for update:", req.body);
  const { enrollmentNumber } = req.body;
  try {
    await connectDB();
    const studentId = enrollmentNumber;
    console.log("student ID", studentId);
    const newUpdateStudent = { ...req.body };

    const UpdatedStudent = await StudentDetails.updateOne(
      { enrollmentNumber: studentId },
      { $set: newUpdateStudent }
    );
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
      $set: { Task_Completed: "completed" },
    };

    // Use TaskAssign.updateOne to update the specified task
    const UpdatedTask = await TaskAssign.updateOne(
      { Task_ID },
      updateOperation
    );

    console.log("saved data is: ", UpdatedTask);

    res
      .status(201)
      .json({ message: "Task assigned successfully and faculty task updated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await closeDB();
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
      $set: { Task_Completed: "yet to complete" },
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
  } finally {
    await closeDB();
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
    const assignSubject = await Assignedsubject.findOne({
      "AcademicYear.program.semesters.sections.students.regno": regno,
    });

    if (!assignSubject) {
      return res.status(404).json({ error: "AssignSubject not found" });
    }

    // Extract specific academic year, program, semester, section details
    const academicYear = assignSubject.AcademicYear.year;
    const programName = assignSubject.AcademicYear.program[0].programname;
    const semesterNumber =
      assignSubject.AcademicYear.program[0].semesters[0].semesterNumber;
    const sectionName =
      assignSubject.AcademicYear.program[0].semesters[0].sections[0]
        .sectionName;

    // Find academic year in AddAssessment database
    const academicYearFound = await AddAssessment.findOne({
      "AcademicYear.year": academicYear,
    });

    if (!academicYearFound) {
      return res.status(404).json({ error: "Academic year not found" });
    }

    // Find program inside academic year
    const programFound = academicYearFound.AcademicYear.program.find(
      (program) => program.programname === programName
    );

    if (!programFound) {
      return res.status(404).json({ error: "Program not found" });
    }

    // Find semester inside program
    const semesterFound = programFound.semesters.find(
      (semester) => semester.semesterNumber === semesterNumber
    );

    if (!semesterFound) {
      return res.status(404).json({ error: "Semester not found" });
    }

    // Find section inside semester
    const sectionFound = semesterFound.sections.find(
      (section) => section.sectionName === sectionName
    );

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
    return res.status(200).json({
      academicYear,
      programName,
      semesterNumber,
      sectionName,
      assessments,
    });
  } catch (error) {
    // Handle any errors and send 500 error response
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const fetchStudentAssessmentMarks = async (req, res) => {
  const { regno } = req.body;
  console.log("Received student data: ", regno);

  try {
    const marks = await StudentAssessmentMark.find({
      "AcademicYear.program.semesters.sections.Students.regno": regno,
    });

    if (marks.length === 0) {
      console.log("No assessments found for this student");
      return res
        .status(404)
        .json({ error: "No assessments found for this student" });
    }

    // Restructure the data to match the desired format
    const formattedMarks = marks.map((mark) => ({
      semester: mark.AcademicYear.program[0].semesters[0].semesterNumber,
      assessments:
        mark.AcademicYear.program[0].semesters[0].sections[0].Students[0]
          .assessments,
    }));

    // console.log("Formatted assessment marks:", formattedMarks);
    // Send the formatted response
    return res.status(200).json({ marks: formattedMarks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getInternals = async (regno, AcademicYear) => {
  // const { regno, AcademicYear } = req.body;

  try {
    const year = await AssignMarks.findOne({
      "AcademicYear.year": AcademicYear,
    });

    if (!year) {
      return "No document with such Academic Year found!"
        // .status(404)
        // .json({ error: "No document with such Academic Year found!" });
    }

    const result = [];

    year.AcademicYear.program.forEach((program) => {
      program.semesters.forEach((semester) => {
        semester.sections.forEach((section) => {
          section.subjects.forEach((subject) => {
            subject.students.forEach((student) => {
              if (student.regno == regno) {
                const totalMarks = student.Test.reduce(
                  (sum, test) => sum + parseInt(test.marks),
                  0
                );
                // console.log(`[+]${semester.semesterNumber} => ${subject.subjectName} => ${totalMarks}`)
                result.push({
                  semesterNumber: semester.semesterNumber,
                  subjectName: subject.subjectName,
                  subjectCode: subject.subjectcode,
                  internalMarks: totalMarks,
                });
              }
            });
          });
        });
      });
    });

    const internals = result.reduce((acc, curr) => {
      const found = acc.find(
        (item) =>
          item.subjectCode === curr.subjectCode &&
          item.semesterNumber === curr.semesterNumber
      );
      if (found) {
        found.internalMarks += curr.internalMarks;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

    // console.log({"internals": internals});
    return internals;
    // return res.status(200).json({ internals });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getExternals = async (regno, AcademicYear) => {
  // const { regno, AcademicYear } = req.body;
  try {
    const year = await Assignedsubject.findOne({
      "AcademicYear.year": AcademicYear,
    });

    if (!year) {
      return "No document with such Academic Year found!"
      //   .status(404)
      //   .json({ error: "No document with such Academic Year found!" });
    }

    const externals = [];
    year.AcademicYear.program.forEach((program) => {
      program.semesters.forEach((semester) => {
        semester.sections.forEach((section) => {
          section.students.forEach((student) => {
            if (student.regno == regno) {
              student.subjects.forEach((sub) => {
                console.log(`[+]${semester.semesterNumber} => ${sub.subjectName} => ${sub.marks}`)
                externals.push({
                  semesterNumber: semester.semesterNumber,
                  subjectName: sub.subjectName,
                  subjectCode: sub.subjectcode,
                  externalMarks: sub.marks,
                });
              });
            }
          });
        });
      });
    });
    // console.log({"externals":externals});
    return externals;
    // return res.status(200).json({ externals });
  } catch (e) {
    console.log(e);
  }
};

const getAllMarks = async (req, res) => {
  const { regno, AcademicYear } = req.body;
  const marks = []; 

  try {
    const internals = await getInternals(regno, AcademicYear);
    const externals = await getExternals(regno, AcademicYear);
    // console.log(internals)
    // console.log(externals)


    internals.forEach((internal) => {
      const external = externals.find(
        (ext) =>
          ext.semesterNumber == internal.semesterNumber &&
          ext.subjectCode == internal.subjectCode
      );
  
      if (external) {
        marks.push({
          semesterNumber: internal.semesterNumber,
          subjectName: internal.subjectName,
          subjectCode: internal.subjectCode,
          internalMarks: internal.internalMarks,
          externalMarks: external.externalMarks,
        });
      } else {
        marks.push({
          semesterNumber: internal.semesterNumber,
          subjectName: internal.subjectName,
          subjectCode: internal.subjectCode,
          internalMarks: internal.internalMarks,
          externalMarks: null,
        });
      }
    });
    res.status(200).json(marks);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const saveAssessmentStudent = async (req, res) => {
  console.log("Received assessment mark data:", req.body);

  try {
    const { AcademicYear } = req.body;

    // Check if a document with the given AcademicYear already exists
    let existingDocument = await StudentAssessmentMark.findOne({
      "AcademicYear.year": AcademicYear.year,
    });

    if (existingDocument) {
      // If document exists, update the assessments data

      // Find or create the program
      let programIndex = existingDocument.AcademicYear.program.findIndex(
        (program) => program.programname === AcademicYear.program[0].programname
      );
      if (programIndex === -1) {
        existingDocument.AcademicYear.program.push({
          programname: AcademicYear.program[0].programname,
          semesters: [],
        });
        programIndex = existingDocument.AcademicYear.program.length - 1;
      }

      // Find or create the semester
      let semesterIndex = existingDocument.AcademicYear.program[
        programIndex
      ].semesters.findIndex(
        (semester) =>
          semester.semesterNumber ===
          AcademicYear.program[0].semesters[0].semesterNumber
      );
      if (semesterIndex === -1) {
        existingDocument.AcademicYear.program[programIndex].semesters.push({
          semesterNumber: AcademicYear.program[0].semesters[0].semesterNumber,
          sections: [],
        });
        semesterIndex =
          existingDocument.AcademicYear.program[programIndex].semesters.length -
          1;
      }

      // Find or create the section
      let sectionIndex = existingDocument.AcademicYear.program[
        programIndex
      ].semesters[semesterIndex].sections.findIndex(
        (section) =>
          section.sectionName ===
          AcademicYear.program[0].semesters[0].sections[0].sectionName
      );
      if (sectionIndex === -1) {
        existingDocument.AcademicYear.program[programIndex].semesters[
          semesterIndex
        ].sections.push({
          sectionName:
            AcademicYear.program[0].semesters[0].sections[0].sectionName,
          Students: [],
        });
        sectionIndex =
          existingDocument.AcademicYear.program[programIndex].semesters[
            semesterIndex
          ].sections.length - 1;
      }

      // Check if student exists
      let studentIndex = existingDocument.AcademicYear.program[
        programIndex
      ].semesters[semesterIndex].sections[sectionIndex].Students.findIndex(
        (student) =>
          student.regno ===
          AcademicYear.program[0].semesters[0].sections[0].Students[0].regno
      );
      if (studentIndex === -1) {
        existingDocument.AcademicYear.program[programIndex].semesters[
          semesterIndex
        ].sections[sectionIndex].Students.push({
          regno:
            AcademicYear.program[0].semesters[0].sections[0].Students[0].regno,
          assessments: [],
        });
        studentIndex =
          existingDocument.AcademicYear.program[programIndex].semesters[
            semesterIndex
          ].sections[sectionIndex].Students.length - 1;
      }

      // Check if assessments already exist for the student
      const assessments =
        AcademicYear.program[0].semesters[0].sections[0].Students[0]
          .assessments;
      const existingAssessmentIds = existingDocument.AcademicYear.program[
        programIndex
      ].semesters[semesterIndex].sections[sectionIndex].Students[
        studentIndex
      ].assessments.map((assessment) => assessment.assessmentId);
      const existingAssessmentNames = existingDocument.AcademicYear.program[
        programIndex
      ].semesters[semesterIndex].sections[sectionIndex].Students[
        studentIndex
      ].assessments.map((assessment) => assessment.assessmentName);
      const newAssessmentIds = assessments.map(
        (assessment) => assessment.assessmentId
      );
      const newAssessmentNames = assessments.map(
        (assessment) => assessment.assessmentName
      );

      const duplicateId = newAssessmentIds.some((id) =>
        existingAssessmentIds.includes(id)
      );
      const duplicateName = newAssessmentNames.some((name) =>
        existingAssessmentNames.includes(name)
      );

      if (duplicateId || duplicateName) {
        return res.status(400).json({
          error:
            "Assessment with the same ID or Name already exists for this student.",
        });
      }

      // Add assessments
      existingDocument.AcademicYear.program[programIndex].semesters[
        semesterIndex
      ].sections[sectionIndex].Students[studentIndex].assessments.push(
        ...assessments
      );

      const result = await existingDocument.save();
      console.log(result);

      res.status(200).json({
        success: true,
        message: "Assessment marks updated successfully",
      });
    } else {
      // If no document exists, create a new one
      const newAssessmentMarkDocument = new StudentAssessmentMark({
        AcademicYear,
      });

      const savedAssessmentMarkDocument =
        await newAssessmentMarkDocument.save();
      console.log(
        "Saved assessment mark data is:",
        savedAssessmentMarkDocument
      );

      res.status(201).json({ message: "Assessment marks saved successfully" });
    }
  } catch (error) {
    console.error("Error saving assessment marks document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ///////////////Academic /////////////////////////////////
const fetchStudentGradeSheet = async (req, res) => {
  const { regno, name, AcademicYear, programName } = req.body;

  console.log("data is: ", regno, name, AcademicYear, programName);

  try {
    let year = await Assignedsubject.findOne({
      "AcademicYear.year": AcademicYear,
    });

    if (!year) {
      return "No document with such Academic Year found!";
    }

    const prog = year.AcademicYear.program.find(
      (program) => program.programname === programName
    );

    if (!prog) {
      return { Error: "No such program in this Year" };
    }

    const subjectsBySemester = prog.semesters
      .map((semester) => {
        const student = semester.sections
          .flatMap((section) =>
            section.students.find(
              (student) => student.regno === regno && student.name === name
            )
          )
          .filter(Boolean)[0];

        if (!student) {
          return {
            semesterNumber: semester.semesterNumber,
          };
        }

        const subjects = student.subjects.reduce((acc, subject) => {
          acc[subject.subjectName] = {
            facultyname: subject.facultyname,
            subjectcode: subject.subjectcode,
            credit: subject.credit,
            marks: subject.marks,
            _id: subject._id,
          };
          return acc;
        }, {});

        return {
          semesterNumber: semester.semesterNumber,
          subjects: subjects,
        };
      })
      .filter(Boolean);

    // Return the formatted response
    return res.json(subjectsBySemester);
  } catch (error) {
    console.error("Error fetching student grade sheet:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchStudentTestMarks = async (req, res) => {
  const { regno, name } = req.body;
  const semesterDataAll = [];

  try {
    const result = await AssignMarks.find({
      "AcademicYear.program.semesters": { $exists: true, $not: { $size: 0 } },
    });

    const semesters = [
      ...new Set(
        result.flatMap((item) =>
          item.AcademicYear.program.flatMap((p) =>
            p.semesters.map((s) => s.semesterNumber)
          )
        )
      ),
    ];

    for (const sem of semesters) {
      const resultForSemester = result.find((item) =>
        item.AcademicYear.program.some((p) =>
          p.semesters.some((s) => s.semesterNumber === sem)
        )
      );

      const hasTestForSemester = resultForSemester.AcademicYear.program
        .flatMap((program) =>
          program.semesters
            .filter((semData) => semData.semesterNumber === sem)
            .flatMap((filteredSemData) =>
              filteredSemData.sections.flatMap((section) =>
                section.subjects.some((subject) =>
                  // console.log(subject)
                  subject.students.some(
                    (student) =>
                      student.regno === regno &&
                      student.name === name &&
                      student.Test &&
                      student.Test.length > 0
                  )
                )
              )
            )
        )
        .some(Boolean);

      if (resultForSemester && hasTestForSemester) {
        const studentTestData = resultForSemester.AcademicYear.program
          .flatMap((program) =>
            program.semesters.flatMap((semData) =>
              semData.sections.flatMap((section) =>
                section.subjects.flatMap((subject) => {
                  const studentData = subject.students.find(
                    (student) =>
                      student.regno === regno &&
                      student.name === name &&
                      student.Test &&
                      student.Test.length > 0
                  );

                  if (studentData) {
                    const testForSubject = studentData.Test[0];
                    return {
                      subjectName: subject.subjectName,
                      subjectcode: subject.subjectcode,
                      Test: testForSubject,
                    };
                  }

                  return null;
                })
              )
            )
          )
          .filter(Boolean);

        const subjectsForSemester = resultForSemester.AcademicYear.program
          .flatMap((program) =>
            program.semesters.flatMap((semData) =>
              semData.sections.flatMap((section) =>
                section.subjects.flatMap((subject) => {
                  const studentData = subject.students.find(
                    (student) =>
                      student.regno === regno &&
                      student.name === name &&
                      student.Test &&
                      student.Test.length > 0
                  );

                  if (studentData) {
                    const testForSubject = studentData.Test[0];
                    return {
                      subjectName: subject.subjectName,
                      subjectcode: subject.subjectcode,
                      Test: testForSubject,
                    };
                  }

                  return null;
                })
              )
            )
          )
          .filter(Boolean);

        const updatedStudentTestData = studentTestData
          .map((data) => data.Test)
          .flat()
          .filter(Boolean);

        const combinedData = subjectsForSemester.map((subject, index) => ({
          ...subject,
          Test: updatedStudentTestData[index] || null,
        }));

        const resultMark = await StudentAssessmentMark.findOne({
          "AcademicYear.program.semesters.semesterNumber": sem,
        });

        let assessments = null;
        if (resultMark) {
          const student = resultMark.AcademicYear.program
            .flatMap((program) =>
              program.semesters.flatMap((semData) =>
                semData.sections.flatMap((section) =>
                  section.Students.find((student) => student.regno === regno)
                )
              )
            )
            .filter(Boolean)[0];

          if (student) {
            assessments = student.assessments;
          }
        }

        const semesterData = {
          semester: sem,
          combinedData,
          assessments,
        };

        semesterDataAll.push(semesterData);
      }
    }
    console.log(semesterDataAll);
    res.json(semesterDataAll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const fetchStudentCourseDetails = async (req, res) => {
  const { regno, name, semesters } = req.body;

  console.log("data is: ", regno, name, semesters);

  try {
    // Find the semester from the database Assignedsubject
    const result = await Assignedsubject.findOne({
      "AcademicYear.program.semesters.semesterNumber": semesters,
    });

    console.log("semester data is: ", result);

    // If semester does not exist, show error
    if (!result) {
      return res.status(404).json({ error: "Semester does not exist" });
    }

    // Find the student by regno and name inside the found semester
    const studentsection = result.AcademicYear.program
      .flatMap((program) =>
        program.semesters.flatMap((sem) =>
          sem.sections.map((section) => ({
            sectionName: section.sectionName,
          }))
        )
      )
      .filter(Boolean)[0];

    console.log("studentsection data: ", studentsection);

    // Find the student by regno and name inside the found semester
    const student = result.AcademicYear.program
      .flatMap((program) =>
        program.semesters.flatMap((sem) =>
          sem.sections.flatMap((section) =>
            section.students.find(
              (student) => student.regno === regno && student.name === name
            )
          )
        )
      )
      .filter(Boolean)[0];

    console.log("student data is: ", student);

    // If student does not exist, show error
    if (!student) {
      return res.status(404).json({ error: "Student does not exist" });
    }

    // Get the subjects array of the student
    const section = studentsection;
    const subjects = student;

    // Return the subjects array
    res.json({ section, subjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchAttendance = asyncHandler(async (req, res) => {
  const { regno, name, AcademicYear, programName } = req.body;

  console.log("data is: ", regno, name, AcademicYear, programName);

  try {
    // Find the academic year
    const year = await attendance.findOne({
      'AcademicYear.year': AcademicYear
    });

    console.log("year: ", year);

    if (!year) {
      return res.status(404).json({ error: "No document with such Academic Year found!" });
    }

    // Find the program within the academic year
    const program = year.AcademicYear.program.find(prog => prog.programname === programName);

    if (!program) {
      return res.status(404).json({ error: "No such program in this Academic Year" });
    }

    const semesters = [];

    // Iterate through semesters and sections to find the student
    program.semesters.forEach(semester => {
      semester.sections.forEach(section => {
        const student = section.students.find(student => student.regno === regno && student.name === name);
        if (student) {
          const studentSubjects = student.subjects.map(subject => ({
            subjectName: subject.subjectName,
            Totalclasses: subject.Totalclasses,
            Daypresent: subject.Daypresent,
            DayAbsent: subject.DayAbsent,
            attendance: subject.attendance
          }));

          semesters.push({
            semesterNumber: semester.semesterNumber,
            subjects: studentSubjects
          });
        }
      });
    });

    return res.json(semesters);
  } catch (error) {
    console.error("Error fetching attendance details:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const fetchdialyAttendance = async (req, res) => {
  const { regno, name, semesters, date, subjectName } = req.body;

  console.log("Request data: ", regno, name, semesters, date, subjectName);

  try {
    // Find the semester from the database Assignedsubject
    const result = await attendance.findOne({
      "AcademicYear.program.semesters.semesterNumber": semesters,
    });

    console.log("Semester data: ", result);

    // If semester does not exist, show error
    if (!result) {
      return res.status(404).json({ error: "Semester does not exist" });
    }

    // Find the student by regno and name inside the found semester
    const student = result.AcademicYear.program
      .flatMap((program) =>
        program.semesters.flatMap((sem) =>
          sem.sections.flatMap((section) =>
            section.students.find(
              (student) => student.regno === regno && student.name === name
            )
          )
        )
      )
      .filter(Boolean)[0];

    console.log("Student data: ", student);

    // If student does not exist, show error
    if (!student) {
      return res.status(404).json({ error: "Student does not exist" });
    }

    // Get the subjects array of the student
    const subjects = student.subjects;

    // Find the subject by name and get its attendance for the specified date
    const subject = subjects.find((sub) => sub.subjectName === subjectName);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    const attendanceEntry = subject.attendance.find(
      (att) => att.date.toISOString().split("T")[0] === date
    );
    if (!attendanceEntry) {
      return res
        .status(404)
        .json({ error: "Attendance entry not found for the specified date" });
    }

    // Return the attendance entry for the subject on the specified date
    res.json({
      semester: semesters[0],
      subjectName,
      attendance: attendanceEntry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  student,
  parent,
  studentmail,
  searchStudent,
  getStudent,
  UpdateStudentDetails,
  saveTaskAssignStudent,
  onclickCheckInUpdateTaskAssign,
  fetchStudentAssessment,
  fetchStudentAssessmentMarks,
  getInternals,
  getExternals,
  getAllMarks,
  saveAssessmentStudent,
  fetchStudentGradeSheet,
  fetchStudentTestMarks,
  fetchStudentCourseDetails,
  fetchAttendance,
  fetchdialyAttendance,
};
