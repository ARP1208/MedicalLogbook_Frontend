import express from 'express';
import { Facultylogin, faculty, facultymail, searchfaculty, UpdateFacultyDetails, saveTaskAssignAndSendEmails,searchTask, updateTaskAssign, fetchDetails, saveAssignMarks, updateAssignMarks, saveAddAssessment, getFacultyindividualAssessment, DeleteTaskAssign, DeleteAssessment} from '../controllers/facultycontroller.js';

const router = express.Router();


////////////Admin Registration Component/////////////
router.route("/faculty-login").post(Facultylogin);
router.route("/faculty-details").post(faculty);
router.route("/send-mail").post(facultymail);
router.route("/faculty-search").post(searchfaculty);
router.route("/updatefaculty").patch(UpdateFacultyDetails);

///////////Academic component //////////////////
router.route("/fetchprosemsub").post(fetchDetails);
router.route("/saveassignmarks").post(saveAssignMarks);
router.route("/updateAssignMarks").patch(updateAssignMarks);

/////////Assessment Component////////////////////////////
router.route("/saveAddAssessment").post(saveAddAssessment);
router.route("/getFacultyindividualAssessment").post(getFacultyindividualAssessment);
router.route("/DeleteAssessment").delete(DeleteAssessment);

//////////////PG Log Component////////////////////////
router.route("/saveandemailtask").post(saveTaskAssignAndSendEmails);
router.route("/searchTask").post(searchTask);
router.route("/updateTask").patch(updateTaskAssign);
router.route("/DeleteTaskAssign").delete(DeleteTaskAssign);


export default router;