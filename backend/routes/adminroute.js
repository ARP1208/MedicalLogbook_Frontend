// adminRoutes.js
import express from 'express';
import { login, announcement,fetchAnnouncementByTitle ,UpdateAnnouncement, DeleteAnnouncement, updateAdminGradesheet, saveAssignSubject, saveCSVAssignSubject, getAdminGradesheet, getAdminindividualGradesheet } from '../controllers/admincontroller.js';

const router = express.Router();

router.route("/login").post(login);

////////////Registration Component ////////////////////////
router.route("/assignsubject").post(saveAssignSubject);
router.route("/saveCSVAssignSubject").post(saveCSVAssignSubject);

//////////Announcement Component//////////////
router.route("/announcement").post(announcement);
router.route("/fetchAnnouncement").post(fetchAnnouncementByTitle);
router.route("/UpdateAnnouncement").patch(UpdateAnnouncement);
router.route("/DeleteAnnouncement").delete(DeleteAnnouncement);

///////////////////Gradesheet Component /////////////////////////
// router.route("/admingradesheet").post(saveAdminGradesheet);
router.route("/updategradesheet").patch(updateAdminGradesheet);
router.route("/getdetail").post(getAdminGradesheet);
router.route("/getAdminindividualGradesheet").post(getAdminindividualGradesheet);


export default router;
