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

const FacultyDetails = mongoose.model('FacultyDetails', facultyDetailsSchema);
const FacultyLogin = mongoose.model('FacultyLogin', facultyLoginSchema);

export { FacultyDetails, FacultyLogin };