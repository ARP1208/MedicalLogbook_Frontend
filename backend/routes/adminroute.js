// adminRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';

import { login, announcement, fetchAllAnnouncement, getFilebyAnnouncement, fetchAnnouncementByTitle, UpdateAnnouncement, DeleteAnnouncement, saveAdminGradesheet, updateAdminGradesheet, saveAssignSubject, getAdminGradesheet, getAdminindividualGradesheet } from '../controllers/admincontroller.js';


const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype === "application/pdf" ||
            file.mimetype === "application/vnd.ms-excel" ||
            file.mimetype === "text/csv"
        ) {
            cb(null, true);
        } else {
            console.log("only pdf, csv, xls file are allowed!");
            cb(null, false);
        }
    }
});

router.route("/login").post(login);
// router.route("/announcement").post(upload.single('file'), announcement);
// router.post('/announcement', announcement)
router.post('/announcement', upload.single('uploadedFileName'), announcement)
router.route("/fetchAllAnnouncements").get(fetchAllAnnouncement);
router.route("/fetchFile").post(getFilebyAnnouncement);
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