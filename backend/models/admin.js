

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

///////Announcement Page for admin ///////

const adminAnnoucementSchema = new mongoose.Schema({
  announcementTitle: { type: String, required:true},
  scheduleDate: { type: Date},
  uploadFile: { type: String},
  scheduleTime: { type: String}
})


//////////GradeSheet page for admin /////////
const adminGradeSheetSchema = new mongoose.Schema({
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
                    regNo: String,
                    name: String,
                    subjects: [
                      {
                        subjectName: String,
                        marks: Number,
                      },
                      {
                        subjectName: String,
                        marks: Number,
                      },
                      {
                        subjectName: String,
                        marks: Number,
                      },
                      {
                        subjectName: String,
                        marks: Number,
                      },
                      {
                        subjectName: String,
                        marks: Number,
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

const Admin = mongoose.model('Admin', adminSchema);
const AdminAnnoucement = mongoose.model('AdminAnnoucement', adminAnnoucementSchema);
const Admingradesheet = mongoose.model('Admingradesheet', adminGradeSheetSchema);


export { Admin, AdminAnnoucement, Admingradesheet} ;
