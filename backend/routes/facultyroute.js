import express from "express";
import {
  Facultylogin,
  faculty,
  facultymail,
  searchfaculty,
  UpdateFacultyDetails,
//   saveTaskAssignAndSendEmails,
//   searchTask,
//   updateTaskAssign,
  // FacultyfetchAllAnnouncement,
  fetchDetails,
  saveAssignMarks,
  updateAssignMarks,
  saveAddAssessment,
  getFacultyindividualAssessment,
  getAssessmentByQuestionNumber,
  showAssessment,
//   DeleteTaskAssign,
  DeleteAssessment,
  saveAttendance
} from "../controllers/facultycontroller.js";

const router = express.Router();

////////////Admin Registration Component/////////////
router.route("/faculty-login").post(Facultylogin);
router.route("/faculty-details").post(faculty);
router.route("/send-mail").post(facultymail);
router.route("/faculty-search").post(searchfaculty);
router.route("/updatefaculty").patch(UpdateFacultyDetails);

// ////////////Announcement///////////////////////
// router.route("/FacultyfetchAllAnnouncement").get(FacultyfetchAllAnnouncement);

///////////Academic component //////////////////
router.route("/fetchprosemsub").post(fetchDetails);
router.route("/saveassignmarks").post(saveAssignMarks);
router.route("/updateAssignMarks").patch(updateAssignMarks);
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
// router.route("/saveandemailtask").post(saveTaskAssignAndSendEmails);
// router.route("/searchTask").post(searchTask);
// router.route("/updateTask").patch(updateTaskAssign);
// router.route("/DeleteTaskAssign").delete(DeleteTaskAssign);

export default router;
