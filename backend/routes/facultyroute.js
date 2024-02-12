import express from 'express';
import { Facultylogin, faculty, facultymail, searchfaculty, UpdateFacultyDetails, saveTaskAssign} from '../controllers/facultycontroller.js';



const router = express.Router();

router.route("/faculty-login").post(Facultylogin);
router.route("/faculty-details").post(faculty);
router.route("/send-mail").post(facultymail);
router.route("/faculty-search").post(searchfaculty);
router.route("/updatefaculty").patch(UpdateFacultyDetails);
router.route("/savedTask").post(saveTaskAssign);




export default router;