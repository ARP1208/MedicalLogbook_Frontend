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

const StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);
const StudentLogin = mongoose.model('StudentLogin', studentLoginSchema);

export { StudentDetails, StudentLogin };