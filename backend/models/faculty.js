import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const facultyDetailsSchema = new mongoose.Schema({
  facultyname: { type: String },
  applicationNumber: { type: String },
  motherTongue: { type: String },
  designation:{type:String},
  dateOfJoining: { type: String },
  facultyid: { type: Number },
  department: { type: String },
  designation: { type: String },
  dateOfBirth: { type: String },
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
  Submit_Time: { type: String },
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
                      regno: Number,
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
                    Duration : Number,
                    totalMark : Number,
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

//////////saving attendance of student /////////////
const Attendance = new mongoose.Schema({
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
                students: [
                  {
                    regno: Number,
                    name: String,
                    subjects: [
                      {
                        subjectName: String,
                        Totalclasses: { type: Number, default: 0 },
                        Daypresent: { type: Number, default: 0 },
                        DayAbsent: { type: Number, default: 0 },

                        attendance: [
                          {
                            date: Date,
                            day: String,
                            // Ensure these are defined as Number fields with default value 0
                            status: Number
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});


const FacultyDetails = mongoose.model('FacultyDetails', facultyDetailsSchema);
const FacultyLogin = mongoose.model('FacultyLogin', facultyLoginSchema);
const TaskAssign = mongoose.model("TaskAssign", TaskAssignschema);
const AssignMarks = mongoose.model("AssignMarks", assignmarks);
const AddAssessment = mongoose.model("AddAssessment", addassessment)
const attendance = mongoose.model("Attendacedata", Attendance)

export { FacultyDetails, FacultyLogin, TaskAssign, AssignMarks,AddAssessment, attendance };