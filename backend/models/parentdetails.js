import mongoose from 'mongoose';

// Combined Schema for Parent Details
const parentDetailsSchema = new mongoose.Schema({
  enrollmentNumber: { type: Number },
  fatherName: { type: String},
  fatherContactNumber: { type: String },
  fatherOccupation: { type: String },
  fatherEmailId: { type: String },
  motherName: { type: String },
  motherContactNumber: { type: String },
  motherOccupation: { type: String },
  motherEmailId: { type: String },
  guardianName: { type: String },
  guardianContactNumber: { type: String },
  guardianOccupation: { type: String },
  guardianEmailId: { type: String },
  maritialStatus: { type: String },
  bankAccountNumber: { type: String },
  accountHolderName: { type: String },
  ifscCode: { type: String },
  branch: { type: String },
  panCardNumber: { type: String },
});

// Model for Combined Parent Details
const Parent = mongoose.model('ParentDetails', parentDetailsSchema);

export default Parent;
