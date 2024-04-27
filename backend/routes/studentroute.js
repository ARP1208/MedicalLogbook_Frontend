import express from 'express';
import {   
    student,
    parent,
    studentmail,
    searchStudent,
    getStudent,
    UpdateStudentDetails,
    saveTaskAssignStudent,
    onclickCheckInUpdateTaskAssign,
    fetchStudentAssessment,
    fetchStudentAssessmentMarks,
    getInternals,
    getExternals,
    getAllMarks,
    saveAssessmentStudent,
    fetchStudentGradeSheet,
    fetchStudentTestMarks,
    fetchStudentCourseDetails,
    fetchAttendance,
    fetchdialyAttendance, } from '../controllers/studentcontroller.js';
const router = express.Router();

////////////Admin Registration Component/////////////
// router.route("/Student-login").post(Studentlogin);
router.route("/student-details").post(student);
router.route("/send-mail").post(studentmail)
router.route("/search-student").post(searchStudent)
router.route("/get-student").post(getStudent)
router.route("/updatestudent-details").patch(UpdateStudentDetails)

///////////PG log Component//////////////////////////////
router.route("/saveTaskAssignStudent").post(saveTaskAssignStudent)
router.route("/onclickCheckInUpdateTaskAssign").patch(onclickCheckInUpdateTaskAssign)
router.route("/fetchStudentAssessment").post(fetchStudentAssessment)
router.route("/fetchStudentAssessmentMarks").post(fetchStudentAssessmentMarks)
router.route("/fetchInternalMarks").post(getInternals);
router.route("/fetchExternalMarks").post(getExternals);
router.route("/fetchMarks").post(getAllMarks);
router.route("/saveAssessmentStudent").post(saveAssessmentStudent)

/////////////////Academic///////////////////////////
router.route("/fetchStudentGradeSheet").post(fetchStudentGradeSheet);
router.route("/fetchStudentTestMarks").post(fetchStudentTestMarks);
router.route("/fetchStudentCourseDetails").get(fetchStudentCourseDetails);
router.route("/fetchAttendance").post(fetchAttendance);
router.route("/fetchAttendancedialy").get(fetchdialyAttendance);



export default router;