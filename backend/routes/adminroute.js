// adminRoutes.js
import express from 'express';
import { login, announcement, UpdateAnnouncement, DeleteAnnouncement, saveAdminGradesheet, updateAdminGradesheet, saveAssignSubject } from '../controllers/admincontroller.js';

const router = express.Router();

router.route("/login").post(login);
router.route("/announcement").post(announcement);
router.route("/UpdateAnnouncement").patch(UpdateAnnouncement);
router.route("/DeleteAnnouncement").delete(DeleteAnnouncement);
router.route("/admingradesheet").post(saveAdminGradesheet);
router.route("/updategradesheet").post(updateAdminGradesheet);
router.route("/assignsubject").post(saveAssignSubject);





// router.post('/login', async (req, res) => {
//   try {
//     await login(req, res);
//   } finally {
//     // No need to close the database connection here
//   }
// });

export default router;
