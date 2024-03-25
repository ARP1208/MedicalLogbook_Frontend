import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const facultyDetailsSchema = new mongoose.Schema({
  facultyname: { type: String },
  applicationNumber: { type: String },
  motherTongue: { type: String },
  dateOfJoining: { type: Date },
  facultyid: { type: Number },
  department: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  presentMobileNumber: { type: String },
  previousMobileNumber: { type: String },
  emailId: { type: String },
  bloodGroup: { type: String },
  nationality: { type: String },
  religion: { type: String },
  socialCategory: { type: String }

});


const facultyLoginSchema = new mongoose.Schema({
  emailId: { type: String, required: true, unique: true },
  password: { type: String },
});

facultyLoginSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const TaskAssignschema = new mongoose.Schema({
  Task_Name: { type: String },
  Task_ID: { type: String },
  Task_Description: { type: String },
  start_Date: { type: Date },
  End_Date: { type: Date },
  Task_Completed: { type: String},
  Students: [{
    regno: { type: String },
    Name: { type: String },
  }]
});



//////////Internal and Midterm marks page for admin /////////
const assignmarks = new mongoose.Schema({
  AcademicYear: {
    year: String,
    program: [
      {
        programname: String,
        semesters: [
          {
            semesterNumber: String,
            sections: [
              {
                sectionName: String,
                subjects: [
                 {
                  subjectcode: String,
                  subjectName: String,
                  students: [
                    {
                      regNo: String,
                      name: String,
                      Test: [
                        {
                          testname : String,
                          marks : String
                        },
                      ],
                    },
                  ],
                },
              ],
              },
            ],
          },
        ],
      },
    ],
  },
});

////////// adding assessemnt by faculty /////////
const addassessment = new mongoose.Schema({
  AcademicYear: {
    year: String,
    program: [
      {
        programname: String,
        semesters: [
          {
            semesterNumber: String,
            sections: [
              {
                sectionName: String,
                assessment : [
                  {
                    assessmentId : String,
                    assessmentName : String,
                    assessmentquestion : [
                      {
                        questionno : Number,
                        question : String,
                        optionA : String,
                        optionB: String,
                        optionC : String,
                        optionD : String,
                        answer : String
                      }
                    ]
                  }
                ]
              },
            ],
          },
        ],
      },
    ],
  },
});


const FacultyDetails = mongoose.model('FacultyDetails', facultyDetailsSchema);
const FacultyLogin = mongoose.model('FacultyLogin', facultyLoginSchema);
const TaskAssign = mongoose.model("TaskAssign", TaskAssignschema);
const AssignMarks = mongoose.model("AssignMarks", assignmarks);
const AddAssessment = mongoose.model("AddAssessment", addassessment)

export { FacultyDetails, FacultyLogin, TaskAssign, AssignMarks,AddAssessment };