import mongoose from 'mongoose';

const studentDetailsSchema = new mongoose.Schema({
  studentname: { type: String },
  motherTongue: { type: String },
  enrollmentNumber: { type: Number },
  socialcategory: { type: String},
  applicationNumber: { type: Number },
  maritialStatus: { type: String },
  academicYear: { type: Number },
  domicileStatus: { type: String },
  branch: { type: String},
  course: { type: String},
  regno: { type: Number},
  adharCard: { type: Number },
  dateOfJoining: { type: Date },
  nameOnAdharCard: { type: String },
  dateOfBirth: { type: Date },
  officialCorrespondenceEmail: { type: String },
  gender: { type: String },
  officialCorrespondenceNumber: { type: Number },
  presentMobileNumber: { type: Number },
  emergencyContactNumber: { type: Number },
  previousMobileNumber: { type: Number },
  socialMediaAccount: { type: String },
  emailId: { type: String },
  numberOfCreditsEarned: { type: Number },
  bloodGroup: { type: String },
  categoryOfAdmission: { type: String },
  nationality: { type: String },
  religion: { type: String },
}
);

const studentLoginSchema = new mongoose.Schema({
  emailId: { type: String, required: true, unique: true },
  password: { type: String },
});

studentLoginSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const TaskAssignStudentschema = new mongoose.Schema({
  start_Date: { type: Date },
  End_Date: { type: Date },
  Task_Name: { type: String },
  Task_ID: { type: String },
  Task_Description: { type: String },
  Student_Description: { type: String },
  uploadFileName: { type: String },
  Students: [{
    regno: { type: Number },
    Name: { type: String }
   
  }]
});

const AssessmentMarkSchema = new mongoose.Schema({
  assessmentId : { typle: String},
  assessmentName : { type: String},
  regno : { type: String},
  mark : { type: Number}
})




const StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);
const StudentLogin = mongoose.model('StudentLogin', studentLoginSchema);
const TaskAssignStudent = mongoose.model("TaskAssignStudent", TaskAssignStudentschema);
const StudentAssessmentMark = mongoose.model("StudentAssessmentMark", AssessmentMarkSchema);

export { StudentDetails, StudentLogin, TaskAssignStudent, StudentAssessmentMark};