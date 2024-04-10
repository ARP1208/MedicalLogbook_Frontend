import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const hodSchema = new mongoose.Schema({
  emailId: { type: String, required: true, },
  password: { type: String },
});



const hodlogin = mongoose.model('HodLogin', hodSchema);

export { hodlogin }