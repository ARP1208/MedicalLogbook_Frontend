import express from "express";
import {
  faculty,
  facultymail,
  searchfaculty,
  facultyGetDetails,
  UpdateFacultyDetails,
  saveTaskAssignAndSendEmails,
  fetchAllTasks,
  approveTaskAssign,
  searchTask,
  //updateTaskAssign,
  fetchDetails,
  saveAssignMarks,
  updateAssignMarks,
  saveAddAssessment,
  getFacultyindividualAssessment,
  getAssessmentByQuestionNumber,
  showAssessment,
  //DeleteTaskAssign,
  DeleteAssessment,
  getStudentsDetails,
  saveAttendance
} from "../controllers/facultycontroller.js";

const router = express.Router();

// ////////////Admin Registration Component/////////////
router.route("/faculty-details").post(faculty);
router.route("/send-mail").post(facultymail);
router.route("/faculty-search").post(searchfaculty);
router.route("/getFacultyDetails").post(facultyGetDetails);
router.route("/updatefaculty").patch(UpdateFacultyDetails);

// ////////////Announcement///////////////////////
// router.route("/FacultyfetchAllAnnouncement").get(FacultyfetchAllAnnouncement);

///////////Academic component //////////////////
router.route("/fetchprosemsub").post(fetchDetails);
router.route("/saveassignmarks").post(saveAssignMarks);
router.route("/updateAssignMarks").patch(updateAssignMarks);
router.route("/getStudentsDetails").post(getStudentsDetails);
router.route("/SaveAttendancesheet").post(saveAttendance);

/////////Assessment Component////////////////////////////
router.route("/saveAddAssessment").post(saveAddAssessment);
router
  .route("/getFacultyindividualAssessment")
  .post(getFacultyindividualAssessment);
router.route("/getAssessmentByQuestionNumber").post(getAssessmentByQuestionNumber);
router.route("/showfacultyAssessment").post(showAssessment);
router.route("/DeleteAssessment").delete(DeleteAssessment);

//////////////PG Log Component////////////////////////
router.route("/saveandemailtask").post(saveTaskAssignAndSendEmails);
router.route("/approveTaskAssign").patch(approveTaskAssign);
router.route("/searchTask").post(searchTask);
router.route('/fetchalltasks').get(fetchAllTasks);
// router.route("/updateTask").patch(updateTaskAssign);
// router.route("/DeleteTaskAssign").delete(DeleteTaskAssign);

export default router;