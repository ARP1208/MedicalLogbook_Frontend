import express from 'express';
import { Facultylogin, faculty, facultymail, searchfaculty, UpdateFacultyDetails, saveTaskAssign, searchTask, updateTaskAssign, savePreviewTask} from '../controllers/facultycontroller.js';



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




export default router;