// adminRoutes.js
import express from 'express';
import { login, announcement,fetchAnnouncementByTitle ,UpdateAnnouncement, DeleteAnnouncement, saveAdminGradesheet, updateAdminGradesheet, saveAssignSubject, getAdminGradesheet, getAdminindividualGradesheet } from '../controllers/admincontroller.js';

const router = express.Router();

router.route("/login").post(login);
router.route("/announcement").post(announcement);
router.route("/fetchAnnouncement").post(fetchAnnouncementByTitle);
router.route("/UpdateAnnouncement").patch(UpdateAnnouncement);
router.route("/DeleteAnnouncement").delete(DeleteAnnouncement);
router.route("/admingradesheet").post(saveAdminGradesheet);
router.route("/updategradesheet").post(updateAdminGradesheet);
router.route("/assignsubject").post(saveAssignSubject);
router.route("/getdetail").post(getAdminGradesheet);
router.route("/getAdminindividualGradesheet").post(getAdminindividualGradesheet);






// router.post('/login', async (req, res) => {
//   try {
//     await login(req, res);
//   } finally {
//     // No need to close the database connection here
//   }
// });

export default router;
