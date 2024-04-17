import express from 'express';

import { unifiedLogin } from '../controllers/logincontroller.js';

const router = express.Router();

///////////Login of all user like Admin, Faculty, HOD, Student///////////////
router.route("/login").post(unifiedLogin);



export default router;