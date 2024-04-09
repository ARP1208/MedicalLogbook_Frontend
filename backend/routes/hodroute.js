// HODRoutes.js
import express from 'express';
import { hodlogindata } from '../controllers/hodcontroller.js';


const router = express.Router();
///login of hod 
router.route("/Hod-login").post(hodlogindata);


export default router;