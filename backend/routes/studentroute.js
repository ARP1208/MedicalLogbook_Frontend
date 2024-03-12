import express from 'express';
import { Studentlogin, student, studentmail, searchStudent, UpdateStudentDetails } from '../controllers/studentcontroller.js';

const router = express.Router();
router.route("/Studentlogin").post(Studentlogin);
router.route("/student-details").post(student);
router.route("/send-mail").post(studentmail)
router.route("/search-student").post(searchStudent)
router.route("/updatestudent-details").patch(UpdateStudentDetails)


export default router;