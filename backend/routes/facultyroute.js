import express from 'express';
import { Facultylogin, faculty, facultymail, searchfaculty, UpdateFacultyDetails, saveTaskAssign, searchTask, updateTaskAssign, savePreviewTask, fetchDetails, saveAssignMarks, updateAssignMarks, saveAddAssessment, getFacultyindividualAssessment, DeleteTaskAssign, DeleteAssessment} from '../controllers/facultycontroller.js';



const router = express.Router();

router.route("/faculty-login").post(Facultylogin);
router.route("/faculty-details").post(faculty);
router.route("/send-mail").post(facultymail);
router.route("/faculty-search").post(searchfaculty);
router.route("/updatefaculty").patch(UpdateFacultyDetails);
router.route("/savedTask").post(saveTaskAssign);
router.route("/searchTask").post(searchTask);
router.route("/updateTask").patch(updateTaskAssign);
router.route("/PreviewTask").post(savePreviewTask);
router.route("/fetchprosemsub").post(fetchDetails);
router.route("/saveassignmarks").post(saveAssignMarks);
router.route("/updateAssignMarks").patch(updateAssignMarks);
router.route("/saveAddAssessment").post(saveAddAssessment);
router.route("/getFacultyindividualAssessment").post(getFacultyindividualAssessment);
router.route("/DeleteTaskAssign").delete(DeleteTaskAssign);
router.route("/DeleteAssessment").delete(DeleteAssessment);



export default router;