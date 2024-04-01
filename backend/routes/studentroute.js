import express from 'express';
import { Studentlogin, student, studentmail, searchStudent, UpdateStudentDetails, saveTaskAssignStudent, onclickCheckInUpdateTaskAssign, fetchStudentAssessment, saveAssessmentStudent, fetchStudentGradeSheet} from '../controllers/studentcontroller.js';

const router = express.Router();

////////////Admin Registration Component/////////////
router.route("/Studentlogin").post(Studentlogin);
router.route("/student-details").post(student);
router.route("/send-mail").post(studentmail)
router.route("/search-student").post(searchStudent)
router.route("/updatestudent-details").patch(UpdateStudentDetails)

///////////PG log Component//////////////////////////////
router.route("/saveTaskAssignStudent").post(saveTaskAssignStudent)
router.route("/onclickCheckInUpdateTaskAssign").patch(onclickCheckInUpdateTaskAssign)
router.route("/fetchStudentAssessment").post(fetchStudentAssessment)
router.route("/saveAssessmentStudent").post(saveAssessmentStudent)

/////////////////Academic///////////////////////////
router.route("/fetchStudentGradeSheet").get(fetchStudentGradeSheet);



export default router;