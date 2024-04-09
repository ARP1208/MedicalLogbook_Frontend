// adminRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';

import { login, announcement, fetchAllAnnouncement, getFilebyAnnouncement, deleteFile, fetchAnnouncementByTitle, UpdateAnnouncement, DeleteAnnouncement, filter_students, setMarks, saveAdminGradesheet, updateAdminGradesheet, saveAssignSubject,saveCSVAssignSubject, getAdminGradesheet, getAdminindividualGradesheet } from '../controllers/admincontroller.js';



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

////////////Registration Component ////////////////////////
router.route("/assignsubject").post(saveAssignSubject);
router.route("/saveCSVAssignSubject").post(saveCSVAssignSubject);



//////////Announcement Component//////////////
router.post('/announcement', upload.single('uploadedFileName'), announcement)
router.route("/fetchAllAnnouncements").get(fetchAllAnnouncement);
router.route("/fetchFile").post(getFilebyAnnouncement);
router.route("/fetchAnnouncement").post(fetchAnnouncementByTitle);
router.delete("/deleteFile", deleteFile);
router.patch("/UpdateAnnouncement", upload.single('uploadedFileName'), UpdateAnnouncement);
// router.route("/UpdateAnnouncement").patch(UpdateAnnouncement);
router.route("/DeleteAnnouncement").delete(DeleteAnnouncement);


///////////////////Gradesheet Component /////////////////////////
// router.route("/admingradesheet").post(saveAdminGradesheet);
router.route("/updategradesheet").patch(updateAdminGradesheet);
router.route("/setmarks").post(setMarks);
router.route("/getdetail").post(getAdminGradesheet);
router.route("/filter_students").post(filter_students);
router.route("/getAdminindividualGradesheet").post(getAdminindividualGradesheet);



export default router;